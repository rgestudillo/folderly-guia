
import { NextResponse } from 'next/server';

export async function handleAirQualityPost(latitude: number, longitude: number) {
  try {
    // Retrieve your API key from environment variables.
    const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!googleApiKey) {
      return NextResponse.json(
        { error: 'Server configuration error: Missing API key.' },
        { status: 500 }
      );
    }

    // Construct the Google API endpoint URL.
    const googleUrl = `https://airquality.googleapis.com/v1/currentConditions:lookup?key=${googleApiKey}`;

    // Prepare the request payload as per the docs.
    const payload = {
      location: {
        latitude,
        longitude,
      },
    };

    // Make the POST request to the Google Air Quality API.
    const response = await fetch(googleUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Error fetching air quality data from Google Cloud.' },
        { status: response.status }
      );
    }

    // Parse the JSON response from Google.
    const data = await response.json();

    // Parse and extract important details.
    // const parsedData = {
    //   dateTime: data.dateTime,
    //   regionCode: data.regionCode,
    //   index: data.indexes && data.indexes.length > 0 ? {
    //     code: data.indexes[0].code,
    //     displayName: data.indexes[0].displayName,
    //     aqi: data.indexes[0].aqi,
    //     aqiDisplay: data.indexes[0].aqiDisplay,
    //     color: data.indexes[0].color,
    //     category: data.indexes[0].category,
    //     dominantPollutant: data.indexes[0].dominantPollutant
    //   } : null
    // };

    // Extract only the AQI and dominant pollutant from the first index.
    const parsedData = data.indexes && data.indexes.length > 0 ? {
      source: "Google Air Quality API",
      aqi: data.indexes[0].aqi,
      category: data.indexes[0].category,
      dominantPollutant: data.indexes[0].dominantPollutant
    } : null;

    return parsedData;
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Server error: ' + error.message },
      { status: 500 }
    );
  }
}
