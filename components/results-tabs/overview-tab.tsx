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

  // Calculate overall score based on raw scores and weights
  const calculateOverallScore = () => {
    let overallScore = 0;

    Object.entries(projectData.sustainability_score.scores).forEach(([key, scoreData]) => {
      const category = key as SustainabilityCategory;
      const weight = projectData.sustainability_score.weights[category].weight;
      const rawScore = scoreData.raw_score;

      // Add the weighted score to the overall score
      overallScore += rawScore * weight;
    });

    // Round to 1 decimal place
    return Math.round(overallScore * 10) / 10;
  };

  // Calculate weighted score for a category
  const calculateWeightedScore = (rawScore: number, weight: number) => {
    // Calculate weighted score and round to 1 decimal place
    return Math.round((rawScore * weight) * 10) / 10;
  };

  // Get the calculated overall score
  const calculatedOverallScore = calculateOverallScore();

  console.log(projectData);
  const getScoreColor = (score: number) => {
    if (score >= 7.5)
      return "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800";
    if (score >= 5)
      return "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800";
    if (score >= 2.5)
      return "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800";
    return "bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800";
  };

  const getSustainabilityRating = (score: number) => {
    if (score >= 7.5) return "Sustainable";
    if (score >= 5) return "Partially Sustainable";
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md border border-green-100 dark:border-green-800 flex flex-col items-center justify-center text-center">
            <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Sustainability Score
            </span>
            <div className="flex flex-col items-center">
              <span
                className={`text-xl font-bold px-2 py-1 rounded ${calculatedOverallScore >= 7.5
                  ? "text-green-600 dark:text-green-400"
                  : calculatedOverallScore >= 5
                    ? "text-blue-600 dark:text-blue-400"
                    : calculatedOverallScore >= 2.5
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
              >
                {calculatedOverallScore.toFixed(1)}/10
              </span>
              <span className={`text-xs font-medium mt-1 px-2 py-0.5 rounded ${calculatedOverallScore >= 7.5
                ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300"
                : calculatedOverallScore >= 5
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                  : calculatedOverallScore >= 2.5
                    ? "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300"
                    : "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300"
                }`}>
                {getSustainabilityRating(calculatedOverallScore)}
              </span>
            </div>
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
        <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg border border-blue-100 dark:border-blue-800">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2">Overall Sustainability Score</h4>
              <div className="flex items-center gap-3">
                <div
                  className={`bg-white dark:bg-gray-700 rounded-full h-16 w-16 flex items-center justify-center border-4 shadow-sm ${calculatedOverallScore >= 7.5
                    ? "border-green-400 dark:border-green-500"
                    : calculatedOverallScore >= 5
                      ? "border-blue-400 dark:border-blue-500"
                      : calculatedOverallScore >= 2.5
                        ? "border-amber-400 dark:border-amber-500"
                        : "border-red-400 dark:border-red-500"
                    }`}
                >
                  <span className="text-xl font-bold">
                    {calculatedOverallScore.toFixed(1)}
                  </span>
                </div>
                <div className="flex flex-col">
                  <Badge
                    variant="outline"
                    className={`text-sm px-3 py-1 mb-1 ${getScoreColor(
                      calculatedOverallScore
                    )}`}
                  >
                    {getSustainabilityRating(calculatedOverallScore)}
                  </Badge>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Score out of 10
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1 bg-white dark:bg-gray-700 p-2 rounded-md border border-blue-100 dark:border-blue-800">
              <span className="text-xs font-medium text-blue-700 dark:text-blue-300">Score Range:</span>
              <div className="flex items-center gap-2 mt-1">
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
          </div>

          {/* Progress Bar */}
          <div className="relative w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 mb-5">
            <div
              className="bg-gradient-to-r from-red-500 via-yellow-500 via-blue-500 to-green-500 h-3 rounded-full"
              style={{ width: `100%` }}
            ></div>
            <div
              className="absolute top-0 w-4 h-4 bg-white border-2 border-blue-600 dark:border-blue-400 rounded-full transform -translate-y-1/4 shadow-md"
              style={{ left: `${(calculatedOverallScore / 10) * 100}%`, marginLeft: '-6px' }}
            ></div>
          </div>

          {/* Score Formula */}
          <div className="mt-5 bg-white dark:bg-gray-700 p-4 rounded-md border border-blue-100 dark:border-blue-800">
            <h4 className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-3 flex items-center gap-1">
              <Calculator className="h-4 w-4" />
              Score Calculation Formula
            </h4>
            <div className="overflow-x-auto">
              <div className="flex flex-wrap gap-2 items-center text-sm font-mono text-gray-700 dark:text-gray-300">
                {Object.entries(projectData.sustainability_score.scores).map(([key, scoreData], index) => {
                  const category = key as SustainabilityCategory;
                  const weight = projectData.sustainability_score.weights[category].weight;
                  return (
                    <div key={key} className="flex items-center">
                      <span className="bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">
                        {scoreData.raw_score.toFixed(1)}
                      </span>
                      <span className="mx-1">×</span>
                      <span className="bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded text-blue-700 dark:text-blue-300">
                        {weight.toFixed(2)}
                      </span>
                      {index < Object.entries(projectData.sustainability_score.scores).length - 1 ? (
                        <span className="mx-1">+</span>
                      ) : (
                        <span className="mx-1">=</span>
                      )}
                    </div>
                  );
                })}
                <span className="bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded font-bold text-green-700 dark:text-green-300">
                  {calculatedOverallScore.toFixed(1)}
                </span>
              </div>
            </div>
            <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-600 p-2 rounded">
              <span className="flex items-center gap-1">
                <Info className="h-3.5 w-3.5" />
                Raw scores are multiplied by their respective weights and summed to calculate the overall sustainability score.
              </span>
            </div>
          </div>
        </div>

        {/* Category Scores */}
        <div>
          <h4 className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-4 flex items-center gap-1">
            <BarChart2 className="h-4 w-4" />
            Category Breakdown
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(projectData.sustainability_score.scores).map(
              ([key, scoreData], index) => {
                const category = key as SustainabilityCategory;
                const weight = projectData.sustainability_score.weights[category].weight;
                const weightedScore = calculateWeightedScore(scoreData.raw_score, weight);
                const maxWeightedScore = weight * 10;
                const scorePercentage = (weightedScore / maxWeightedScore) * 100;

                return (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 * index }}
                    key={key}
                    className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-100 dark:border-gray-600 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-full ${weightedScore >= weight * 7.5
                          ? "bg-green-100 dark:bg-green-900/30"
                          : weightedScore >= weight * 5
                            ? "bg-blue-100 dark:bg-blue-900/30"
                            : weightedScore >= weight * 2.5
                              ? "bg-amber-100 dark:bg-amber-900/30"
                              : "bg-red-100 dark:bg-red-900/30"
                          }`}>
                          <Star className={`h-4 w-4 ${weightedScore >= weight * 7.5
                            ? "text-green-500 dark:text-green-400"
                            : weightedScore >= weight * 5
                              ? "text-blue-500 dark:text-blue-400"
                              : weightedScore >= weight * 2.5
                                ? "text-amber-500 dark:text-amber-400"
                                : "text-red-500 dark:text-red-400"
                            }`} />
                        </div>
                        <span className="font-medium text-gray-800 dark:text-gray-200">{category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={`${getScoreColor(weightedScore)}`}
                        >
                          {weightedScore.toFixed(1)}/{maxWeightedScore.toFixed(1)}
                        </Badge>
                      </div>
                    </div>

                    {/* Category Progress Bar with percentage */}
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                        <span>Progress: {scorePercentage.toFixed(0)}%</span>
                        <span className="bg-gray-100 dark:bg-gray-600 px-2 py-0.5 rounded">
                          Weight: {(weight * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${weightedScore >= weight * 7.5
                            ? "bg-green-500 dark:bg-green-400"
                            : weightedScore >= weight * 5
                              ? "bg-blue-500 dark:bg-blue-400"
                              : weightedScore >= weight * 2.5
                                ? "bg-amber-500 dark:bg-amber-400"
                                : "bg-red-500 dark:bg-red-400"
                            }`}
                          style={{ width: `${scorePercentage}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 mt-3">
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <div className="text-xs text-gray-500 dark:text-gray-400">Raw Score: {scoreData.raw_score.toFixed(1)}/10</div>
                          <div className="text-xs font-mono bg-white dark:bg-gray-800 px-2 py-0.5 rounded border border-gray-100 dark:border-gray-600">
                            {scoreData.raw_score.toFixed(1)} × {weight.toFixed(2)} = {weightedScore.toFixed(1)}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {projectData.sustainability_score.weights[category].justification}
                        </p>
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
