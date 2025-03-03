// src/lib/api/5_renewable_infrastructure_data/overpass.ts

// Helper function to compute polygon area using the Shoelace formula.
// This function projects lat/lon coordinates to approximate meters.
function computePolygonArea(
  coords: { lat: number; lon: number }[],
  refLat: number
): number {
  // Approximate conversion: 1 degree latitude ≈ 111320 meters.
  const degToMeter = 111320;
  const cosRef = Math.cos((refLat * Math.PI) / 180);
  // Project points: x = lon * (degToMeter * cos(refLat)), y = lat * degToMeter.
  const projected = coords.map((pt) => ({
    x: pt.lon * degToMeter * cosRef,
    y: pt.lat * degToMeter,
  }));
  // Compute area using the shoelace formula.
  let area = 0;
  for (let i = 0; i < projected.length; i++) {
    const j = (i + 1) % projected.length;
    area += projected[i].x * projected[j].y - projected[j].x * projected[i].y;
  }
  return Math.abs(area) / 2;
}

export async function handleOverpassGet(
  latitude: number,
  longitude: number,
  radius: number
) {
  try {
    const overpassUrl = "https://overpass-api.de/api/interpreter";

    // Define Overpass QL queries for various infrastructure categories.
    const queries: { [key: string]: string } = {
      powerPlants: `
        [out:json][timeout:25];
        (
          node["power"="plant"](around:${radius},${latitude},${longitude});
          way["power"="plant"](around:${radius},${latitude},${longitude});
          relation["power"="plant"](around:${radius},${latitude},${longitude});
        );
        out body;
        >;
        out skel qt;
      `,
      schools: `
        [out:json][timeout:25];
        (
          node["amenity"="school"](around:${radius},${latitude},${longitude});
          way["amenity"="school"](around:${radius},${latitude},${longitude});
          relation["amenity"="school"](around:${radius},${latitude},${longitude});
        );
        out body;
        >;
        out skel qt;
      `,
      roads: `
        [out:json][timeout:25];
        way["highway"](around:${radius},${latitude},${longitude});
        out body;
        >;
        out skel qt;
      `,
      buildings: `
        [out:json][timeout:25];
        way["building"](around:${radius},${latitude},${longitude});
        out body;
        >;
        out skel qt;
      `,
      hospitals: `
        [out:json][timeout:25];
        (
          node["amenity"="hospital"](around:${radius},${latitude},${longitude});
          way["amenity"="hospital"](around:${radius},${latitude},${longitude});
          relation["amenity"="hospital"](around:${radius},${latitude},${longitude});
        );
        out body;
        >;
        out skel qt;
      `,
      bridges: `
        [out:json][timeout:25];
        way["bridge"](around:${radius},${latitude},${longitude});
        out body;
        >;
        out skel qt;
      `,
      railways: `
        [out:json][timeout:25];
        way["railway"](around:${radius},${latitude},${longitude});
        out body;
        >;
        out skel qt;
      `,
      airports: `
        [out:json][timeout:25];
        (
          node["aeroway"="aerodrome"](around:${radius},${latitude},${longitude});
          way["aeroway"="aerodrome"](around:${radius},${latitude},${longitude});
          relation["aeroway"="aerodrome"](around:${radius},${latitude},${longitude});
        );
        out body;
        >;
        out skel qt;
      `,
      waterways: `
        [out:json][timeout:25];
        way["waterway"](around:${radius},${latitude},${longitude});
        out body;
        >;
        out skel qt;
      `,
      industrial: `
        [out:json][timeout:25];
        (
          node["landuse"="industrial"](around:${radius},${latitude},${longitude});
          way["landuse"="industrial"](around:${radius},${latitude},${longitude});
          relation["landuse"="industrial"](around:${radius},${latitude},${longitude});
        );
        out body;
        >;
        out skel qt;
      `,
      natural: `
        [out:json][timeout:25];
        way["natural"](around:${radius},${latitude},${longitude});
        out body;
        >;
        out skel qt;
      `,
      emergency: `
        [out:json][timeout:25];
        (
          node["amenity"="fire_station"](around:${radius},${latitude},${longitude});
          way["amenity"="fire_station"](around:${radius},${latitude},${longitude});
          relation["amenity"="fire_station"](around:${radius},${latitude},${longitude});
          node["amenity"="police"](around:${radius},${latitude},${longitude});
          way["amenity"="police"](around:${radius},${latitude},${longitude});
          relation["amenity"="police"](around:${radius},${latitude},${longitude});
        );
        out body;
        >;
        out skel qt;
      `,
      flood: `
        [out:json][timeout:25];
        way["hazard"="flood"](around:${radius},${latitude},${longitude});
        out body;
        >;
        out skel qt;
      `,
      seismic: `
        [out:json][timeout:25];
        way["hazard"="earthquake"](around:${radius},${latitude},${longitude});
        out body;
        >;
        out skel qt;
      `,
      landUse: `
        [out:json][timeout:25];
        way["landuse"](around:${radius},${latitude},${longitude});
        out body;
        >;
        out skel qt;
      `,
    };

    // Run each query concurrently.
    const categories = Object.keys(queries);
    const fetchPromises = categories.map(async (category) => {
      const response = await fetch(overpassUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ data: queries[category] }).toString(),
      });

      if (!response.ok) {
        console.error(`Error fetching data for ${category}: ${response.status}`);
        return { category, error: `Error fetching data: ${response.status}` };
      }
      const data = await response.json();
    //   console.log(`Successfully fetched data for category: ${category}`);
      return { category, data };
    });

    const resultsArray = await Promise.all(fetchPromises);

    // Aggregate results into an object keyed by category.
    const results = resultsArray.reduce((acc, curr) => {
      acc[curr.category] = curr.data || { error: curr.error };
      return acc;
    }, {} as { [key: string]: any });

    // console.log("Overpass API results aggregated successfully.", results);

    // Create summarized output.
    const summarizedResults: { [key: string]: string } = {};
    for (const category in results) {
      const data = results[category];
      if (data.error) {
        summarizedResults[category] = data.error;
        continue;
      }
      if (data.elements && Array.isArray(data.elements)) {
        // Special handling for schools: compute total polygon area and show percentage of search area.
        if (category === "schools") {
          let totalArea = 0;
          let polygonCount = 0;
          for (const element of data.elements) {
            // Check if geometry exists and has more than 2 points (likely a polygon)
            if (element.geometry && Array.isArray(element.geometry) && element.geometry.length > 2) {
              // Each coordinate should be an object with lat and lon properties.
              const area = computePolygonArea(element.geometry, latitude);
              totalArea += area;
              polygonCount++;
            }
          }
          // Total area of the circular search region (in m²)
          const circleArea = Math.PI * radius * radius;
          const percentage =
            circleArea > 0 ? ((totalArea / circleArea) * 100).toFixed(2) : "0";
          summarizedResults[category] =
            polygonCount === 0
              ? "No polygon data for schools"
              : `Schools cover ${percentage}% of the search area`;
        } else if (category === "landUse") {
          // Breakdown landUse by tag values.
          const breakdown: { [key: string]: number } = {};
          for (const element of data.elements) {
            const landuseValue =
              element.tags && element.tags.landuse ? element.tags.landuse : "unknown";
            breakdown[landuseValue] = (breakdown[landuseValue] || 0) + 1;
          }
          const breakdownStr = Object.entries(breakdown)
            .map(([lu, cnt]) => `${lu}: ${cnt}`)
            .join(", ");
          summarizedResults[category] = breakdownStr;
        } else {
          // For other categories, simply count the number of elements.
          const count = data.elements.length;
          summarizedResults[category] =
            count === 0 ? `no ${category}` : `${count} ${category}`;
        }
      } else {
        summarizedResults[category] = "No data";
      }
    }

    // console.log("Summarized Overpass API results:", summarizedResults);

    // Return the plain JSON object including both the raw results and the summarized output.
    return {
      source: "OpenStreetMap Overpass API",
      latitude,
      longitude,
      radius,
      results, // full raw results
      summary: summarizedResults, // summarized info per category
    };
  } catch (error: any) {
    console.error("Server error:", error.message);
    return { error: "Server error: " + error.message };
  }
}
