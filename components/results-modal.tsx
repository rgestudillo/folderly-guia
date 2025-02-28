"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Leaf, Cloud, Sun, AlertTriangle } from "lucide-react"

interface ResultsModalProps {
  projectData: {
    idea: string
    location: string
  }
  aggregatedData: any
  onClose: () => void
}

const getAirQualityIcon = (category: string) => {
  switch (category) {
    case 'Good':
      return <Sun className="h-6 w-6 text-green-600" />;
    case 'Moderate':
      return <Cloud className="h-6 w-6 text-yellow-600" />;
    case 'Unhealthy':
      return <AlertTriangle className="h-6 w-6 text-red-600" />;
    default:
      return null;
  }
};

export function ResultsModal({ projectData, aggregatedData, onClose }: ResultsModalProps) {
  const [currentTab, setCurrentTab] = useState("overview")
  const [animationProgress, setAnimationProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationProgress(78)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  // ... (the rest of your modal remains the same, but update any references 
  // to airQualityData to use aggregatedData.airQuality, and add solar data where desired)

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl bg-gradient-to-br from-green-50 to-blue-50">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-green-800 flex items-center gap-2">
            <Leaf className="h-8 w-8 text-green-600" />
            Sustainability Assessment Results
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-6" onValueChange={setCurrentTab}>
          <TabsList className="grid grid-cols-4 gap-4 bg-green-100 p-1 rounded-lg">
            <TabsTrigger value="overview" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="feasibility" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Feasibility
            </TabsTrigger>
            <TabsTrigger value="risks" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Risks
            </TabsTrigger>
            <TabsTrigger value="funding" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Funding
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <motion.div key={currentTab} initial="hidden" animate="visible" exit="hidden" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
              <TabsContent value="overview" className="mt-6 space-y-4">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-green-700 mb-4">Project Details</h3>
                  <p>
                    <strong>Idea:</strong> {projectData.idea}
                  </p>
                  <p>
                    <strong>Location:</strong> {projectData.location}
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-green-700 mb-4">Air Quality Data</h3>
                  {aggregatedData && aggregatedData.airQuality ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                        <span className="font-semibold">AQI:</span>
                        <span>{aggregatedData.airQuality.aqi}</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                        <span className="font-semibold">Category:</span>
                        <div className="flex items-center">
                          {getAirQualityIcon(aggregatedData.airQuality.category)}
                          <span className="ml-2">{aggregatedData.airQuality.category}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                        <span className="font-semibold">Dominant Pollutant:</span>
                        <span>{aggregatedData.airQuality.dominantPollutant}</span>
                      </div>
                    </div>
                  ) : (
                    <p>No air quality data available.</p>
                  )}
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-green-700 mb-4">Solar Data</h3>
                  {aggregatedData && aggregatedData.solar && aggregatedData.solar.solarPotential ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                        <span className="font-semibold">Max Panels Count:</span>
                        <span>{aggregatedData.solar.solarPotential.maxArrayPanelsCount}</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                        <span className="font-semibold">Max Array Area (m²):</span>
                        <span>{aggregatedData.solar.solarPotential.maxArrayAreaMeters2}</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                        <span className="font-semibold">Max Sunshine Hours/Year:</span>
                        <span>{aggregatedData.solar.solarPotential.maxSunshineHoursPerYear}</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                        <span className="font-semibold">Carbon Offset Factor (kg/MWh):</span>
                        <span>{aggregatedData.solar.solarPotential.carbonOffsetFactorKgPerMwh}</span>
                      </div>
                    </div>
                  ) : (
                    <p>No solar data available.</p>
                  )}
                </div>


                {/* Additional tabs (feasibility, risks, funding) remain unchanged */}
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>

        <div className="mt-6 flex justify-end">
          <Button onClick={onClose} className="bg-green-600 hover:bg-green-700 text-white">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
