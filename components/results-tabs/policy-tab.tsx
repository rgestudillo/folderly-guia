import { ScrollText, CheckCircle, XCircle, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ProjectData } from "@/types/project";
import { motion } from "framer-motion";

interface PolicyTabProps {
  projectData: ProjectData;
}

export function PolicyTab({ projectData }: PolicyTabProps) {
  const getComplianceIcon = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes("compliant") || statusLower.includes("aligned")) {
      return (
        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
      );
    } else if (statusLower.includes("non") || statusLower.includes("not")) {
      return <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />;
    } else {
      return (
        <HelpCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
      );
    }
  };

  const getComplianceColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes("compliant") || statusLower.includes("aligned")) {
      return "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800";
    } else if (statusLower.includes("non") || statusLower.includes("not")) {
      return "bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800";
    } else {
      return "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800";
    }
  };

  return (
    <div className="grid gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"
      >
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-4 text-purple-800 dark:text-purple-300">
          <div className="bg-purple-100 dark:bg-purple-900/50 p-1.5 rounded-full">
            <ScrollText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          Local Regulations
        </h3>
        <div className="space-y-4">
          {projectData.policy_compliance.local_regulations.map((reg, index) => (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: 0.1 * index }}
              key={index}
              className="border border-gray-100 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow bg-gray-50 dark:bg-gray-700"
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium flex items-center gap-2 dark:text-gray-200">
                  {getComplianceIcon(reg.compliance_status)}
                  {reg.law_name}
                </h4>
                <Badge className={getComplianceColor(reg.compliance_status)}>
                  {reg.compliance_status}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 p-3 rounded-md border border-gray-100 dark:border-gray-600">
                {reg.notes}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"
      >
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-4 text-indigo-800 dark:text-indigo-300">
          <div className="bg-indigo-100 dark:bg-indigo-900/50 p-1.5 rounded-full">
            <ScrollText className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          International Guidelines
        </h3>
        <div className="space-y-4">
          {projectData.policy_compliance.international_guidelines.map(
            (guideline, index) => (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: 0.1 * index }}
                key={index}
                className="border border-gray-100 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow bg-gray-50 dark:bg-gray-700"
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium flex items-center gap-2 dark:text-gray-200">
                    {getComplianceIcon(guideline.alignment)}
                    {guideline.treaty}
                  </h4>
                  <Badge className={getComplianceColor(guideline.alignment)}>
                    {guideline.alignment}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 p-3 rounded-md border border-gray-100 dark:border-gray-600">
                  {guideline.notes}
                </p>
              </motion.div>
            )
          )}
        </div>
      </motion.div>
    </div>
  );
}
