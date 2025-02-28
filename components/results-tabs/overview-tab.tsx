import { MapPin, FileText, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ProjectData } from "@/types/project";
import { motion } from "framer-motion";

interface OverviewTabProps {
  projectData: ProjectData;
}

export function OverviewTab({ projectData }: OverviewTabProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800 border-green-300";
    if (score >= 60) return "bg-blue-100 text-blue-800 border-blue-300";
    if (score >= 40) return "bg-yellow-100 text-yellow-800 border-yellow-300";
    return "bg-red-100 text-red-800 border-red-300";
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
      >
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-4 text-green-800">
          <div className="bg-green-100 p-1.5 rounded-full">
            <MapPin className="h-5 w-5 text-green-600" />
          </div>
          Location Details
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-500">City</p>
            <p className="font-medium">{projectData.location.city}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-500">Country</p>
            <p className="font-medium">{projectData.location.country}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-500">Latitude</p>
            <p className="font-medium">
              {projectData.location.latitude.toFixed(4)}
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-500">Longitude</p>
            <p className="font-medium">
              {projectData.location.longitude.toFixed(4)}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
      >
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-4 text-blue-800">
          <div className="bg-blue-100 p-1.5 rounded-full">
            <FileText className="h-5 w-5 text-blue-600" />
          </div>
          Sustainability Assessment
        </h3>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Overall Score</span>
            <Badge
              variant="outline"
              className={`text-lg px-3 py-1 ${getScoreColor(
                projectData.sustainability_score.score
              )}`}
            >
              {projectData.sustainability_score.score} -{" "}
              {projectData.sustainability_score.rating}
            </Badge>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-green-600 h-2.5 rounded-full"
              style={{ width: `${projectData.sustainability_score.score}%` }}
            ></div>
          </div>
        </div>
        <div className="space-y-3">
          {Object.entries(projectData.sustainability_score.factors).map(
            ([key, value], index) => (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: 0.1 * index }}
                key={key}
                className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  {key
                    .split("_")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </span>
                <Badge variant="outline" className={getScoreColor(value)}>
                  {value}
                </Badge>
              </motion.div>
            )
          )}
        </div>
      </motion.div>
    </div>
  );
}
