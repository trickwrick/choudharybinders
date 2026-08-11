"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { easeSmooth, staggerContainer, staggerItem, viewportDefault } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type StaggerRevealProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
};

export function StaggerReveal({
  children,
  className = "",
  stagger = 0.1,
  delayChildren = 0.12,
}: StaggerRevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...viewportDefault, once: true }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  );
}

export { staggerContainer, staggerItem, easeSmooth };
