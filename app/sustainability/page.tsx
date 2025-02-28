"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft } from "lucide-react";
import GoogleMapComponent from "@/components/google-map";
import { ResultsModal } from "@/components/results-modal";
import { LoadingAnimation } from "@/components/loading-animation";
import { ProjectData } from "@/types/project";

export default function SustainabilityPage() {
  const [projectData, setProjectData] = useState({
    idea: "",
    location: "",
    coordinates: { lat: 0, lng: 0 },
    radius: 1000,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [aggregatedData, setAggregatedData] = useState<ProjectData | null>(
    null
  );
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedProjectData = sessionStorage.getItem("projectData");
    if (savedProjectData) {
      const parsedData = JSON.parse(savedProjectData);
      setProjectData((prev) => ({ ...prev, ...parsedData, radius: 1000 }));
      setIsLoading(false);
    } else {
      router.push("/");
    }
  }, [router]);

  const handleBackClick = () => {
    router.push("/");
  };

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
          },
          project_name: projectData.idea,
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
      // Handle error appropriately (e.g., show a notification)
    } finally {
      setIsLoadingResults(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-gradient-to-b from-green-50 to-blue-50">
      <div className="p-4 bg-white shadow-md z-10">
        <Button
          variant="outline"
          onClick={handleBackClick}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Project Details
        </Button>
      </div>

      <div className="flex-1 relative p-4">
        {!isLoading && (
          <GoogleMapComponent
            center={projectData.coordinates}
            zoom={14}
            mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID || ""}
            radius={projectData.radius}
          />
        )}

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white p-6 rounded-lg shadow-lg z-10 w-96">
          <h2 className="text-xl font-bold mb-4 text-green-800">
            Adjust Project Area
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-green-700">Radius</span>
              <span className="text-sm text-green-600">
                {(projectData.radius / 1000).toFixed(1)} km
              </span>
            </div>
            <Slider
              value={[projectData.radius]}
              max={5000}
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
