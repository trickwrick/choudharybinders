"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { easeSmooth, viewportDefault } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type ImageRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "left" | "right" | "up";
};

export default function ImageReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: ImageRevealProps) {
  const reduced = useReducedMotion();
  const clip =
    direction === "left"
      ? "inset(0 100% 0 0)"
      : direction === "right"
        ? "inset(0 0 0 100%)"
        : "inset(100% 0 0 0)";

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ clipPath: clip, opacity: 0.6, scale: 1.04 }}
      whileInView={{ clipPath: "inset(0 0 0 0)", opacity: 1, scale: 1 }}
      viewport={{ ...viewportDefault, once: true }}
      transition={{ duration: 0.9, delay, ease: easeSmooth }}
      className={`overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
}
