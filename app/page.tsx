"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Leaf, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { loadGoogleMapsApi } from "@/utils/loadGoogleMapsApi";
import { motion } from "framer-motion";

export default function Home() {
  const [projectData, setProjectData] = useState({
    idea: "",
    location: "",
    coordinates: null as { lat: number; lng: number } | null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const MAX_IDEA_LENGTH = 500;

  useEffect(() => {
    loadGoogleMapsApi().then(() => initAutocomplete());
  }, []);

  const initAutocomplete = () => {
    if (!inputRef.current) return;

    autocompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      { types: ["geocode"] }
    );
    autocompleteRef.current.addListener("place_changed", handlePlaceSelect);
  };

  const handlePlaceSelect = () => {
    if (!autocompleteRef.current) return;

    const place = autocompleteRef.current.getPlace();
    if (!place.geometry) {
      console.log("No details available for input: '" + place.name + "'");
      return;
    }

    setProjectData((prev) => ({
      ...prev,
      location: place.formatted_address || place.name || "",
      coordinates: {
        lat: place.geometry?.location.lat() || 0,
        lng: place.geometry?.location.lng() || 0,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!projectData.idea || !projectData.location) return;

    setIsLoading(true);

    try {
      sessionStorage.setItem("projectData", JSON.stringify(projectData));
      router.push(`/sustainability`);
    } catch (error) {
      console.error("Error saving project data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Main content section - fills most of the screen */}
      <div className="flex-grow flex flex-col items-center justify-center py-16 bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="w-full max-w-6xl px-4 flex flex-col md:flex-row gap-8 items-center">
          {/* Left side - Hero content */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-green-800 dark:text-green-400 leading-tight">
              Giyáhan Ug Iplano <br />
              <span className="text-emerald-600 dark:text-emerald-400">
                ang Asenso
              </span>
            </h1>

            <p className="text-lg md:text-xl mb-8 text-gray-700 dark:text-gray-300 max-w-xl">
              Plan sustainable projects with confidence using our comprehensive
              environmental assessment tools. Make data-driven decisions for a
              greener future.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/40 px-4 py-2 rounded-full">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-green-800 dark:text-green-300">
                  Environmental Analysis
                </span>
              </div>
              <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900/40 px-4 py-2 rounded-full">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-blue-800 dark:text-blue-300">
                  Sustainability Scoring
                </span>
              </div>
              <div className="flex items-center gap-2 bg-amber-100 dark:bg-amber-900/40 px-4 py-2 rounded-full">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <span className="text-amber-800 dark:text-amber-300">
                  Funding Opportunities
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right side - Form - EMPHASIZED */}
          <motion.div
            className="flex-1 w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border-2 border-green-500 dark:border-green-600 relative overflow-hidden">
              {/* Decorative accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full -ml-16 -mb-16"></div>

              {/* Highlight banner */}
              <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-green-600 to-emerald-500 text-white text-center py-1 text-sm font-medium">
                Start your sustainable journey today
              </div>

              <div className="flex items-center gap-3 mb-6 mt-4">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-full">
                  <Leaf className="h-7 w-7 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Start Planning
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label
                      htmlFor="project-idea"
                      className="text-md font-medium text-gray-700 dark:text-gray-200"
                    >
                      What&apos;s your project idea?
                    </Label>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {projectData.idea.length}/{MAX_IDEA_LENGTH} characters
                    </span>
                  </div>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-green-600 dark:text-green-400">
                      <Leaf className="h-5 w-5" />
                    </div>
                    <Textarea
                      id="project-idea"
                      placeholder="Describe your project in detail. What are your goals? What resources will you need? Who will benefit from this project?"
                      value={projectData.idea}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        const value = e.target.value;
                        if (value.length <= MAX_IDEA_LENGTH) {
                          setProjectData((prev) => ({
                            ...prev,
                            idea: value,
                          }));
                        }
                      }}
                      className="pl-10 pt-2 min-h-[150px] border-gray-200 dark:border-gray-700 focus:border-green-500 focus:ring-green-500 rounded-xl dark:bg-gray-700 dark:text-white resize-none"
                    />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 italic">
                    Be as detailed as possible to get the most accurate sustainability assessment.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="project-location"
                    className="text-md font-medium text-gray-700 dark:text-gray-200"
                  >
                    Where will it be located?
                  </Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 dark:text-green-400" />
                    <Input
                      ref={inputRef}
                      id="project-location"
                      placeholder="Search for a location"
                      value={projectData.location}
                      onChange={(e) =>
                        setProjectData((prev) => ({
                          ...prev,
                          location: e.target.value,
                        }))
                      }
                      className="pl-10 py-6 border-gray-200 dark:border-gray-700 focus:border-green-500 focus:ring-green-500 rounded-xl dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white font-bold py-6 rounded-xl transition duration-300 ease-in-out transform hover:scale-[1.02] flex items-center justify-center gap-2"
                  disabled={isLoading || !projectData.idea.trim() || !projectData.location.trim()}
                >
                  {isLoading ? "Analyzing..." : "Analyze Sustainability"}
                  {!isLoading && <ArrowRight className="h-5 w-5" />}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements - contained within the relative parent */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-300 dark:bg-green-700 rounded-full filter blur-3xl opacity-20 z-0"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-300 dark:bg-blue-700 rounded-full filter blur-3xl opacity-20 z-0"></div>
      </div>
    </>
  );
}