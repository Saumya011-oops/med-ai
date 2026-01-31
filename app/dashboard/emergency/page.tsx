"use client";

import { motion } from "framer-motion";
import { EmergencyForm } from "@/components/EmergencyForm";

export default function EmergencyPage() {
  return (
    <div className="mx-auto max-w-xl space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-gray-900">
          Emergency Ambulance
        </h2>
        <p className="mt-1 text-gray-600">
          Enter patient details. In production we would detect your location
          and dispatch the nearest ambulance. For real emergencies, call local
          emergency services (e.g. 911) immediately.
        </p>
      </motion.div>
      <EmergencyForm />
    </div>
  );
}
