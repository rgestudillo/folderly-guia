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
import {
  Leaf,
  MapPin,
  FileText,
  AlertTriangle,
  ScrollText,
  Coins,
  Download,
  Map,
  X,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ProjectData } from "@/types/project";
import { OverviewTab } from "./results-tabs/overview-tab";
import { FeasibilityTab } from "./results-tabs/feasibility-tab";
import { RisksTab } from "./results-tabs/risks-tab";
import { PolicyTab } from "./results-tabs/policy-tab";
import { FundingTab } from "./results-tabs/funding-tab";
import { GISTab } from "./results-tabs/gis-tab";
import Image from "next/image";
import { pdf } from "@react-pdf/renderer";
import { ProjectReportPDF } from "@/components/pdf/project-report-pdf";

interface ResultsModalProps {
  projectData: ProjectData;
  onClose: () => void;
}

// Updated image gallery component with carousel
function ImageGallery({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Calculate number of visible images based on screen size
  const [visibleImages, setVisibleImages] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleImages(1);
      } else if (window.innerWidth < 768) {
        setVisibleImages(2);
      } else if (window.innerWidth < 1024) {
        setVisibleImages(3);
      } else {
        setVisibleImages(4);
      }
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!images || images.length === 0) return null;

  const showPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const showNext = () => {
    setCurrentIndex((prev) => {
      return prev < images.length - visibleImages ? prev + 1 : prev;
    });
  };

  return (
    <div className="relative mt-2 sm:mt-3 md:mt-4">
      <div className="flex gap-2 overflow-hidden">
        {images.slice(currentIndex, currentIndex + visibleImages).map((src, index) => (
          <div
            key={src}
            className="relative h-24 sm:h-28 md:h-32 lg:h-36 flex-1 rounded-md overflow-hidden"
          >
            <Image
              src={src}
              alt={`Project image ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={index === 0}
              loader={({ src }) => src}
              unoptimized={true}
            />
          </div>
        ))}
      </div>

      {currentIndex > 0 && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 shadow-md rounded-full h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9"
          onClick={showPrevious}
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      )}

      {currentIndex < images.length - visibleImages && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 shadow-md rounded-full h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9"
          onClick={showNext}
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      )}
    </div>
  );
}

export function ResultsModal({ projectData, onClose }: ResultsModalProps) {
  const [currentTab, setCurrentTab] = useState("overview");
  const [mounted, setMounted] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // Prevent animation on initial render
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const blob = await pdf(
        <ProjectReportPDF projectData={projectData} />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${projectData.project_name}-sustainability-report.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-5xl bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-0 overflow-hidden border-green-200 dark:border-green-900 flex flex-col h-[85vh] sm:h-[85vh] md:h-[90vh] lg:h-[92vh] w-[95vw] sm:w-[90vw] md:w-[85vw] lg:w-[80vw] xl:w-[75vw] 2xl:w-[70vw] sm:max-w-none md:max-w-none lg:max-w-none">
        <div className="sticky top-0 z-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-green-100 dark:border-green-900 p-3 sm:p-4 md:p-5 lg:p-6">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-green-800 dark:text-green-400 flex items-center gap-2 sm:gap-3">
              <div className="bg-green-100 dark:bg-green-900 p-1 sm:p-1.5 md:p-2 rounded-full">
                <Leaf className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-green-600 dark:text-green-400" />
              </div>
              <span className="truncate max-w-[200px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[500px]">{projectData.project_name}</span>
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="flex flex-col flex-1 overflow-hidden">
          <Tabs
            defaultValue="overview"
            onValueChange={setCurrentTab}
            className="flex flex-col h-full"
          >
            <div className="px-3 sm:px-4 md:px-5 lg:px-6 py-2 sm:py-3 md:py-4 sticky top-0 z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm flex items-center">
              {/* Mobile tabs (scrollable) */}
              <div className="block sm:hidden overflow-x-auto w-full">
                <TabsList className="flex w-max space-x-2 p-1 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl h-auto min-h-[2.25rem] items-center">
                  <TabsTrigger
                    value="overview"
                    className="data-[state=active]:bg-green-100 dark:data-[state=active]:bg-green-900/50 data-[state=active]:text-green-800 dark:data-[state=active]:text-green-300 whitespace-nowrap text-xs flex items-center justify-center h-7 px-2 py-1"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="feasibility"
                    className="data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-blue-900/50 data-[state=active]:text-blue-800 dark:data-[state=active]:text-blue-300 whitespace-nowrap text-xs flex items-center justify-center h-7"
                  >
                    Feasibility
                  </TabsTrigger>
                  <TabsTrigger
                    value="risks"
                    className="data-[state=active]:bg-amber-100 dark:data-[state=active]:bg-amber-900/50 data-[state=active]:text-amber-800 dark:data-[state=active]:text-amber-300 whitespace-nowrap text-xs flex items-center justify-center h-7"
                  >
                    Risks
                  </TabsTrigger>
                  <TabsTrigger
                    value="policy"
                    className="data-[state=active]:bg-purple-100 dark:data-[state=active]:bg-purple-900/50 data-[state=active]:text-purple-800 dark:data-[state=active]:text-purple-300 whitespace-nowrap text-xs flex items-center justify-center h-7"
                  >
                    Policy
                  </TabsTrigger>
                  <TabsTrigger
                    value="funding"
                    className="data-[state=active]:bg-emerald-100 dark:data-[state=active]:bg-emerald-900/50 data-[state=active]:text-emerald-800 dark:data-[state=active]:text-emerald-300 whitespace-nowrap text-xs flex items-center justify-center h-7"
                  >
                    Funding
                  </TabsTrigger>
                  <TabsTrigger
                    value="gis"
                    className="data-[state=active]:bg-indigo-100 dark:data-[state=active]:bg-indigo-900/50 data-[state=active]:text-indigo-800 dark:data-[state=active]:text-indigo-300 whitespace-nowrap text-xs flex items-center justify-center h-7"
                  >
                    GIS Data
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Desktop tabs (grid) */}
              <div className="hidden sm:block w-full">
                <TabsList className="grid w-full grid-cols-6 gap-1 sm:gap-2 p-1 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl h-auto min-h-[2.25rem] items-center">
                  <TabsTrigger
                    value="overview"
                    className="data-[state=active]:bg-green-100 dark:data-[state=active]:bg-green-900/50 data-[state=active]:text-green-800 dark:data-[state=active]:text-green-300 text-xs sm:text-sm md:text-base flex items-center justify-center h-8 sm:h-9 md:h-10 px-2 sm:px-3 py-1"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="feasibility"
                    className="data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-blue-900/50 data-[state=active]:text-blue-800 dark:data-[state=active]:text-blue-300 text-xs sm:text-sm md:text-base flex items-center justify-center h-8 sm:h-9 md:h-10"
                  >
                    Feasibility
                  </TabsTrigger>
                  <TabsTrigger
                    value="risks"
                    className="data-[state=active]:bg-amber-100 dark:data-[state=active]:bg-amber-900/50 data-[state=active]:text-amber-800 dark:data-[state=active]:text-amber-300 text-xs sm:text-sm md:text-base flex items-center justify-center h-8 sm:h-9 md:h-10"
                  >
                    Risks
                  </TabsTrigger>
                  <TabsTrigger
                    value="policy"
                    className="data-[state=active]:bg-purple-100 dark:data-[state=active]:bg-purple-900/50 data-[state=active]:text-purple-800 dark:data-[state=active]:text-purple-300 text-xs sm:text-sm md:text-base flex items-center justify-center h-8 sm:h-9 md:h-10"
                  >
                    Policy
                  </TabsTrigger>
                  <TabsTrigger
                    value="funding"
                    className="data-[state=active]:bg-emerald-100 dark:data-[state=active]:bg-emerald-900/50 data-[state=active]:text-emerald-800 dark:data-[state=active]:text-emerald-300 text-xs sm:text-sm md:text-base flex items-center justify-center h-8 sm:h-9 md:h-10"
                  >
                    Funding
                  </TabsTrigger>
                  <TabsTrigger
                    value="gis"
                    className="data-[state=active]:bg-indigo-100 dark:data-[state=active]:bg-indigo-900/50 data-[state=active]:text-indigo-800 dark:data-[state=active]:text-indigo-300 text-xs sm:text-sm md:text-base flex items-center justify-center h-8 sm:h-9 md:h-10"
                  >
                    GIS Data
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-5 lg:px-6 pb-4">
              <AnimatePresence mode="wait">
                {mounted && (
                  <motion.div
                    key={currentTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="py-3 sm:py-4 md:py-5"
                  >
                    <TabsContent
                      value="overview"
                      className="mt-0 text-gray-800 dark:text-gray-200"
                    >
                      {projectData.location.images &&
                        projectData.location.images.length > 0 && (
                          <div className="mb-6">
                            <ImageGallery
                              images={projectData.location.images}
                            />
                          </div>
                        )}
                      <OverviewTab projectData={projectData} />
                    </TabsContent>

                    <TabsContent
                      value="feasibility"
                      className="mt-0 text-gray-800 dark:text-gray-200"
                    >
                      <FeasibilityTab projectData={projectData} />
                    </TabsContent>

                    <TabsContent
                      value="risks"
                      className="mt-0 text-gray-800 dark:text-gray-200"
                    >
                      <RisksTab projectData={projectData} />
                    </TabsContent>

                    <TabsContent
                      value="policy"
                      className="mt-0 text-gray-800 dark:text-gray-200"
                    >
                      <PolicyTab projectData={projectData} />
                    </TabsContent>

                    <TabsContent
                      value="funding"
                      className="mt-0 text-gray-800 dark:text-gray-200"
                    >
                      <FundingTab projectData={projectData} />
                    </TabsContent>

                    <TabsContent
                      value="gis"
                      className="mt-0 text-gray-800 dark:text-gray-200"
                    >
                      <GISTab projectData={projectData} />
                    </TabsContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Tabs>
        </div>

        <div className="sticky bottom-0 z-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-t border-green-100 dark:border-green-900 p-3 sm:p-4 md:p-5 lg:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-3">
          <div className="text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400 flex items-center">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            Last updated:{" "}
            {projectData.last_updated
              ? new Date(projectData.last_updated).toLocaleDateString(
                undefined,
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )
              : "Not available"}
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
              className="flex items-center gap-1 sm:gap-2 hover:bg-green-50 dark:hover:bg-green-900/30 dark:border-green-700 dark:text-green-300 text-xs sm:text-sm md:text-base flex-1 sm:flex-none px-2 sm:px-3 md:px-4 py-1 sm:py-2 h-auto"
            >
              {isGeneratingPDF ? (
                <>
                  <span className="animate-spin">⏳</span>
                  <span className="sm:block hidden">Generating Report...</span>
                  <span className="sm:hidden block">Generating...</span>
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  <span className="sm:block hidden">Download Full Report</span>
                  <span className="sm:hidden block">Download</span>
                </>
              )}
            </Button>
            <Button
              onClick={onClose}
              className="bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm md:text-base flex-1 sm:flex-none px-2 sm:px-3 md:px-4 py-1 sm:py-2 h-auto"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
