// app/api/air-quality/route.ts

import { NextResponse } from 'next/server';
import { handleAirQualityPost } from '@/lib/air-quality'; // Adjust the import path as necessary

export async function POST(request: Request) {
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

    const airQualityData = await handleAirQualityPost(latitude, longitude);
    // const sustainabilityData = await handleSustainabilityPost(latitude, longitude);
    // const combinedData = {
    //   airQuality: airQualityData,
    //   sustainability: sustainabilityData
    // };

    return NextResponse.json(airQualityData); 
}
