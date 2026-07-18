"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

interface SectionHeadingProps {
  children: string;
  spaced?: boolean;
  className?: string;
}

export default function SectionHeading({
  children,
  spaced = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className={`mb-10 text-center sm:mb-12 ${className}`}
    >
      <h2
        className={`font-bold uppercase ${
          spaced ? "brand-gradient-text" : "text-text"
        } ${
          spaced
            ? "text-lg tracking-[0.45em] sm:text-xl sm:tracking-[0.55em]"
            : "text-2xl tracking-wide sm:text-3xl"
        }`}
      >
        {children}
      </h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="section-heading-tricolor mx-auto mt-4 h-1 w-20 origin-center rounded-full"
      />
    </motion.div>
  );
}
