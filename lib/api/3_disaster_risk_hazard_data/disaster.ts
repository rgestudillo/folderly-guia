import { NextResponse } from 'next/server';

export async function handleDisasterGet(latitude: number, longitude: number, limit: number = 10, page: number = 1) {
  try {
    // Retrieve your Ambee API key from environment variables.
    const ambeeApiKey = process.env.NEXT_PUBLIC_AMBEE_API_KEY;
    if (!ambeeApiKey) {
      return NextResponse.json(
        { error: 'Server configuration error: Missing Ambee API key.' },
        { status: 500 }
      );
    }

    // Construct the Ambee Disaster API endpoint URL with query parameters.
    const apiUrl = `https://api.ambeedata.com/disasters/latest/by-lat-lng?lat=${latitude}&lng=${longitude}&limit=${limit}&page=${page}`;

    // Make the GET request to the Ambee Disaster API.
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'x-api-key': ambeeApiKey,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Error fetching disaster data from Ambee.' },
        { status: response.status }
      );
    }

    // Parse the JSON response.
    const data = await response.json();

    // Define a mapping from event type codes to descriptive strings.
    const eventTypeMap: { [key: string]: string } = {
      'TN': 'Tsunamis and related sea waves',
      'EQ': 'Earthquakes and related seismic activities',
      'TC': 'Tropical cyclones including hurricanes, typhoons & cyclones',
      'WF': 'Wildfires and fire related events which includes wildfires, burn off, bushfire, fires, pre fire alerts, structure fire',
      'FL': 'Floods including flash floods and general flooding',
      'ET': 'Extreme temperature events including heat waves, cold waves, hot day conditions, etc.',
      'DR': 'Droughts and prolonged dry conditions',
      'SW': 'Severe storms, thunderstorms & related weather phenomena which includes lightning, gusty winds, thunder shower, violent wind, storm surge, hailstorm, heavy rain and light rain',
      'SI': 'Sea ice conditions',
      'VO': 'Volcanic activities and eruptions',
      'LS': 'Landslides, avalanches and related ground movement',
      'Misc': 'Miscellaneous events including unique imagery & technical disasters'
    };

    // Map through each disaster event and add an event_description.
    const mappedDisasters = (data.result || []).map((event: any) => ({
      ...event,
      event_description: eventTypeMap[event.event_type] || event.event_type
    }));

    // Return the transformed disaster data.
    return {
      source: "Ambee Disaster API",
      disasters: mappedDisasters,
    };
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Server error: ' + error.message },
      { status: 500 }
    );
  }
}
