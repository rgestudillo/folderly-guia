// weather-statistics.ts

export async function handleWeatherStatistics(lat: number, lon: number, units: string = "standard") {
    try {
      const apiKey = process.env.OPENWEATHERMAP_API_KEY;
      if (!apiKey) {
        throw new Error("Missing OpenWeatherMap API key");
      }
  
      // Use today's date in YYYY-MM-DD format.
      const today = new Date();
      const date = today.toISOString().split("T")[0];
  
      // Compute the timezone offset in the format "+HH:MM" or "-HH:MM".
      const offsetMinutes = today.getTimezoneOffset();
      const sign = offsetMinutes > 0 ? "-" : "+";
      const absOffset = Math.abs(offsetMinutes);
      const offsetHours = String(Math.floor(absOffset / 60)).padStart(2, "0");
      const offsetMins = String(absOffset % 60).padStart(2, "0");
      const tz = `${sign}${offsetHours}:${offsetMins}`;
  
      // Construct the API URL.
      const url = `https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${lat}&lon=${lon}&date=${date}&tz=${tz}&appid=${apiKey}&units=${units}`;
  
      const response = await fetch(url, { method: "GET" });
      if (!response.ok) {
        throw new Error(`Error fetching weather statistics. Status: ${response.status}`);
      }
      const data = await response.json();
  
      // Simplify the response: extract only the key details.
      const parsedData = {
        lat: data.lat,
        lon: data.lon,
        date: data.date,
        timezone: data.tz,
        units: data.units,
        cloud_cover: data.cloud_cover ? data.cloud_cover.afternoon : null,
        humidity: data.humidity ? data.humidity.afternoon : null,
        precipitation: data.precipitation ? data.precipitation.total : null,
        temperature: {
          min: data.temperature ? data.temperature.min : null,
          max: data.temperature ? data.temperature.max : null,
          afternoon: data.temperature ? data.temperature.afternoon : null,
        },
        pressure: data.pressure ? data.pressure.afternoon : null,
        wind: data.wind && data.wind.max ? {
          speed: data.wind.max.speed,
          direction: data.wind.max.direction,
        } : null,
      };
  
      return parsedData;
    } catch (error: any) {
      console.error("handleWeatherStatistics error:", error);
      return { error: error.message };
    }
  }
  