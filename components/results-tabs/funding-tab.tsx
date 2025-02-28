import { Coins, Calendar, Users, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ProjectData } from "@/types/project";
import { motion } from "framer-motion";

interface FundingTabProps {
  projectData: ProjectData;
}

export function FundingTab({ projectData }: FundingTabProps) {
  // Function to check if deadline is approaching (within 30 days)
  const isDeadlineApproaching = (dateString: string) => {
    const deadline = new Date(dateString);
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 30;
  };

  // Function to format the date with a relative indicator
  const formatDeadline = (dateString: string) => {
    const deadline = new Date(dateString);
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return `Expired (${deadline.toLocaleDateString()})`;
    } else if (diffDays === 0) {
      return "Today!";
    } else if (diffDays === 1) {
      return "Tomorrow!";
    } else if (diffDays <= 7) {
      return `${diffDays} days left!`;
    } else {
      return deadline.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
    >
      <h3 className="text-lg font-semibold flex items-center gap-2 mb-6 text-emerald-800">
        <div className="bg-emerald-100 p-1.5 rounded-full">
          <Coins className="h-5 w-5 text-emerald-600" />
        </div>
        Funding Opportunities
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        {projectData.funding_opportunities.map((opportunity, index) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.1 * index }}
            key={index}
            className={`rounded-lg border p-5 hover:shadow-md transition-all ${
              isDeadlineApproaching(opportunity.application_deadline)
                ? "bg-amber-50 border-amber-200"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-medium text-lg">{opportunity.name}</h4>
              <span className="text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full text-sm">
                {opportunity.amount}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-start gap-2">
                <Users className="h-4 w-4 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Eligibility
                  </p>
                  <p className="text-sm text-gray-600">
                    {opportunity.eligibility}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Calendar className="h-4 w-4 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Deadline</p>
                  <p
                    className={`text-sm ${
                      isDeadlineApproaching(opportunity.application_deadline)
                        ? "text-amber-600 font-medium"
                        : "text-gray-600"
                    }`}
                  >
                    {formatDeadline(opportunity.application_deadline)}
                  </p>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full text-sm flex items-center justify-center gap-2 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
              onClick={() => window.open(opportunity.link)}
            >
              <ExternalLink className="h-4 w-4" />
              View Details
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
