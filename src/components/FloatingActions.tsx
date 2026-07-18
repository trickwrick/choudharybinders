"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-4 z-40 flex flex-col gap-3 sm:bottom-8 sm:right-6">
      <motion.a
        href="https://wa.me/917821013457"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ opacity: 0, scale: 0, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/50 ring-2 ring-white/80"
      >
        <MessageCircle className="h-6 w-6" />
      </motion.a>
    </div>
  );
}
