import { AlertTriangle, Shield, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ProjectData } from "@/types/project";
import { motion } from "framer-motion";

interface RisksTabProps {
  projectData: ProjectData;
}

export function RisksTab({ projectData }: RisksTabProps) {
  const getRiskColor = (description: string) => {
    const level = description.toLowerCase();
    if (level.includes("high")) return "bg-red-100 text-red-800 border-red-300";
    if (level.includes("medium"))
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    if (level.includes("low"))
      return "bg-green-100 text-green-800 border-green-300";
    return "bg-blue-100 text-blue-800 border-blue-300";
  };

  const getRiskIcon = (description: string) => {
    const level = description.toLowerCase();
    if (level.includes("high"))
      return <AlertTriangle className="h-5 w-5 text-red-600" />;
    if (level.includes("medium"))
      return <AlertCircle className="h-5 w-5 text-yellow-600" />;
    if (level.includes("low"))
      return <Shield className="h-5 w-5 text-green-600" />;
    return <AlertCircle className="h-5 w-5 text-blue-600" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
    >
      <h3 className="text-lg font-semibold flex items-center gap-2 mb-6 text-amber-800">
        <div className="bg-amber-100 p-1.5 rounded-full">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
        </div>
        Risk Analysis
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        {Object.entries(projectData.risk_analysis).map(
          ([risk, description], index) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.05 * index }}
              key={risk}
              className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium flex items-center gap-2">
                  <div className="p-1 rounded-full bg-white">
                    {getRiskIcon(description)}
                  </div>
                  {risk
                    .split("_")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </h4>
                <Badge variant="outline" className={getRiskColor(description)}>
                  {description}
                </Badge>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                <div
                  className={`h-1.5 rounded-full ${
                    description.toLowerCase().includes("high")
                      ? "bg-red-500"
                      : description.toLowerCase().includes("medium")
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                  style={{
                    width: description.toLowerCase().includes("high")
                      ? "90%"
                      : description.toLowerCase().includes("medium")
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
