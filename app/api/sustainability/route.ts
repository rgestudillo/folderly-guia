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

    const { latitude, longitude } = body.location;
    const projectName = body.project_name || "Sustainability Project";
    const city = body.location.city || "Unknown City";
    const country = body.location.country || "Unknown Country";
    const radius = body.radius || 1000; // Default to 1000 meters if not provided

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

    console.log(aggregatedData);

    // Create context for OpenAI.
    const locationContext = `${city}, ${country}`;
    const apiContext = `aggregatedData ${JSON.stringify(aggregatedData, null, 2)}`;
    console.log(apiContext);

    // Generate project data using OpenAI.
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          "role": "system",
          "content": [
            {
              "type": "text",
              "text": "You are an **Environmental Sustainability Analysis Assistant**. Your task is to generate structured sustainability assessments in **JSON format**, strictly following the predefined schema.\n\n## **🔹 Key Rules:**\n1️⃣ **Strict JSON Structure:**  \n   - Always return a valid JSON object matching the given schema.  \n   - Do **not** include plain text, extra explanations, or responses outside of JSON.  \n\n2️⃣ **Accurate Data Interpretation:**  \n   - Use **only the provided API data** (air quality, biodiversity, climate risks, etc.).  \n   - Do **not fabricate** information—only include verifiable and relevant data.  \n\n3️⃣ **📍 Location-Specific Context (If Available)**  \n   - If **verified sustainability-related insights** (e.g., past conservation efforts, protected areas, climate reports) exist for the location, integrate them.  \n   - Clearly **cite the source** (e.g., \"According to [source]\").  \n   - If no external context is available, do **not** generate assumptions.  \n\n## **🔍 How Each JSON Property Should Be Populated:**\n### **📍 Location**  \n- Extract latitude, longitude, city, and country from the provided data.  \n- This ensures geo-referenced accuracy in analysis.  \n\n### **🌱 Sustainability Score**  \n- **Score (0-100)** → Overall sustainability feasibility of the project.  \n- **Rating** → Categorize score as **Low (0-40), Medium (41-70), or High (71-100)**.  \n- **Factors:**  \n  - **Environmental Impact** → High if the project benefits ecosystems, carbon capture, or conservation.  \n  - **Climate Risk** → Consider **flood/earthquake risks**, pollution, and other hazards.  \n  - **Policy Compliance** → Score increases if the project aligns with **local and international laws**.  \n  - **Biodiversity Benefit** → High if species count is high, especially if protected species are present.  \n\n### **📑 Feasibility Report**  \n- **Status** → `\"Feasible\"`, `\"Partially Feasible\"`, or `\"Not Feasible\"`, based on environmental and risk factors.  \n- **Key Findings** → Bullet-point insights from data analysis (e.g., pollution levels, legal considerations, community benefits).  \n- **Recommendations** → **Actionable steps** to improve project success (e.g., planting strategies, government permits, community engagement).  \n\n### **⚠️ Risk Analysis**  \n- **Flood Risk** → `\"Low\"`, `\"Moderate\"`, or `\"High\"`, based on environmental data.  \n- **Earthquake Risk** → Categorized based on seismic data.  \n- **Pollution Level** → `\"Low\"`, `\"Moderate\"`, `\"High\"` (AQI > 100 is high).  \n- **Biodiversity Threats** → `\"None\"`, `\"Low\"`, `\"Moderate\"`, `\"High\"`, based on species vulnerability.  \n- **Climate Risk Summary** → A brief, data-driven statement on climate trends affecting the project.  \n\n### **📜 Policy Compliance**  \n- **Local Regulations** → Identify **laws or permits** required for project implementation.  \n- **International Guidelines** → Check alignment with **global sustainability goals** (e.g., UN SDGs, Paris Agreement).  \n\n### **💰 Funding Opportunities**  \n- List **grants, subsidies, and investment opportunities** relevant to the project.  \n- Provide eligibility criteria, funding amount, application deadlines, and official links.  \n\n### **🗺️ GIS Visualization**  \n- Provide **interactive mapping layers** (e.g., air quality, biodiversity hotspots, deforestation risks).  \n- Each layer must have a **name, brief description, and data source**.  \n\n---\n## **Final Output Guidelines**\n✅ **Strict JSON format** (no additional text).  \n✅ **Use only API-provided data**—do **not** create assumptions.  \n✅ **Add extra location-based context ONLY IF VERIFIED.**  \n✅ **Ensure correctness of calculations and categorization.**  \n\n**Always return responses in JSON format that match the predefined schema exactly.**\n"
            }
          ]
        },
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": `LOCATION: \n${locationContext}\n\nPROJECT:\n${projectName}\n\nPROJECT RADIUS:\n${radius} meters\n\nAPI CONTEXT:\n${apiContext}\n`
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
