import { NextResponse } from 'next/server';
import { handleAirQualityPost } from '@/lib/api/4_air_pollution_data/air-quality';
import { handleSolarGet } from '@/lib/api/1_climate_weather_data/solar';
import { handleGBIFGet } from '@/lib/api/2_bio_ecosystem_data/gbif';
import { handleSoilData } from '@/lib/api/2_bio_ecosystem_data/soil-data';
import { getLocationImages } from '@/lib/location-images';
import { sustainabilitySchema } from '@/lib/openai/sustainability-schema';
import { handleNearbyPlaceCounts } from '@/lib/nearby-places';
import { handleWeatherStatistics } from '@/lib/api/1_climate_weather_data/weather-statistics';
import { handleNASAPowerDailyGet } from '@/lib/api/1_climate_weather_data/nasa-power-daily';
import { handleOverpassGet } from '@/lib/api/5_renewable_infrastructure_data/overpass';
import OpenAI from "openai";
import { ProjectData } from '@/types/project';
import { sustainabilitySystemPrompt } from '@/lib/openai/sustainability-prompt';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

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
    const projectName = `Project ${projectIdea}`;

    console.log("project name is: " + projectName);
    console.log("latitude is: " + latitude);
    console.log("longitude is: " + longitude);
    console.log("radius is: " + radius);

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
      dailyClimateData,
      overpassData  // This returns a JSON object containing the full results and a summary.
    ] = await Promise.all([
      handleAirQualityPost(latitude, longitude),
      handleSolarGet(latitude, longitude),
      handleGBIFGet(latitude, longitude),
      getLocationImages(latitude, longitude),
      handleSoilData(latitude, longitude, radius / 1000),
      handleNearbyPlaceCounts(latitude, longitude, radius),
      handleWeatherStatistics(latitude, longitude),
      handleNASAPowerDailyGet(latitude, longitude),
      handleOverpassGet(latitude, longitude, radius)
    ]);

    // Aggregate the results into a single JSON response.
    // Insert only the summary from the infrastructure data.
    const aggregatedData = {
      airQuality: airQualityData,
      solar: solarData,
      biodiversity: biodiversityData,
      soil: soilData,
      nearbyPlaces: nearbyPlacesData,
      weather: weatherData,
      climateData: dailyClimateData,
      infrastructure: overpassData.summary, // Only the summarized infrastructure info.
    };
    const apiContext = `aggregatedData ${JSON.stringify(aggregatedData, null, 2)}`;

    console.log("OPENAI PROMPT: ",
      `LOCATION: \n${location_name}\n\nPROJECT:\n${projectIdea}\n\nPROJECT RADIUS:\n${radius} meters\n\nAPI CONTEXT:\n${apiContext}\n`
    );

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
      temperature: 0,
      max_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    });

    const projectData = JSON.parse(response.choices[0].message.content || '{}') as ProjectData;

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
