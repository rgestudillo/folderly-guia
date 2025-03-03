import {
  MapPin,
  FileText,
  Star,
  Calendar,
  Users,
  BarChart2,
  ScrollText,
  Calculator,
  Info,
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

        {/* Score Overview */}
        <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3">
            <div>
              <h4 className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">Overall Sustainability Score</h4>
              <Badge
                variant="outline"
                className={`text-sm sm:text-base md:text-lg px-3 py-1 ${getScoreColor(
                  projectData.sustainability_score.overall_score
                )}`}
              >
                {projectData.sustainability_score.overall_score.toFixed(1)} - {getFeasibilityRating(projectData.sustainability_score.overall_score)}
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">Score Range:</span>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="text-xs">0-2.5</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                <span className="text-xs">2.5-5</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                <span className="text-xs">5-7.5</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="text-xs">7.5-10</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mb-4">
            <div
              className="bg-gradient-to-r from-red-500 via-yellow-500 via-blue-500 to-green-500 h-2.5 rounded-full"
              style={{ width: `100%` }}
            ></div>
            <div
              className="absolute top-0 w-3 h-3 bg-white border-2 border-blue-600 dark:border-blue-400 rounded-full transform -translate-y-1/4"
              style={{ left: `${(projectData.sustainability_score.overall_score / 10) * 100}%`, marginLeft: '-4px' }}
            ></div>
          </div>

          {/* Score Formula */}
          <div className="mt-4 bg-white dark:bg-gray-700 p-3 rounded-md border border-blue-100 dark:border-blue-800">
            <h4 className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-1">
              <Calculator className="h-3.5 w-3.5" />
              Score Calculation Formula
            </h4>
            <div className="overflow-x-auto">
              <div className="text-xs font-mono text-gray-700 dark:text-gray-300 whitespace-nowrap">
                {Object.entries(projectData.sustainability_score.scores).map(([key, scoreData], index) => {
                  const category = key as SustainabilityCategory;
                  const weight = projectData.sustainability_score.weights[category].weight;
                  return (
                    <span key={key}>
                      ({scoreData.raw_score.toFixed(1)} × {weight.toFixed(2)})
                      {index < Object.entries(projectData.sustainability_score.scores).length - 1 ? " + " : ""}
                    </span>
                  );
                })} = {projectData.sustainability_score.overall_score.toFixed(1)}
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              <span className="italic">Raw scores are multiplied by their respective weights and summed to calculate the overall sustainability score.</span>
            </div>
          </div>
        </div>

        {/* Category Scores */}
        <div>
          <h4 className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-3 flex items-center gap-1">
            <BarChart2 className="h-4 w-4" />
            Category Breakdown
          </h4>
          <div className="space-y-4">
            {Object.entries(projectData.sustainability_score.scores).map(
              ([key, scoreData], index) => {
                const category = key as SustainabilityCategory;
                const weight = projectData.sustainability_score.weights[category].weight;
                return (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 * index }}
                    key={key}
                    className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-100 dark:border-gray-600 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="bg-yellow-100 dark:bg-yellow-900/30 p-1.5 rounded-full">
                          <Star className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />
                        </div>
                        <span className="font-medium text-gray-800 dark:text-gray-200">{category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={`${getScoreColor(scoreData.weighted_score)}`}
                        >
                          {scoreData.weighted_score.toFixed(1)}/{(weight * 10).toFixed(1)}
                        </Badge>
                        <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-600 px-2 py-0.5 rounded">
                          Weight: {(weight * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>

                    {/* Category Progress Bar */}
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5 mb-3">
                      <div
                        className={`h-1.5 rounded-full ${scoreData.weighted_score >= weight * 7.5
                          ? "bg-green-500 dark:bg-green-400"
                          : scoreData.weighted_score >= weight * 5
                            ? "bg-blue-500 dark:bg-blue-400"
                            : scoreData.weighted_score >= weight * 2.5
                              ? "bg-yellow-500 dark:bg-yellow-400"
                              : "bg-red-500 dark:bg-red-400"
                          }`}
                        style={{ width: `${(scoreData.weighted_score / (weight * 10)) * 100}%` }}
                      ></div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-3">
                      <div className="flex-1">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Raw Score: {scoreData.raw_score.toFixed(1)}/10</div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {projectData.sustainability_score.weights[category].justification}
                        </p>
                      </div>
                      <div className="sm:w-1/3 bg-white dark:bg-gray-800 p-2 rounded border border-gray-100 dark:border-gray-600 text-xs">
                        <div className="font-medium text-gray-700 dark:text-gray-300 mb-1">Calculation:</div>
                        <div className="font-mono text-gray-600 dark:text-gray-400">
                          {scoreData.raw_score.toFixed(1)} × {weight.toFixed(2)} = {scoreData.weighted_score.toFixed(1)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              }
            )}
          </div>
        </div>

        {/* Methodology Note */}
        <div className="mt-6 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-3 rounded-md border border-gray-100 dark:border-gray-600">
          <p className="flex items-center gap-1">
            <Info className="h-3.5 w-3.5" />
            <span>The sustainability assessment uses weighted scoring across multiple environmental categories to evaluate project viability.</span>
          </p>
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
