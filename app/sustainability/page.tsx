"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ResultsModal } from "@/components/results-modal";
import { LoadingAnimation } from "@/components/loading-animation";
import { ProjectData } from "@/types/project";
import MapboxMap from "@/components/MapboxMap";

// Legend item component: displays a color swatch, category label, and an info icon.
// On hover over the info icon, a tooltip with the list of values appears.
interface LegendItemProps {
  category: string;
  color: string;
  values: string[];
}

const LegendItem: React.FC<LegendItemProps> = ({ category, color, values }) => {
  return (
    <li className="flex items-center">
      <div className="flex items-center">
        <span className="w-3 h-3 inline-block" style={{ backgroundColor: color }}></span>
        <span className="ml-2">{category}</span>
      </div>
      <div className="ml-auto relative group pl-2">
        <span className="text-gray-500 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 inline-block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
        </span>
        <div className="absolute right-0 top-full mt-1 hidden group-hover:block bg-white dark:bg-gray-700 p-2 rounded shadow text-xs whitespace-normal z-30">
          {values.join(", ")}
        </div>
      </div>
    </li>
  );
};

// Legend component: lists all categories.
const Legend = () => {
  return (
    <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 p-4 rounded shadow z-20">
      <h3 className="text-sm font-bold mb-2">Legend</h3>
      <ul className="space-y-1 text-xs">
        <LegendItem
          category="Transportation"
          color="#FF8A65"
          values={["aerodrome", "highway", "parking", "railway"]}
        />
        <LegendItem
          category="Agriculture"
          color="#AED581"
          values={[
            "allotments",
            "aquaculture",
            "farmland",
            "farmyard",
            "forest",
            "orchard",
            "greenhouse_horticulture",
            "meadow",
            "plant_nursery",
            "vineyard",
          ]}
        />
        <LegendItem
          category="Water"
          color="#81D4FA"
          values={["basin", "salt_pond"]}
        />
        <LegendItem
          category="Natural or Developed"
          color="#FFB74D"
          values={["beach", "beach_resort", "cemetery", "grave_yard"]}
        />
        <LegendItem
          category="Developed"
          color="#90A4AE"
          values={[
            "brownfield",
            "construction",
            "commercial",
            "college",
            "hospital",
            "industrial",
            "landfill",
            "quarry",
            "recreation_ground",
            "religious",
            "residential",
            "retail",
            "school",
            "university",
            "wastewater_plant",
          ]}
        />
        <LegendItem
          category="Leisure"
          color="#FFF59D"
          values={["garden", "national_park", "nature_reserve", "park", "village_green"]}
        />
        <LegendItem
          category="Other"
          color="#CE93D8"
          values={["greenfield"]}
        />
        <LegendItem
          category="Military"
          color="#F48FB1"
          values={["military"]}
        />
      </ul>
    </div>
  );
};

export default function SustainabilityPage() {
  const [projectData, setProjectData] = useState({
    idea: "",
    location: "",
    coordinates: { lat: 0, lng: 0 },
    radius: 200, // in meters
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [aggregatedData, setAggregatedData] = useState<ProjectData | null>(null);
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const [rawData, setRawData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const savedProjectData = sessionStorage.getItem("projectData");
    if (savedProjectData) {
      const parsedData = JSON.parse(savedProjectData);
      setProjectData((prev) => ({ ...prev, ...parsedData, radius: 200 }));
      setIsLoading(false);
    } else {
      router.push("/");
    }
  }, [router]);

  const handleRadiusChange = (value: number[]) => {
    setProjectData((prev) => ({ ...prev, radius: value[0] }));
  };

  const handleConfirm = async () => {
    setIsLoadingResults(true);
    try {
      // First, get the raw data
      const rawDataResponse = await fetch("/api/raw-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          location: {
            latitude: projectData.coordinates.lat,
            longitude: projectData.coordinates.lng,
            location_name: projectData.location,
          },
          radius: projectData.radius,
        }),
      });

      if (!rawDataResponse.ok) {
        throw new Error("Failed to fetch raw data");
      }

      const rawData = await rawDataResponse.json();
      setRawData(rawData);
      console.log("RAW DATA: ", rawData);

      // Then, use the raw data for sustainability analysis
      const sustainabilityResponse = await fetch("/api/sustainability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          location: {
            latitude: projectData.coordinates.lat,
            longitude: projectData.coordinates.lng,
            location_name: projectData.location,
          },
          project_idea: projectData.idea,
          radius: projectData.radius,
          raw_data: rawData,
        }),
      });

      if (!sustainabilityResponse.ok) {
        throw new Error("Failed to fetch aggregated data");
      }

      const data: ProjectData = await sustainabilityResponse.json();
      setAggregatedData(data);
      setShowResults(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingResults(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-gradient-to-b from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="flex-1 relative p-2">
        {/* Legend in the upper left */}
        <Legend />

        {!isLoading && (
          <MapboxMap
            center={projectData.coordinates}
            zoom={16}
            radius={projectData.radius}
            onRadiusChange={(newRadius) =>
              setProjectData((prev) => ({ ...prev, radius: newRadius }))
            }
            rotateMap={isLoadingResults}
          />
        )}

        {/* Render the Adjust Project Area section only when not loading */}
        {!isLoadingResults && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 dark:bg-gray-800/90 p-6 rounded-lg shadow-lg z-10 w-96 border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-green-800 dark:text-green-400 text-center">
              Adjust Project Area
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-700 dark:text-green-400">
                  Radius
                </span>
                <span className="text-sm text-green-600 dark:text-green-400">
                  {projectData.radius} meters
                </span>
              </div>
              <Slider
                value={[projectData.radius]}
                max={300}
                min={0}
                step={25}
                onValueChange={handleRadiusChange}
                className="w-full"
              />
              <Button
                onClick={handleConfirm}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Confirm and View Results
              </Button>
            </div>
          </div>
        )}
      </div>

      {isLoadingResults && (
        <LoadingAnimation
          rawData={rawData}
          aggregatedData={aggregatedData}
        />
      )}

      {showResults && aggregatedData && (
        <ResultsModal
          projectData={aggregatedData}
          onClose={() => setShowResults(false)}
        />
      )}
    </div>
  );
}
