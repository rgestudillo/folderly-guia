import {
  MapPin,
  FileText,
  Star,
  Calendar,
  Users,
  BarChart2,
  ScrollText,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ProjectData } from "@/types/project";
import { motion } from "framer-motion";

interface OverviewTabProps {
  projectData: ProjectData;
}

// Define the sustainability category type for type safety
type SustainabilityCategory =
  | "Climate & Weather Data"
  | "Air Quality & Pollution"
  | "Disaster Risk & Hazard Data"
  | "Biodiversity & Ecosystem Health"
  | "Renewable Energy & Infrastructure Feasibility";

export function OverviewTab({ projectData }: OverviewTabProps) {
  const getScoreColor = (score: number) => {
    if (score >= 7.5)
      return "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800";
    if (score >= 5)
      return "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800";
    if (score >= 2.5)
      return "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800";
    return "bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800";
  };

  const getFeasibilityRating = (score: number) => {
    if (score >= 7.5) return "Feasible";
    if (score >= 5) return "Partially Feasible";
    if (score >= 2.5) return "Partially Not Feasible";
    return "Not Feasible";
  };

  // Count total funding amount
  const totalFunding = projectData.funding_opportunities.reduce(
    (sum, opportunity) => {
      const amount = opportunity.amount.replace(/[^0-9.]/g, "");
      return sum + (parseFloat(amount) || 0);
    },
    0
  );

  // Count risks by severity
  const riskCounts = Object.values(projectData.risk_analysis).reduce(
    (counts, riskData) => {
      const levelLower = riskData.value.toLowerCase();
      if (levelLower.includes("high")) counts.high++;
      else if (levelLower.includes("medium") || levelLower.includes("moderate"))
        counts.medium++;
      else if (levelLower.includes("low")) counts.low++;
      return counts;
    },
    { high: 0, medium: 0, low: 0 }
  );

  return (
    <div className="space-y-6">
      {/* Project Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
      >
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-4 text-gray-800 dark:text-gray-200">
          <div className="bg-gray-100 dark:bg-gray-700 p-1.5 rounded-full">
            <BarChart2 className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </div>
          Project Summary
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md border border-green-100 dark:border-green-800 flex flex-col items-center justify-center text-center">
            <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Sustainability Score
            </span>
            <span
              className={`text-xl font-bold px-2 py-1 rounded ${projectData.sustainability_score.overall_score >= 7.5
                ? "text-green-600 dark:text-green-400"
                : projectData.sustainability_score.overall_score >= 5
                  ? "text-blue-600 dark:text-blue-400"
                  : projectData.sustainability_score.overall_score >= 2.5
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-red-600 dark:text-red-400"
                }`}
            >
              {projectData.sustainability_score.overall_score.toFixed(1)}/10
            </span>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border border-blue-100 dark:border-blue-800 flex flex-col items-center justify-center text-center">
            <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Feasibility Status
            </span>
            <span
              className={`text-sm font-medium px-2 py-1 rounded ${projectData.feasibility_report.status
                .toLowerCase()
                .includes("approved")
                ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300"
                : projectData.feasibility_report.status
                  .toLowerCase()
                  .includes("pending")
                  ? "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300"
                  : "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300"
                }`}
            >
              {projectData.feasibility_report.status}
            </span>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-md border border-amber-100 dark:border-amber-800 flex flex-col items-center justify-center text-center">
            <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Risk Profile
            </span>
            <div className="flex gap-1 mt-1">
              <span className="text-xs px-1.5 py-0.5 bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300 rounded">
                {riskCounts.high} High
              </span>
              <span className="text-xs px-1.5 py-0.5 bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300 rounded">
                {riskCounts.medium} Med
              </span>
              <span className="text-xs px-1.5 py-0.5 bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300 rounded">
                {riskCounts.low} Low
              </span>
            </div>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-md border border-emerald-100 dark:border-emerald-800 flex flex-col items-center justify-center text-center">
            <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Funding Available
            </span>
            <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
              ${totalFunding.toLocaleString()}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Location Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
      >
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-4 text-green-800 dark:text-green-300">
          <div className="bg-green-100 dark:bg-green-900/50 p-1.5 rounded-full">
            <MapPin className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          Location Details
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
            <p className="text-sm text-gray-500 dark:text-gray-400">City</p>
            <p className="font-medium dark:text-gray-200">
              {projectData.location.city}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Country
            </p>
            <p className="font-medium dark:text-gray-200">
              {projectData.location.country}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Latitude
            </p>
            <p className="font-medium dark:text-gray-200">
              {projectData.location.latitude.toFixed(4)}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Longitude
            </p>
            <p className="font-medium dark:text-gray-200">
              {projectData.location.longitude.toFixed(4)}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Sustainability Assessment */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
      >
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-4 text-blue-800 dark:text-blue-300">
          <div className="bg-blue-100 dark:bg-blue-900/50 p-1.5 rounded-full">
            <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          Sustainability Assessment
        </h3>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <Badge
              variant="outline"
              className={`text-sm sm:text-base md:text-lg px-2 sm:px-3 py-0.5 sm:py-1 ${getScoreColor(
                projectData.sustainability_score.overall_score
              )}`}
            >
              {projectData.sustainability_score.overall_score.toFixed(1)} -{" "}
              {getFeasibilityRating(projectData.sustainability_score.overall_score)}
            </Badge>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5 sm:h-2 md:h-2.5">
            <div
              className="bg-green-600 dark:bg-green-500 h-1.5 sm:h-2 md:h-2.5 rounded-full"
              style={{ width: `${(projectData.sustainability_score.overall_score / 10) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.entries(projectData.sustainability_score.scores).map(
            ([key, scoreData], index) => {
              const category = key as SustainabilityCategory;
              return (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 * index }}
                  key={key}
                  className="flex flex-col p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2 dark:text-gray-200">
                      <Star className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />
                      {category}
                    </span>
                    <Badge
                      variant="outline"
                      className={getScoreColor(scoreData.weighted_score)}
                    >
                      {scoreData.weighted_score.toFixed(1)}/{(projectData.sustainability_score.weights[category].weight * 10)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 ml-6">
                    {projectData.sustainability_score.weights[category].justification}
                  </p>
                </motion.div>
              );
            }
          )}
        </div>
      </motion.div>

      {/* Key Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
      >
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-4 text-purple-800 dark:text-purple-300">
          <div className="bg-purple-100 dark:bg-purple-900/50 p-1.5 rounded-full">
            <ScrollText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          Key Recommendations
        </h3>
        <div className="space-y-3">
          {projectData.feasibility_report.recommendations.map((recommendation: string, index: number) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.1 * index }}
              key={index}
              className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-md"
            >
              <div className="flex-shrink-0 mt-1">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400`}>
                  {index + 1}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {recommendation}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <button className="text-purple-600 dark:text-purple-400 text-sm hover:underline">
            View all recommendations in Feasibility tab
          </button>
        </div>
      </motion.div>
    </div>
  );
}
