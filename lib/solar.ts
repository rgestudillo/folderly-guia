import { NextResponse } from 'next/server';

export async function handleSolarGet(latitude: number, longitude: number) {
  try {
    // Retrieve your API key from environment variables.
    const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!googleApiKey) {
      return NextResponse.json(
        { error: 'Server configuration error: Missing API key.' },
        { status: 500 }
      );
    }

    // Construct the Solar API endpoint URL with query parameters.
    const solarUrl = `https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=${latitude}&location.longitude=${longitude}&requiredQuality=HIGH&key=${googleApiKey}`;

    // Make the GET request to the Google Solar API.
    const response = await fetch(solarUrl, {
      method: 'GET',
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Error fetching solar data from Google Cloud.' },
        { status: response.status }
      );
    }

    // Parse the JSON response from the Solar API.
    const data = await response.json();

    // Extract key details from the response.
    // For example, we extract the building name, center coordinates,
    // postal code, administrative area, region code, solar potential, imagery quality,
    // and imagery processed date.
    const parsedData = {
      solarPotential: data.solarPotential ? {
        maxArrayPanelsCount: data.solarPotential.maxArrayPanelsCount,
        maxArrayAreaMeters2: data.solarPotential.maxArrayAreaMeters2,
        maxSunshineHoursPerYear: data.solarPotential.maxSunshineHoursPerYear,
        carbonOffsetFactorKgPerMwh: data.solarPotential.carbonOffsetFactorKgPerMwh
      } : null,
    };

    return parsedData;
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Server error: ' + error.message },
      { status: 500 }
    );
  }
}
