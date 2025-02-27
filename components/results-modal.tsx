"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Leaf } from "lucide-react"

interface ResultsModalProps {
  projectData: {
    idea: string
    location: string
  }
  onClose: () => void
}

export function ResultsModal({ projectData, onClose }: ResultsModalProps) {
  const [currentTab, setCurrentTab] = useState("overview")
  const [animationProgress, setAnimationProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationProgress(78)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const sustainabilityScore = 78
  const feasibilityFactors = [
    { name: "Land Use Compatibility", status: "High" },
    { name: "Renewable Energy Potential", status: "Medium" },
    { name: "Biodiversity Impact", status: "Low" },
  ]
  const riskFactors = [
    { name: "Flood Risk", level: "Medium" },
    { name: "Climate Change Vulnerability", level: "High" },
    { name: "Environmental Pollution", level: "Low" },
  ]
  const fundingOpportunities = [
    { name: "Green City Initiative Grant", amount: "$50,000" },
    { name: "Coastal Ecosystem Restoration Fund", amount: "$100,000" },
    { name: "Sustainable Development Incentive", amount: "$25,000" },
  ]

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

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
            <TabsTrigger
              value="feasibility"
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
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
            <motion.div key={currentTab} variants={tabVariants} initial="hidden" animate="visible" exit="hidden">
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
                  <h3 className="text-xl font-semibold text-green-700 mb-4">Sustainability Score</h3>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                          Score
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-green-600">
                          {animationProgress}/100
                        </span>
                      </div>
                    </div>
                    <Progress value={animationProgress} className="h-4" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="feasibility" className="mt-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-green-700 mb-4">Feasibility Factors</h3>
                  <div className="space-y-4">
                    {feasibilityFactors.map((factor, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                        <span>{factor.name}</span>
                        <span
                          className={`font-semibold ${
                            factor.status === "High"
                              ? "text-green-600"
                              : factor.status === "Medium"
                                ? "text-yellow-600"
                                : "text-red-600"
                          }`}
                        >
                          {factor.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="risks" className="mt-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-green-700 mb-4">Risk & Impact Analysis</h3>
                  <div className="space-y-4">
                    {riskFactors.map((risk, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                        <span>{risk.name}</span>
                        <span
                          className={`font-semibold ${
                            risk.level === "High"
                              ? "text-red-600"
                              : risk.level === "Medium"
                                ? "text-yellow-600"
                                : "text-green-600"
                          }`}
                        >
                          {risk.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="funding" className="mt-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-green-700 mb-4">Funding & Incentive Opportunities</h3>
                  <div className="space-y-4">
                    {fundingOpportunities.map((opportunity, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                        <span>{opportunity.name}</span>
                        <span className="font-semibold text-green-600">{opportunity.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
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

