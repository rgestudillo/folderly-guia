import { NextResponse } from 'next/server';
import { handleAirQualityPost } from '@/lib/air-quality';
import { handleSolarGet } from '@/lib/solar';
import { handleGBIFGet } from '@/lib/gbif';
import { handleSoilData } from '@/lib/soil-data';
import { getLocationImages } from '@/lib/location-images';
import { sustainabilitySchema } from '@/lib/schemas/sustainability-schema';
import { handleNearbyPlaceCounts } from '@/lib/nearby-places';
import { handleWeatherStatistics } from '@/lib/weather-statistics';
import OpenAI from "openai";
import { ProjectData } from '@/types/project';
import { sustainabilitySystemPrompt } from '@/lib/prompts/sustainability-prompt';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    // Parse the JSON body from the incoming request.
    const body = await request.json();

    // Validate that the required location fields are provided.
    if (!body.location || body.location.latitude === undefined || body.location.longitude === undefined) {
      return NextResponse.json(
        { error: 'Request body must include a "location" object with "latitude" and "longitude" properties.' },
        { status: 400 }
      );
    }

    const { latitude, longitude, location_name } = body.location;
    const projectIdea = body.project_idea || "Sustainability Project";
    const city = location_name.split(",")[0]?.trim() || "Unknown City";
    const country = location_name.split(",").slice(-1)[0]?.trim() || "Unknown Country";
    const radius = body.radius || 1000;
    const projectName = `Project ${projectIdea} in ${location_name}`;
    
    // Execute all API calls concurrently.
    // Note: Soil data expects radius in kilometers.
    const [
      airQualityData,
      solarData,
      biodiversityData,
      locationImages,
      soilData,
      nearbyPlacesData,
      weatherData,
    ] = await Promise.all([
      handleAirQualityPost(latitude, longitude),
      handleSolarGet(latitude, longitude),
      handleGBIFGet(latitude, longitude),
      getLocationImages(latitude, longitude),
      handleSoilData(latitude, longitude, radius / 1000),       // Convert radius from meters to km.
      handleNearbyPlaceCounts(latitude, longitude, radius),       // Nearby places expects meters.
      handleWeatherStatistics(latitude, longitude),              // Weather data.
    ]);


    // Aggregate the results into a single JSON response.
    const aggregatedData = {
      airQuality: airQualityData,
      solar: solarData,
      biodiversity: biodiversityData,
      soil: soilData,
      nearbyPlaces: nearbyPlacesData,
      weather: weatherData,
    };

    const apiContext = `aggregatedData ${JSON.stringify(aggregatedData, null, 2)}`;
    console.log("api context is: " ,apiContext);

    // Generate project data using OpenAI.
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          "role": "system",
          "content": [
            {
              "type": "text",
              "text": sustainabilitySystemPrompt
            }
          ]
        },
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": `LOCATION: \n${location_name}\n\nPROJECT:\n${projectIdea}\n\nPROJECT RADIUS:\n${radius} meters\n\nAPI CONTEXT:\n${apiContext}\n`
            }
          ]
        }
      ],
      response_format: {
        "type": "json_schema",
        "json_schema": sustainabilitySchema
      },
      temperature: 1,
      max_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    });
    // Parse the OpenAI response.
    const projectData = JSON.parse(response.choices[0].message.content || '{}') as ProjectData;

    // Update with actual location data and images.
    const updatedProjectData = {
      ...projectData,
      project_name: projectName,
      location: {
        ...projectData.location,
        latitude: latitude,
        longitude: longitude,
        city: city,
        country: country,
        images: locationImages
      },
      last_updated: new Date().toISOString()
    };

    return NextResponse.json(updatedProjectData);
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Server error: ' + error.message },
      { status: 500 }
    );
  }
}
