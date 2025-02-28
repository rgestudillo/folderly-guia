// app/api/air-quality/route.ts

import { NextResponse } from 'next/server';
import { handleAirQualityPost } from '@/lib/air-quality';
import { handleSolarGet } from '@/lib/solar';

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

    // Execute both API calls concurrently.
    const [airQualityData, solarData] = await Promise.all([
      handleAirQualityPost(latitude, longitude),
      handleSolarGet(latitude, longitude)
    ]);

    // Aggregate the results into a single JSON response.
    const aggregatedData = {
      airQuality: airQualityData,
      solar: solarData,
    };

    return NextResponse.json(aggregatedData);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Server error: ' + error.message },
      { status: 500 }
    );
  }
}
