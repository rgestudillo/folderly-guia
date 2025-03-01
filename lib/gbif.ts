const GBIF_API_BASE_URL = 'https://api.gbif.org/v1';

export async function handleGBIFGet(latitude: number, longitude: number, radius: number = 500) {
    try {
        // Convert radius from meters to degrees (approximate)
        const degreeRadius = radius / 111320; // 1 degree ≈ 111.32 km at the equator

        // Create the bounding box for the search
        const boundingBox = {
            decimalLatitude: `${latitude - degreeRadius},${latitude + degreeRadius}`,
            decimalLongitude: `${longitude - degreeRadius},${longitude + degreeRadius}`
        };

        // Fetch occurrence data from GBIF
        const response = await fetch(
            `${GBIF_API_BASE_URL}/occurrence/search?` +
            new URLSearchParams({
                ...boundingBox,
                limit: '100',  // Limit results to 100 occurrences
                hasCoordinate: 'true',
            })
        );

        if (!response.ok) {
            throw new Error(`GBIF API error: ${response.statusText}`);
        }

        const data = await response.json();

        // Process and summarize the biodiversity data
        const speciesSummary = data.results.reduce((acc: any, curr: any) => {
            const species = curr.species || 'Unknown species';
            acc[species] = (acc[species] || 0) + 1;
            return acc;
        }, {});

        return {
            totalResults: data.count,
            speciesCount: Object.keys(speciesSummary).length,
            speciesSummary,
            recentObservations: data.results.slice(0, 5).map((result: any) => ({
                species: result.species,
                scientificName: result.scientificName,
                lastObserved: result.eventDate,
                kingdom: result.kingdom,
            }))
        };
    } catch (error: any) {
        console.error('GBIF API Error:', error);
        throw new Error(`Failed to fetch biodiversity data: ${error.message}`);
    }
}