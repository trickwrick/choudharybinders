"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type SectionDividerProps = {
  variant?: "mint" | "white" | "warm";
};

const fromColors = {
  mint: "from-[#f0fdf4]",
  white: "from-white",
  warm: "from-[#fff8f0]",
};

export default function SectionDivider({ variant = "white" }: SectionDividerProps) {
  const reduced = useReducedMotion();

  if (reduced) return null;

  return (
    <div className="pointer-events-none relative z-10 -mt-px h-16 overflow-hidden sm:h-20">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className={`absolute inset-x-[10%] top-1/2 h-px origin-center bg-gradient-to-r from-transparent via-primary/25 to-transparent ${fromColors[variant]}`}
      />
      <div className="print-registration absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center gap-3 opacity-30">
        <span className="h-1 w-1 rounded-full bg-accent" />
        <span className="h-1 w-1 rounded-full bg-primary" />
        <span className="h-1 w-1 rounded-full bg-brand-lime" />
      </div>
    </div>
  );
}
