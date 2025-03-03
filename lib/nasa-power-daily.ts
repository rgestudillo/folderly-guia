/**
 * Retrieves daily NASA POWER data for the given latitude and longitude.
 * It fetches data for the past 30 days and returns the JSON response.
 */
export async function handleNASAPowerDailyGet(latitude: number, longitude: number) {
    try {
        // Helper function to format dates as YYYYMMDD.
        const formatDate = (date: Date): string => {
            const year = date.getFullYear();
            const month = ('0' + (date.getMonth() + 1)).slice(-2);
            const day = ('0' + date.getDate()).slice(-2);
            return `${year}${month}${day}`;
        };

        // Define the date range: last 30 days.
        const now = new Date();
        const endDate = formatDate(now);
        // Subtract 29 days to include today (30-day period total).
        const startDate = formatDate(new Date(now.getTime() - 29 * 24 * 60 * 60 * 1000));

        // Define the parameters. For example:
        // ALLSKY_SFC_SW_DWN: Daily sum of solar radiation [W/m^2]
        // T2M: 2-meter air temperature [°C]
        // WS10M: 10-meter wind speed [m/s]
        const parameters = "ALLSKY_SFC_SW_DWN,T2M,WS10M";

        // Set the community (e.g. "AG" for agriculture, which is common in NASA POWER queries).
        const community = "AG";

        // Construct the URL for the NASA POWER daily API endpoint.
        const url = `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=${parameters}&community=${community}&longitude=${longitude}&latitude=${latitude}&start=${startDate}&end=${endDate}&format=JSON`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching NASA POWER data. Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error: any) {
        console.error("handleNASAPowerDailyGet error:", error);
        return { error: error.message };
    }
}
