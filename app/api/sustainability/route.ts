// app/api/air-quality/route.ts

import { NextResponse } from 'next/server';
import { handleAirQualityPost } from '@/lib/air-quality';
import { handleSolarGet } from '@/lib/solar';
import { handleGBIFGet } from '@/lib/gbif';
import { getLocationImages } from '@/lib/location-images';
import { handleSoilData } from '@/lib/soil-data';
import { dummyData } from './dummydata';

export async function POST(request: Request) {
  try {
    // Parse the JSON body from the incoming request.
    const body = await request.json();

    // Validate that the required location fields are provided.
    if (
      !body.location ||
      body.location.latitude === undefined ||
      body.location.longitude === undefined
    ) {
      return NextResponse.json(
        {
          error:
            'Request body must include a "location" object with "latitude" and "longitude" properties.',
        },
        { status: 400 }
      );
    }

    const { latitude, longitude } = body.location;
    // Expect a radius (in kilometers) for the soil summary; default to 1 km if not provided.
    const radius: number = body.radius || 1;

    // Execute all API calls concurrently
    const [
      airQualityData,
      solarData,
      biodiversityData,
      locationImages,
      soilData,
    ] = await Promise.all([
      handleAirQualityPost(latitude, longitude),
      handleSolarGet(latitude, longitude),
      handleGBIFGet(latitude, longitude),
      getLocationImages(latitude, longitude),
      handleSoilData(latitude, longitude, radius),
    ]);

    console.log('locationImages:', locationImages);
    console.log(JSON.stringify(soilData, null, 3));

    // Aggregate the results into a single JSON response.
    const aggregatedData = {
      airQuality: airQualityData,
      solar: solarData,
      biodiversity: biodiversityData,
      soil: soilData,
    };

    // For now, return dummy data updated with the actual coordinates and location images.
    const updatedDummyData = {
      ...dummyData,
      location: {
        ...dummyData.location,
        latitude: latitude,
        longitude: longitude,
        images: locationImages,
      },
    };

    // Print the aggregated data for debugging purposes.
    console.log('aggregatedData:', aggregatedData);

    // Let's return the dummy data for now while we are refining the backend.
    // To return the full aggregated data, simply use: return NextResponse.json(aggregatedData);
    return NextResponse.json(updatedDummyData);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Server error: ' + error.message },
      { status: 500 }
    );
  }
}
