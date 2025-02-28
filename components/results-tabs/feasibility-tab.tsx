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
        return "bg-green-100 text-green-800 border-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-blue-100 text-blue-800 border-blue-300";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-blue-800">
          <div className="bg-blue-100 p-1.5 rounded-full">
            <FileText className="h-5 w-5 text-blue-600" />
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
        <div className="bg-green-50 p-5 rounded-lg border border-green-100">
          <h4 className="font-medium mb-4 flex items-center gap-2 text-green-800">
            <CheckCircle className="h-5 w-5 text-green-600" />
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
                  className="flex items-start gap-2 bg-white p-3 rounded-md border border-green-100 shadow-sm"
                >
                  <span className="text-green-600 mt-0.5">•</span>
                  <span>{finding}</span>
                </motion.li>
              )
            )}
          </ul>
        </div>

        <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
          <h4 className="font-medium mb-4 flex items-center gap-2 text-blue-800">
            <AlertCircle className="h-5 w-5 text-blue-600" />
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
                  className="flex items-start gap-2 bg-white p-3 rounded-md border border-blue-100 shadow-sm"
                >
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>{rec}</span>
                </motion.li>
              )
            )}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
