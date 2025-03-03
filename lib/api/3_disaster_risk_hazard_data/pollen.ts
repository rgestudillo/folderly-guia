import { NextResponse } from 'next/server';

export async function handlePollenGet(latitude: number, longitude: number, days: number = 1) {
  try {
    // Retrieve your Google API key from environment variables.
    const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!googleApiKey) {
      return NextResponse.json(
        { error: 'Server configuration error: Missing Google API key.' },
        { status: 500 }
      );
    }

    // Construct the Pollen API endpoint URL with query parameters.
    const apiUrl = `https://pollen.googleapis.com/v1/forecast:lookup?key=${googleApiKey}&location.longitude=${longitude}&location.latitude=${latitude}&days=${days}`;

    // Make the GET request to the Google Pollen API.
    const response = await fetch(apiUrl, {
      method: 'GET',
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Error fetching pollen data from Google.' },
        { status: response.status }
      );
    }

    // Parse and return the JSON response.
    const data = await response.json();
    return data;
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Server error: ' + error.message },
      { status: 500 }
    );
  }
}
