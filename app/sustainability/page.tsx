"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ResultsModal } from "@/components/results-modal";
import { LoadingAnimation } from "@/components/loading-animation";
import { ProjectData } from "@/types/project";
import MapboxMap from "@/components/MapboxMap";

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
      const response = await fetch("/api/sustainability", {
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
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch aggregated data");
      }
      const data: ProjectData = await response.json();
      console.log(data);
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
      <div className="flex-1 relative p-4">
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
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/70 dark:bg-gray-800/70 p-6 rounded-lg shadow-lg z-10 w-96 border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-green-800 dark:text-green-400 text-center">
              Adjust Project Area
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-700 dark:text-green-400">
                  Radius
                </span>
                <span className="text-sm text-green-600 dark:text-green-400">
                  {(projectData.radius / 1000).toFixed(1)} km
                </span>
              </div>
              <Slider
                value={[projectData.radius]}
                max={2000}
                min={100}
                step={100}
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

      {isLoadingResults && <LoadingAnimation />}

      {showResults && aggregatedData && (
        <ResultsModal
          projectData={aggregatedData}
          onClose={() => setShowResults(false)}
        />
      )}
    </div>
  );
}
