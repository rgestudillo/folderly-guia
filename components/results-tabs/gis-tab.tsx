import { Map, Layers, Globe, Database } from "lucide-react";
import type { ProjectData } from "@/types/project";
import { motion } from "framer-motion";

interface GISTabProps {
  projectData: ProjectData;
}

export function GISTab({ projectData }: GISTabProps) {
  // Function to get icon based on layer name
  const getLayerIcon = (name: string) => {
    const nameLower = name.toLowerCase();
    if (nameLower.includes("satellite") || nameLower.includes("aerial")) {
      return <Globe className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />;
    } else if (nameLower.includes("data") || nameLower.includes("database")) {
      return (
        <Database className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
      );
    } else {
      return (
        <Layers className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
      );
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"
      >
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-6 text-indigo-800 dark:text-indigo-300">
          <div className="bg-indigo-100 dark:bg-indigo-900/50 p-1.5 rounded-full">
            <Map className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          GIS Data Layers
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          {projectData.api_context_data.api.map((layer, index) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.1 * index }}
              key={index}
              className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <div className="bg-white dark:bg-gray-800 p-2 rounded-full">
                  {getLayerIcon(layer.name)}
                </div>
                <div>
                  <h4 className="font-medium text-indigo-800 dark:text-indigo-300 mb-1">
                    {layer.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {layer.summary}
                  </p>
                  <div className="flex items-center">
                    <span className="text-xs bg-white dark:bg-gray-800 px-2 py-1 rounded-full border border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400">
                      Source: {layer.source}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600 text-center"
      >
        <div className="mb-4">
          <div className="inline-block bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-full">
            <Map className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          </div>
        </div>
        <h4 className="text-lg font-medium mb-2 dark:text-gray-200">Interactive Map View</h4>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          View project location and all GIS layers on an interactive map
        </p>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors">
          Open Map View
        </button>
      </motion.div> */}
    </div>
  );
}
