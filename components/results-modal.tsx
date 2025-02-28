"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Leaf,
  Cloud,
  Sun,
  AlertTriangle,
  Download,
  BarChart3,
  Lightbulb,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ResultsModalProps {
  projectData: {
    idea: string;
    location: string;
  };
  aggregatedData: any;
  onClose: () => void;
}

const getAirQualityIcon = (category: string) => {
  switch (category?.toLowerCase()) {
    case "good":
      return <Sun className="h-6 w-6 text-green-600" />;
    case "moderate":
      return <Cloud className="h-6 w-6 text-yellow-600" />;
    case "unhealthy":
    case "unhealthy for sensitive groups":
      return <AlertTriangle className="h-6 w-6 text-red-600" />;
    default:
      return <Cloud className="h-6 w-6 text-gray-600" />;
  }
};

const getAirQualityColor = (category: string) => {
  switch (category?.toLowerCase()) {
    case "good":
      return "bg-green-100 text-green-800 border-green-300";
    case "moderate":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "unhealthy":
    case "unhealthy for sensitive groups":
      return "bg-red-100 text-red-800 border-red-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
};

export function ResultsModal({
  projectData,
  aggregatedData,
  onClose,
}: ResultsModalProps) {
  const [currentTab, setCurrentTab] = useState("overview");

  const getSolarScore = () => {
    if (!aggregatedData?.solar?.solarPotential) return 0;

    const maxSunshine =
      aggregatedData.solar.solarPotential.maxSunshineHoursPerYear;
    // Calculate a score from 0-100 based on sunshine hours (assuming 2000+ hours is excellent)
    return Math.min(100, Math.round((maxSunshine / 2000) * 100));
  };

  const getAirQualityScore = () => {
    if (!aggregatedData?.airQuality?.aqi) return 0;

    const aqi = aggregatedData.airQuality.aqi;
    // Lower AQI is better, so invert the scale (0-500 AQI scale)
    return Math.max(0, 100 - Math.round((aqi / 500) * 100));
  };

  const getOverallScore = () => {
    const solarScore = getSolarScore();
    const airScore = getAirQualityScore();

    // Simple average for now, could be weighted
    return Math.round((solarScore + airScore) / 2);
  };

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl bg-gradient-to-br from-green-50 to-blue-50 p-0 overflow-hidden">
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-green-100 p-6">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-green-800 flex items-center gap-2">
              <Leaf className="h-8 w-8 text-green-600" />
              Sustainability Assessment
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="p-6 max-h-[80vh] overflow-y-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-green-800">
                Overall Sustainability Score
              </h3>
              <Badge
                variant="outline"
                className="text-lg px-3 py-1 bg-green-100 text-green-800 border-green-300"
              >
                {getOverallScore()}%
              </Badge>
            </div>
            <Progress value={getOverallScore()} className="h-3 bg-gray-200" />
          </div>

          <Tabs
            defaultValue="overview"
            className="mt-6"
            onValueChange={setCurrentTab}
          >
            <TabsList className="grid grid-cols-4 gap-4 bg-green-100/50 p-1 rounded-lg">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="air-quality"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                Air Quality
              </TabsTrigger>
              <TabsTrigger
                value="solar"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                Solar Potential
              </TabsTrigger>
              <TabsTrigger
                value="recommendations"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                Recommendations
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TabsContent value="overview" className="mt-6 space-y-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
                    <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Project Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-600 font-medium">
                          Project Idea
                        </p>
                        <p className="text-lg font-medium mt-1">
                          {projectData.idea || "Not specified"}
                        </p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-600 font-medium">
                          Location
                        </p>
                        <p className="text-lg font-medium mt-1">
                          {projectData.location || "Not specified"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
                      <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center gap-2">
                        <Cloud className="h-5 w-5" />
                        Air Quality Summary
                      </h3>
                      {aggregatedData?.airQuality ? (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">
                              Air Quality Index:
                            </span>
                            <Badge
                              variant="outline"
                              className={`${getAirQualityColor(
                                aggregatedData.airQuality.category
                              )}`}
                            >
                              {aggregatedData.airQuality.aqi}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-medium">Category:</span>
                            <div className="flex items-center gap-2">
                              {getAirQualityIcon(
                                aggregatedData.airQuality.category
                              )}
                              <span>{aggregatedData.airQuality.category}</span>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            className="w-full mt-2"
                            onClick={() => setCurrentTab("air-quality")}
                          >
                            View Details
                          </Button>
                        </div>
                      ) : (
                        <p className="text-gray-500 italic">
                          No air quality data available.
                        </p>
                      )}
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
                      <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center gap-2">
                        <Sun className="h-5 w-5" />
                        Solar Potential Summary
                      </h3>
                      {aggregatedData?.solar?.solarPotential ? (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">Solar Score:</span>
                            <Badge
                              variant="outline"
                              className="bg-yellow-100 text-yellow-800 border-yellow-300"
                            >
                              {getSolarScore()}%
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-medium">
                              Max Sunshine Hours/Year:
                            </span>
                            <span>
                              {
                                aggregatedData.solar.solarPotential
                                  .maxSunshineHoursPerYear
                              }
                            </span>
                          </div>
                          <Button
                            variant="outline"
                            className="w-full mt-2"
                            onClick={() => setCurrentTab("solar")}
                          >
                            View Details
                          </Button>
                        </div>
                      ) : (
                        <p className="text-gray-500 italic">
                          No solar data available.
                        </p>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="air-quality" className="mt-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
                    <h3 className="text-xl font-semibold text-green-700 mb-4">
                      Air Quality Analysis
                    </h3>
                    {aggregatedData?.airQuality ? (
                      <div className="space-y-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="flex-1 p-5 bg-green-50 rounded-xl flex flex-col items-center justify-center">
                            <div className="text-5xl font-bold text-green-700 mb-2">
                              {aggregatedData.airQuality.aqi}
                            </div>
                            <div className="text-sm text-green-600">
                              Air Quality Index
                            </div>
                          </div>

                          <div className="flex-1 p-5 bg-green-50 rounded-xl flex flex-col items-center justify-center">
                            <div className="mb-2">
                              {getAirQualityIcon(
                                aggregatedData.airQuality.category
                              )}
                            </div>
                            <div className="text-xl font-semibold text-center">
                              {aggregatedData.airQuality.category}
                            </div>
                            <div className="text-sm text-green-600 text-center mt-1">
                              Current Condition
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 bg-green-50 rounded-lg">
                            <p className="text-sm text-green-600 font-medium">
                              Dominant Pollutant
                            </p>
                            <p className="text-lg font-medium mt-1">
                              {aggregatedData.airQuality.dominantPollutant ||
                                "Not available"}
                            </p>
                          </div>

                          {aggregatedData.airQuality.pollutants && (
                            <div className="p-4 bg-green-50 rounded-lg">
                              <p className="text-sm text-green-600 font-medium">
                                Health Implications
                              </p>
                              <p className="text-base mt-1">
                                {aggregatedData.airQuality.category === "Good"
                                  ? "Air quality is considered satisfactory, and air pollution poses little or no risk."
                                  : aggregatedData.airQuality.category ===
                                    "Moderate"
                                  ? "Air quality is acceptable; however, there may be a moderate health concern for a very small number of people."
                                  : "Members of sensitive groups may experience health effects. The general public is less likely to be affected."}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">
                        No air quality data available.
                      </p>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="solar" className="mt-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
                    <h3 className="text-xl font-semibold text-green-700 mb-4">
                      Solar Potential Analysis
                    </h3>
                    {aggregatedData?.solar?.solarPotential ? (
                      <div className="space-y-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="flex-1 p-5 bg-yellow-50 rounded-xl flex flex-col items-center justify-center">
                            <div className="text-5xl font-bold text-yellow-600 mb-2">
                              {getSolarScore()}%
                            </div>
                            <div className="text-sm text-yellow-600">
                              Solar Potential Score
                            </div>
                          </div>

                          <div className="flex-1 p-5 bg-yellow-50 rounded-xl flex flex-col items-center justify-center">
                            <div className="mb-2">
                              <Sun className="h-8 w-8 text-yellow-500" />
                            </div>
                            <div className="text-xl font-semibold text-center">
                              {
                                aggregatedData.solar.solarPotential
                                  .maxSunshineHoursPerYear
                              }
                            </div>
                            <div className="text-sm text-yellow-600 text-center mt-1">
                              Max Sunshine Hours/Year
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 bg-yellow-50 rounded-lg">
                            <p className="text-sm text-yellow-600 font-medium">
                              Max Panels Count
                            </p>
                            <p className="text-lg font-medium mt-1">
                              {aggregatedData.solar.solarPotential
                                .maxArrayPanelsCount || "Not available"}
                            </p>
                          </div>

                          <div className="p-4 bg-yellow-50 rounded-lg">
                            <p className="text-sm text-yellow-600 font-medium">
                              Max Array Area
                            </p>
                            <p className="text-lg font-medium mt-1">
                              {aggregatedData.solar.solarPotential
                                .maxArrayAreaMeters2 || "0"}{" "}
                              m²
                            </p>
                          </div>

                          <div className="p-4 bg-yellow-50 rounded-lg">
                            <p className="text-sm text-yellow-600 font-medium">
                              Carbon Offset Factor
                            </p>
                            <p className="text-lg font-medium mt-1">
                              {aggregatedData.solar.solarPotential
                                .carbonOffsetFactorKgPerMwh || "0"}{" "}
                              kg/MWh
                            </p>
                          </div>

                          <div className="p-4 bg-yellow-50 rounded-lg">
                            <p className="text-sm text-yellow-600 font-medium">
                              Potential Annual Savings
                            </p>
                            <p className="text-lg font-medium mt-1">
                              {aggregatedData.solar.solarPotential
                                .maxArrayPanelsCount &&
                              aggregatedData.solar.solarPotential
                                .maxSunshineHoursPerYear
                                ? `$${Math.round(
                                    ((aggregatedData.solar.solarPotential
                                      .maxArrayPanelsCount *
                                      0.3 *
                                      aggregatedData.solar.solarPotential
                                        .maxSunshineHoursPerYear) /
                                      1000) *
                                      0.15 *
                                      1000
                                  )}/year`
                                : "Not available"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">
                        No solar data available.
                      </p>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="recommendations" className="mt-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
                    <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center gap-2">
                      <Lightbulb className="h-5 w-5" />
                      Sustainability Recommendations
                    </h3>

                    <div className="space-y-6">
                      {aggregatedData?.airQuality && (
                        <div className="p-5 bg-green-50 rounded-xl">
                          <h4 className="font-semibold text-lg text-green-700 mb-3">
                            Air Quality Recommendations
                          </h4>
                          <ul className="space-y-2 list-disc pl-5">
                            {aggregatedData.airQuality.category === "Good" ? (
                              <>
                                <li>
                                  The air quality in this area is good, making
                                  it suitable for outdoor activities.
                                </li>
                                <li>
                                  Consider incorporating green spaces to
                                  maintain or improve air quality.
                                </li>
                                <li>
                                  Implement sustainable transportation options
                                  to preserve the good air quality.
                                </li>
                              </>
                            ) : aggregatedData.airQuality.category ===
                              "Moderate" ? (
                              <>
                                <li>
                                  Air quality is moderate - consider adding air
                                  filtration systems in indoor spaces.
                                </li>
                                <li>
                                  Plant air-purifying vegetation around the
                                  project area.
                                </li>
                                <li>
                                  Implement policies to reduce emissions from
                                  the project.
                                </li>
                              </>
                            ) : (
                              <>
                                <li>
                                  Air quality is concerning - robust air
                                  filtration systems are strongly recommended.
                                </li>
                                <li>
                                  Consider scheduling outdoor activities during
                                  times when air quality is better.
                                </li>
                                <li>
                                  Implement strict emission controls for any
                                  project operations.
                                </li>
                                <li>
                                  Create indoor green spaces with air-purifying
                                  plants.
                                </li>
                              </>
                            )}
                          </ul>
                        </div>
                      )}

                      {aggregatedData?.solar?.solarPotential && (
                        <div className="p-5 bg-yellow-50 rounded-xl">
                          <h4 className="font-semibold text-lg text-yellow-700 mb-3">
                            Solar Energy Recommendations
                          </h4>
                          <ul className="space-y-2 list-disc pl-5">
                            {getSolarScore() > 70 ? (
                              <>
                                <li>
                                  Excellent solar potential! Consider installing
                                  solar panels to power your project.
                                </li>
                                <li>
                                  With{" "}
                                  {
                                    aggregatedData.solar.solarPotential
                                      .maxArrayPanelsCount
                                  }{" "}
                                  potential panels, you could generate
                                  significant renewable energy.
                                </li>
                                <li>
                                  Explore solar incentives and tax credits
                                  available in your area.
                                </li>
                                <li>
                                  Consider battery storage to maximize solar
                                  energy utilization.
                                </li>
                              </>
                            ) : getSolarScore() > 40 ? (
                              <>
                                <li>
                                  Moderate solar potential. Solar panels could
                                  still be beneficial but may require
                                  optimization.
                                </li>
                                <li>
                                  Consider high-efficiency panels to maximize
                                  energy production.
                                </li>
                                <li>
                                  Explore partial solar implementation for
                                  specific energy needs.
                                </li>
                              </>
                            ) : (
                              <>
                                <li>
                                  Limited solar potential in this area. Consider
                                  alternative renewable energy sources.
                                </li>
                                <li>
                                  If pursuing solar, focus on the most optimal
                                  locations within your project area.
                                </li>
                                <li>
                                  Consider energy efficiency measures to reduce
                                  overall energy needs.
                                </li>
                              </>
                            )}
                          </ul>
                        </div>
                      )}

                      <div className="p-5 bg-blue-50 rounded-xl">
                        <h4 className="font-semibold text-lg text-blue-700 mb-3">
                          General Sustainability Recommendations
                        </h4>
                        <ul className="space-y-2 list-disc pl-5">
                          <li>
                            Implement rainwater harvesting systems to reduce
                            water consumption.
                          </li>
                          <li>
                            Use sustainable building materials with low
                            environmental impact.
                          </li>
                          <li>
                            Design for energy efficiency with proper insulation
                            and smart systems.
                          </li>
                          <li>
                            Create green spaces that support local biodiversity.
                          </li>
                          <li>
                            Consider achieving green building certification
                            (LEED, BREEAM, etc.).
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </div>

        <div className="sticky bottom-0 z-10 bg-white/80 backdrop-blur-sm border-t border-green-100 p-6 flex justify-end">
          <Button
            onClick={onClose}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
