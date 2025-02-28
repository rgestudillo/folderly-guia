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
      return <Globe className="h-5 w-5 text-indigo-600" />;
    } else if (nameLower.includes("data") || nameLower.includes("database")) {
      return <Database className="h-5 w-5 text-indigo-600" />;
    } else {
      return <Layers className="h-5 w-5 text-indigo-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
      >
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-6 text-indigo-800">
          <div className="bg-indigo-100 p-1.5 rounded-full">
            <Map className="h-5 w-5 text-indigo-600" />
          </div>
          GIS Data Layers
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          {projectData.gis_visualization.layers.map((layer, index) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.1 * index }}
              key={index}
              className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <div className="bg-white p-2 rounded-full">
                  {getLayerIcon(layer.name)}
                </div>
                <div>
                  <h4 className="font-medium text-indigo-800 mb-1">
                    {layer.name}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    {layer.description}
                  </p>
                  <div className="flex items-center">
                    <span className="text-xs bg-white px-2 py-1 rounded-full border border-indigo-100 text-indigo-600">
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
        className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-center"
      >
        <div className="mb-4">
          <div className="inline-block bg-indigo-100 p-3 rounded-full">
            <Map className="h-8 w-8 text-indigo-600" />
          </div>
        </div>
        <h4 className="text-lg font-medium mb-2">Interactive Map View</h4>
        <p className="text-gray-600 mb-4">
          View project location and all GIS layers on an interactive map
        </p>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors">
          Open Map View
        </button>
      </motion.div> */}
    </div>
  );
}
