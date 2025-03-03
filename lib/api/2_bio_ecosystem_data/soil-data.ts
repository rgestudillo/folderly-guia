import { NextResponse } from 'next/server';

export async function handleSoilData(latitude: number, longitude: number, radius: number) {
  try {
    // Calculate a rough bounding box for the soil summary.
    // One degree of latitude is ~111 km. For longitude, adjust by cosine of latitude.
    const deltaLat = radius / 111;
    const deltaLon = radius / (111 * Math.cos(latitude * Math.PI / 180));

    const min_lat = latitude - deltaLat;
    const max_lat = latitude + deltaLat;
    const min_lon = longitude - deltaLon;
    const max_lon = longitude + deltaLon;

    // 1. Soil Type API
    const soilTypeUrl = `https://api.openepi.io/soil/type?lat=${latitude}&lon=${longitude}&top_k=3`;
    const soilTypeResponse = await fetch(soilTypeUrl, { method: 'GET' });
    const soilTypeData = soilTypeResponse.ok
      ? await soilTypeResponse.json()
      : { error: `Error fetching soil type data. Status: ${soilTypeResponse.status}` };

    // 2. Soil Property API
    const soilPropertyUrl = `https://api.openepi.io/soil/property?lon=${longitude}&lat=${latitude}&depths=0-5cm&depths=100-200cm&properties=bdod&values=mean`;
    const soilPropertyResponse = await fetch(soilPropertyUrl, { method: 'GET' });
    const soilPropertyData = soilPropertyResponse.ok
      ? await soilPropertyResponse.json()
      : { error: `Error fetching soil property data. Status: ${soilPropertyResponse.status}` };

    // 3. Soil Summary API
    const soilSummaryUrl = `https://api.openepi.io/soil/type/summary?min_lon=${min_lon}&max_lon=${max_lon}&min_lat=${min_lat}&max_lat=${max_lat}`;
    const soilSummaryResponse = await fetch(soilSummaryUrl, { method: 'GET' });
    const soilSummaryData = soilSummaryResponse.ok
      ? await soilSummaryResponse.json()
      : { error: `Error fetching soil summary data. Status: ${soilSummaryResponse.status}` };

    // Simplify Soil Type data: extract the most probable soil type and probabilities.
    const simplifiedSoilType =
      soilTypeData && soilTypeData.properties
        ? {
            mostProbableSoilType: soilTypeData.properties.most_probable_soil_type,
            probabilities: soilTypeData.properties.probabilities,
          }
        : null;

    // Simplify Soil Property data: extract bulk density info from the first layer.
    const simplifiedSoilProperty =
      soilPropertyData &&
      soilPropertyData.properties &&
      Array.isArray(soilPropertyData.properties.layers) &&
      soilPropertyData.properties.layers.length > 0
        ? {
            bulkDensity: {
              code: soilPropertyData.properties.layers[0].code,
              name: soilPropertyData.properties.layers[0].name,
              depth:
                soilPropertyData.properties.layers[0].depths &&
                soilPropertyData.properties.layers[0].depths.length > 0
                  ? {
                      label: soilPropertyData.properties.layers[0].depths[0].label,
                      mean: soilPropertyData.properties.layers[0].depths[0].values.mean,
                    }
                  : null,
            },
          }
        : null;

    // Simplify Soil Summary data: extract the summaries array.
    const simplifiedSoilSummary =
      soilSummaryData && soilSummaryData.properties
        ? soilSummaryData.properties.summaries
        : null;

    // Aggregate the simplified responses.
    const aggregatedSoilData = {
      source: "OpenEPI",
      soilType: simplifiedSoilType,
      soilProperty: simplifiedSoilProperty,
      soilSummary: simplifiedSoilSummary,
    };

    return aggregatedSoilData;
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Server error: ' + error.message },
      { status: 500 }
    );
  }
}
