export async function handleNearbyPlaceCounts(
    latitude: number,
    longitude: number,
    radius: number
  ) {
    console.log("radius: " + radius);

    try {
      const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      if (!googleApiKey) {
        throw new Error("Missing Google API key");
      }
  
      // Define a set of sustainability-related place types.
      const types = ["hospital", "school", "park", "restaurant", "cafe"];
  
      // Prepare an object to hold the count for each type.
      const typeCounts: Record<string, number> = {};
  
      // Function to fetch a single page and accumulate results.
      const fetchPage = async (url: string): Promise<{results: any[], next_page_token?: string}> => {
        const response = await fetch(url, { method: "GET" });
        if (!response.ok) {
          throw new Error(`Error fetching nearby places. Status: ${response.status}`);
        }
        return response.json();
      };
  
      // For each type, fetch nearby places and count the results.
      await Promise.all(
        types.map(async (type) => {
          let count = 0;
          let pageToken: string | undefined;
          do {
            let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${encodeURIComponent(
              type
            )}&key=${googleApiKey}`;
            if (pageToken) {
              url += `&pagetoken=${pageToken}`;
              // Wait for a moment to let the next_page_token become active.
              await new Promise((resolve) => setTimeout(resolve, 2000));
            }
            const data = await fetchPage(url);
            count += data.results ? data.results.length : 0;
            pageToken = data.next_page_token;
          } while (pageToken);
          typeCounts[type] = count;
        })
      );
  
      return typeCounts;
    } catch (error: any) {
      console.error("handleNearbyPlaceCounts error:", error);
      return { error: error.message };
    }
  }
  