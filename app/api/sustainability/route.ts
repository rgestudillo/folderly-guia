import { NextResponse } from 'next/server';
import OpenAI from "openai";
import { ProjectData } from '@/types/project';
import { sustainabilitySystemPrompt } from '@/lib/openai/sustainability-prompt';
import { sustainabilitySchema } from '@/lib/openai/sustainability-schema';
import { getLocationImages } from '@/lib/location-images';


// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { location, project_idea, radius, raw_data } = await request.json();
    const { latitude, longitude, location_name } = location;

    const city = location_name.split(",")[0]?.trim() || "Unknown City";
    const country = location_name.split(",").slice(-1)[0]?.trim() || "Unknown Country";
    const locationImages = await getLocationImages(latitude, longitude);

    const apiContext = `aggregatedData ${JSON.stringify(raw_data, null, 2)}`;

    console.log("OPENAI PROMPT: ",
      `LOCATION:  \n${location_name}
      \n\nPROJECT: \n${project_idea}
      \n\nPROJECT RADIUS: \n${radius} meters\n\n
      API CONTEXT: \n${apiContext}\n`
    )

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
              "text": `LOCATION: \n${location_name}\n\nPROJECT:\n${project_idea}\n\nPROJECT RADIUS:\n${radius} meters\n\nAPI CONTEXT:\n${apiContext}\n`
            }
          ]
        }
      ],
      response_format: {
        "type": "json_schema",
        "json_schema": sustainabilitySchema
      },
      temperature: 0,
      max_tokens: 15000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    });
    // Parse the OpenAI response.
    const projectData = JSON.parse(response.choices[0].message.content || '{}') as ProjectData;

    // Update with actual location data and images.
    const updatedProjectData = {
      ...projectData,
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
