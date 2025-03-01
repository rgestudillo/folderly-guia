import { AlertTriangle, Shield, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ProjectData } from "@/types/project";
import { motion } from "framer-motion";

interface RisksTabProps {
  projectData: ProjectData;
}

export function RisksTab({ projectData }: RisksTabProps) {
  const getRiskColor = (value: string) => {
    const level = value.toLowerCase();
    if (level.includes("high"))
      return "bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800";
    if (level.includes("medium") || level.includes("moderate"))
      return "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800";
    if (level.includes("low"))
      return "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800";
    return "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800";
  };

  const getRiskIcon = (value: string) => {
    const level = value.toLowerCase();
    if (level.includes("high"))
      return (
        <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
      );
    if (level.includes("medium") || level.includes("moderate"))
      return (
        <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
      );
    if (level.includes("low"))
      return <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />;
    return <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"
    >
      <h3 className="text-lg font-semibold flex items-center gap-2 mb-6 text-amber-800 dark:text-amber-300">
        <div className="bg-amber-100 dark:bg-amber-900/50 p-1.5 rounded-full">
          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        </div>
        Risk Analysis
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        {Object.entries(projectData.risk_analysis).map(
          ([risk, riskData], index) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.05 * index }}
              key={risk}
              className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium flex items-center gap-2 dark:text-gray-200">
                  <div className="p-1 rounded-full bg-white dark:bg-gray-800">
                    {getRiskIcon(riskData.value)}
                  </div>
                  {risk
                    .split("_")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </h4>
                <Badge
                  variant="outline"
                  className={getRiskColor(riskData.value)}
                >
                  {riskData.value}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 mb-3">
                {riskData.explanation}
              </p>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5 mt-2">
                <div
                  className={`h-1.5 rounded-full ${
                    riskData.value.toLowerCase().includes("high")
                      ? "bg-red-500"
                      : riskData.value.toLowerCase().includes("medium") ||
                        riskData.value.toLowerCase().includes("moderate")
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                  style={{
                    width: riskData.value.toLowerCase().includes("high")
                      ? "90%"
                      : riskData.value.toLowerCase().includes("medium") ||
                        riskData.value.toLowerCase().includes("moderate")
                      ? "50%"
                      : "20%",
                  }}
                ></div>
              </div>
            </motion.div>
          )
        )}
      </div>
    </motion.div>
  );
}
