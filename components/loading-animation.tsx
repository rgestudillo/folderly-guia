"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Sun, Cloud, Wind, Droplets, Thermometer, Loader2, Globe } from "lucide-react";
import { useState, useEffect } from "react";

interface LoadingAnimationProps {
  rawData: any;
  aggregatedData: any;
}

export function LoadingAnimation({ rawData, aggregatedData }: LoadingAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0);

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
      icon: Leaf,
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
  ];

  useEffect(() => {
    // Only start the interval if rawData is available
    if (rawData) {
      const interval = setInterval(() => {
        if (currentStep < apis.length) {
          setCurrentStep(prev => prev + 1);
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [currentStep, rawData, apis.length]);

  // Initial loading state when rawData is not available
  if (!rawData) {
    return (
      <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white/90 dark:bg-gray-800/90 p-8 rounded-xl shadow-xl w-[600px] h-[400px] flex flex-col items-center justify-center"
        >
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Globe className="h-5 w-5 text-green-500" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Fetching Environmental Data
              </h3>
            </div>
            <div className="max-w-md">
              <p className="text-gray-600 dark:text-gray-400 text-center leading-relaxed">
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

  // Scoring state when all steps are complete but aggregatedData is not available
  if (currentStep === apis.length && !aggregatedData) {
    return (
      <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white/90 dark:bg-gray-800/90 p-8 rounded-xl shadow-xl w-[600px] h-[400px] flex flex-col items-center justify-center"
        >
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl"></div>
            <div className="relative animate-spin">
              <Loader2 className="h-12 w-12 text-green-500" />
            </div>
          </div>
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Leaf className="h-5 w-5 text-green-500" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Calculating Sustainability Score
              </h3>
            </div>
            <div className="max-w-md">
              <p className="text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                Analyzing the collected data to generate your project&apos;s sustainability assessment...
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
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-white/90 dark:bg-gray-800/90 p-6 rounded-xl shadow-xl w-[600px] h-[400px] flex flex-col">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-lg">
            <Leaf className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Analyzing Sustainability Data
          </h3>
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
                    <div className="flex items-center space-x-2">
                      <div className={`bg-gradient-to-r ${api.color} p-2 rounded-lg`}>
                        <api.icon className="h-5 w-5 text-white" />
                      </div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {api.name}
                      </span>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                      <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                        {JSON.stringify(api.data, null, 2)}
                      </pre>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {currentStep === apis.length
                ? "Analysis complete!"
                : `Processing ${apis[currentStep]?.name}...`}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {currentStep + 1} of {apis.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
