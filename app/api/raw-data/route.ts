import { NextResponse } from 'next/server';
import { handleAirQualityPost } from '@/lib/api/4_air_pollution_data/air-quality';
import { handleSolarGet } from '@/lib/api/1_climate_weather_data/solar';
import { handleGBIFGet } from '@/lib/api/2_bio_ecosystem_data/gbif';
import { handleSoilData } from '@/lib/api/2_bio_ecosystem_data/soil-data';
import { handleNearbyPlaceCounts } from '@/lib/nearby-places';
import { handleWeatherStatistics } from '@/lib/api/1_climate_weather_data/weather-statistics';
import { handleNASAPowerDailyGet } from '@/lib/api/1_climate_weather_data/nasa-power-daily';
import { handleDisasterGet } from '@/lib/api/3_disaster_risk_hazard_data/disaster';
import { handleOverpassGet } from '@/lib/api/5_renewable_infrastructure_data/overpass';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (!body.location || body.location.latitude === undefined || body.location.longitude === undefined) {
            return NextResponse.json(
                { error: 'Request body must include a "location" object with "latitude" and "longitude" properties.' },
                { status: 400 }
            );
        }

        const { latitude, longitude } = body.location;
        const radius = body.radius || 1000;

        // Execute all API calls concurrently
        const [
            airQualityData,
            solarData,
            biodiversityData,
            soilData,
            nearbyPlacesData,
            weatherData,
            dailyClimateData,
            disasterData,
            overpassData
        ] = await Promise.all([
            handleAirQualityPost(latitude, longitude),
            handleSolarGet(latitude, longitude),
            handleGBIFGet(latitude, longitude),
            handleSoilData(latitude, longitude, radius / 1000),
            handleNearbyPlaceCounts(latitude, longitude, radius),
            handleWeatherStatistics(latitude, longitude),
            handleNASAPowerDailyGet(latitude, longitude),
            handleDisasterGet(latitude, longitude),
            handleOverpassGet(latitude, longitude, radius)
        ]);

        // Return the raw data
        return NextResponse.json({
            airQuality: airQualityData,
            solar: solarData,
            biodiversity: biodiversityData,
            soil: soilData,
            nearbyPlaces: nearbyPlacesData,
            weather: weatherData,
            climateData: dailyClimateData,
            disasters: disasterData,
            infrastructure: overpassData
        });
    } catch (error: any) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Server error: ' + error.message },
            { status: 500 }
        );
    }
} 