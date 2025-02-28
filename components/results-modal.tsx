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
import { FeasibilityReportPDF } from "@/components/pdf/feasibility-report-pdf";
import { pdf } from '@react-pdf/renderer';
import { ProjectReportPDF } from '@/components/pdf/project-report-pdf';

interface ResultsModalProps {
  projectData: ProjectData;
  onClose: () => void;
}



// Updated image gallery component with carousel
function ImageGallery({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  if (!images || images.length === 0) return null;

  const showPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const showNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 4 ? prev + 1 : prev));
  };


  return (

    <div className="relative mt-4">
      <div className="flex gap-2 overflow-hidden">
        {images.slice(currentIndex, currentIndex + 4).map((src, index) => (
          <div
            key={src}
            className="relative h-32 w-[calc(25%-6px)] flex-shrink-0 rounded-md overflow-hidden"
          >
            <Image
              src={src}
              alt={`Project image ${index + 1}`}
              fill
              className="object-cover"
              sizes="25vw"
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
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md rounded-full"
          onClick={showPrevious}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      )}

      {currentIndex < images.length - 4 && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md rounded-full"
          onClick={showNext}
        >
          <ChevronRight className="h-5 w-5" />
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
      const link = document.createElement('a');
      link.href = url;
      link.download = `${projectData.project_name}-sustainability-report.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-5xl bg-gradient-to-br from-green-50 to-blue-50 p-0 overflow-hidden border-green-200 flex flex-col max-h-[90vh]">
        <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-green-100 p-6">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle className="text-3xl font-bold text-green-800 flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-full">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              {projectData.project_name}
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </Button>
          </DialogHeader>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <Tabs
            defaultValue="overview"
            onValueChange={setCurrentTab}
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-6 gap-2 p-1 bg-white/50 backdrop-blur-sm rounded-xl sticky top-0 z-10">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="feasibility"
                className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800"
              >
                Feasibility
              </TabsTrigger>
              <TabsTrigger
                value="risks"
                className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-800"
              >
                Risks
              </TabsTrigger>
              <TabsTrigger
                value="policy"
                className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800"
              >
                Policy
              </TabsTrigger>
              <TabsTrigger
                value="funding"
                className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-800"
              >
                Funding
              </TabsTrigger>
              <TabsTrigger
                value="gis"
                className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-800"
              >
                GIS Data
              </TabsTrigger>
            </TabsList>

            <div className="h-[500px] overflow-y-auto pr-2">
              <AnimatePresence mode="wait">
                {mounted && (
                  <motion.div
                    key={currentTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TabsContent value="overview" className="mt-0">
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

                    <TabsContent value="feasibility" className="mt-0">
                      <FeasibilityTab projectData={projectData} />
                    </TabsContent>

                    <TabsContent value="risks" className="mt-0">
                      <RisksTab projectData={projectData} />
                    </TabsContent>

                    <TabsContent value="policy" className="mt-0">
                      <PolicyTab projectData={projectData} />
                    </TabsContent>

                    <TabsContent value="funding" className="mt-0">
                      <FundingTab projectData={projectData} />
                    </TabsContent>

                    <TabsContent value="gis" className="mt-0">
                      <GISTab projectData={projectData} />
                    </TabsContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Tabs>
        </div>

        <div className="sticky bottom-0 z-10 bg-white/90 backdrop-blur-sm border-t border-green-100 p-6 flex justify-between items-center">
          <div className="text-sm text-gray-500 flex items-center">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            Last updated:{" "}
            {new Date(projectData.last_updated).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
              className="flex items-center gap-2 hover:bg-green-50"
            >
              {isGeneratingPDF ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Generating Report...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  Download Full Report
                </>
              )}
            </Button>
            <Button
              onClick={onClose}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
