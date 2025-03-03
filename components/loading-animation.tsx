"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sprout, Sun, Cloud, Wind, Droplets, Thermometer, Loader2, Globe, AlertTriangle, Map, AlertCircle, Clock } from "lucide-react";
import { useState, useEffect } from "react";

interface LoadingAnimationProps {
  rawData: any;
  aggregatedData: any;
}

export function LoadingAnimation({ rawData, aggregatedData }: LoadingAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  const apis = [
    {
      icon: Sun,
      name: "NASA POWER",
      color: "from-orange-500 to-amber-500",
      data: rawData?.climateData
    },
    {
      icon: Sun,
      name: "Google Solar",
      color: "from-yellow-500 to-orange-500",
      data: rawData?.solar
    },
    {
      icon: Cloud,
      name: "OpenWeatherMap",
      color: "from-blue-500 to-cyan-500",
      data: rawData?.weather
    },
    {
      icon: Sprout,
      name: "GBIF",
      color: "from-green-500 to-emerald-500",
      data: rawData?.biodiversity
    },
    {
      icon: Droplets,
      name: "OpenEPI Soil",
      color: "from-brown-500 to-amber-500",
      data: rawData?.soil
    },
    {
      icon: Thermometer,
      name: "Air Quality",
      color: "from-purple-500 to-pink-500",
      data: rawData?.airQuality
    },
    {
      icon: Wind,
      name: "Pollen Data",
      color: "from-purple-500 to-pink-500",
      data: rawData?.pollen
    },
    {
      icon: AlertTriangle,
      name: "Disaster Risk",
      color: "from-red-500 to-orange-500",
      data: rawData?.disasters
    },
    {
      icon: Map,
      name: "Infrastructure",
      color: "from-blue-500 to-indigo-500",
      data: rawData?.infrastructure
    }
  ];

  useEffect(() => {
    if (rawData) {
      const interval = setInterval(() => {
        if (currentStep < apis.length) {
          setIsChecking(true);
          setTimeout(() => {
            setIsChecking(false);
            setCurrentStep(prev => prev + 1);
          }, 1000);
        }
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [currentStep, rawData, apis.length]);

  // Initial loading state when rawData is not available
  if (!rawData) {
    return (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="bg-white/95 dark:bg-gray-800/95 p-4 sm:p-6 md:p-8 rounded-xl shadow-xl w-full max-w-[90vw] sm:max-w-[600px] h-auto min-h-[50vh] sm:min-h-[60vh] md:min-h-[400px] max-h-[85vh] md:max-h-[80vh] flex flex-col items-center justify-center border border-gray-100 dark:border-gray-700"
        >
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse"></div>
            <div className="relative">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-green-500/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-green-500 rounded-full animate-spin border-t-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 animate-bounce" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200">
                Fetching Environmental Data
              </h3>
            </div>
            <div className="max-w-md">
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                Gathering comprehensive information about your location&apos;s climate, biodiversity, and environmental factors...
              </p>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="animate-pulse">•</span>
              <span className="animate-pulse delay-100">•</span>
              <span className="animate-pulse delay-200">•</span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Main data display state
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="bg-white/95 dark:bg-gray-800/95 p-4 sm:p-6 rounded-xl shadow-xl w-full max-w-[90vw] sm:max-w-[600px] min-h-[60vh] sm:min-h-[70vh] md:min-h-[500px] max-h-[90vh] md:max-h-[85vh] flex flex-col border border-gray-100 dark:border-gray-700"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-lg shadow-sm">
              <Sprout className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
              Analyzing Sustainability Data
            </h3>
          </div>
          <div className="flex items-center space-x-2 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/50 px-3 py-1.5 rounded-full">
            <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />
            <span>
              {currentStep === apis.length
                ? `Completed ${apis.length} of ${apis.length}`
                : `Processing ${currentStep + 1} of ${apis.length}`}
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-hidden relative">
          <div className="absolute inset-0 overflow-y-auto pr-2">
            <AnimatePresence mode="wait">
              {apis.map((api, index) => (
                currentStep === index && (
                  <motion.div
                    key={api.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`bg-gradient-to-r ${api.color} p-2 rounded-lg shadow-sm`}>
                          <api.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                        </div>
                        <span className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                          {api.name}
                        </span>
                      </div>
                      {isChecking && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center space-x-2 text-sm text-green-500 bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-full"
                        >
                          <div className="relative w-3.5 h-3.5">
                            <div className="absolute inset-0 border-2 border-green-500/20 rounded-full"></div>
                            <div className="absolute inset-0 border-2 border-green-500 rounded-full animate-spin border-t-transparent"></div>
                          </div>
                          <span className="font-medium">Analyzing</span>
                        </motion.div>
                      )}
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 sm:p-4 shadow-sm">
                      {api.data && Object.keys(api.data).length > 0 ? (
                        <pre className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap overflow-auto max-h-[30vh] sm:max-h-[35vh] md:max-h-[40vh]">
                          {JSON.stringify(api.data, null, 2)}
                        </pre>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex flex-col items-center justify-center py-6 text-center"
                        >
                          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full mb-3">
                            <AlertCircle className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">No Data Available</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 max-w-xs">
                            Environmental data for this location could not be retrieved at this time
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-2 sm:mt-4 pt-2 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                {currentStep === apis.length
                  ? "Analysis complete!"
                  : `Processing ${apis[currentStep]?.name}...`}
              </div>
              <div className="h-1.5 w-20 sm:w-32 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / apis.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
