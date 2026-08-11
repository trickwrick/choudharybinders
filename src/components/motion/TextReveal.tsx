"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { easeSmooth, viewportDefault } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type TextRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

export default function TextReveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "span",
}: TextRevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[Tag];

  if (reduced) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      <MotionTag
        initial={{ y: "110%", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ ...viewportDefault, once: true }}
        transition={{ duration: 0.75, delay, ease: easeSmooth }}
        className="inline-block"
      >
        {children}
      </MotionTag>
    </span>
  );
}
