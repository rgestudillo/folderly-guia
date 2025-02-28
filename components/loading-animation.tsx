"use client";

import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

export function LoadingAnimation() {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-xl flex flex-col items-center max-w-md w-full">
        <div className="relative mb-6">
          <motion.div
            className="absolute inset-0 rounded-full"
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="w-full h-full bg-green-100 rounded-full" />
          </motion.div>

          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
            className="relative z-10"
          >
            <Leaf className="h-12 w-12 text-green-600" />
          </motion.div>
        </div>

        <h3 className="text-xl font-bold text-green-800 mb-3">
          Analyzing Sustainability Data
        </h3>

        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        </div>

        <motion.p
          className="text-gray-600 text-center"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Gathering environmental data for your location...
        </motion.p>
      </div>
    </div>
  );
}
