import { NextResponse } from 'next/server';
import { handleAirQualityPost } from '@/lib/air-quality';
import { handleSolarGet } from '@/lib/solar';
import { handleGBIFGet } from '@/lib/gbif';
import { getLocationImages } from '@/lib/location-images';
import { handleSoilData } from '@/lib/soil-data';
import { handleNearbyPlaceCounts } from '@/lib/nearby-places';
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
    // Expect a radius in kilometers; default to 1 km if not provided.
    const radiusKm: number = body.radius || 1;

    // Execute all API calls concurrently
    const [
      airQualityData,
      solarData,
      biodiversityData,
      locationImages,
      soilData,
      nearbyPlacesData,
    ] = await Promise.all([
      handleAirQualityPost(latitude, longitude),
      handleSolarGet(latitude, longitude),
      handleGBIFGet(latitude, longitude),
      getLocationImages(latitude, longitude),
      handleSoilData(latitude, longitude, radiusKm),       // Soil data expects km.
      handleNearbyPlaceCounts(latitude, longitude, radiusKm), // Nearby places expects meters.
    ]);

    // console.log('locationImages:', locationImages);
    // console.log('soilData:', JSON.stringify(soilData, null, 3));
    console.log('nearbyPlacesData:', JSON.stringify(nearbyPlacesData, null, 3));

    // Aggregate the results into a single JSON response.
    const aggregatedData = {
      airQuality: airQualityData,
      solar: solarData,
      biodiversity: biodiversityData,
      soil: soilData,
      nearbyPlaces: nearbyPlacesData,
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

    // console.log('aggregatedData:', aggregatedData);

    // Return dummy data for now; to return full aggregated data, use aggregatedData instead.
    return NextResponse.json(updatedDummyData);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Server error: ' + error.message },
      { status: 500 }
    );
  }
}
