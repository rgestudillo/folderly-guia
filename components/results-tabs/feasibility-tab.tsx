import { FileText, CheckCircle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ProjectData } from "@/types/project";
import { motion } from "framer-motion";

interface FeasibilityTabProps {
  projectData: ProjectData;
}

export function FeasibilityTab({ projectData }: FeasibilityTabProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 border-green-300 dark:border-green-800";
      case "pending":
        return "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-800";
      case "rejected":
        return "bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300 border-red-300 dark:border-red-800";
      default:
        return "bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-800";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-blue-800 dark:text-blue-300">
          <div className="bg-blue-100 dark:bg-blue-900/50 p-1.5 rounded-full">
            <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          Feasibility Report
        </h3>
        <Badge
          className={`px-3 py-1 ${getStatusColor(
            projectData.feasibility_report.status
          )}`}
        >
          {projectData.feasibility_report.status}
        </Badge>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-lg border border-green-100 dark:border-green-800/50">
          <h4 className="font-medium mb-4 flex items-center gap-2 text-green-800 dark:text-green-300">
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            Key Findings
          </h4>
          <ul className="space-y-3">
            {projectData.feasibility_report.key_findings.map(
              (finding, index) => (
                <motion.li
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 * index }}
                  key={index}
                  className="flex items-start gap-2 bg-white dark:bg-gray-800 p-3 rounded-md border border-green-100 dark:border-green-800/30 shadow-sm"
                >
                  <span className="text-green-600 dark:text-green-400 mt-0.5">
                    •
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {finding}
                  </span>
                </motion.li>
              )
            )}
          </ul>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg border border-blue-100 dark:border-blue-800/50">
          <h4 className="font-medium mb-4 flex items-center gap-2 text-blue-800 dark:text-blue-300">
            <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Recommendations
          </h4>
          <ul className="space-y-3">
            {projectData.feasibility_report.recommendations.map(
              (rec, index) => (
                <motion.li
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 * index }}
                  key={index}
                  className="flex items-start gap-2 bg-white dark:bg-gray-800 p-3 rounded-md border border-blue-100 dark:border-blue-800/30 shadow-sm"
                >
                  <span className="text-blue-600 dark:text-blue-400 mt-0.5">
                    •
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {rec}
                  </span>
                </motion.li>
              )
            )}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
