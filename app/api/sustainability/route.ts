// app/api/air-quality/route.ts

import { NextResponse } from 'next/server';
import { handleAirQualityPost } from '@/lib/air-quality';
import { handleSolarGet } from '@/lib/solar';
import { handleGBIFGet } from '@/lib/gbif';
import { dummyData } from './dummydata';

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

    // Execute all API calls concurrently
    const [airQualityData, solarData, biodiversityData] = await Promise.all([
      handleAirQualityPost(latitude, longitude),
      handleSolarGet(latitude, longitude),
      handleGBIFGet(latitude, longitude)
    ]);

    // Aggregate the results into a single JSON response.
    const aggregatedData = {
      airQuality: airQualityData,
      solar: solarData,
      biodiversity: biodiversityData,
    };

    // Return dummy data but update it with the actual coordinates from the request
    const updatedDummyData = {
      ...dummyData,
      location: {
        ...dummyData.location,
        latitude: latitude,
        longitude: longitude
      }
    };

    //lets return the dummy data for now while we are refining the backend
    //return NextResponse.json(aggregatedData);
    return NextResponse.json(updatedDummyData);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Server error: ' + error.message },
      { status: 500 }
    );
  }
}
