"use client";

import { motion } from "framer-motion";
import { ChatUI } from "@/components/ChatUI";

export default function ChatPage() {
  return (
    <div className="h-[calc(100vh-8rem)] lg:h-[calc(100vh-6rem)]">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4"
      >
        <h2 className="text-2xl font-bold text-gray-900">Chat with AI Doctor</h2>
        <p className="mt-1 text-sm text-gray-600">
          Describe your symptoms. AI suggestions are not a replacement for
          certified doctors.
        </p>
      </motion.div>
      <ChatUI />
    </div>
  );
}
