"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";
import { easeSmooth, viewportDefault } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Direction = "up" | "down" | "left" | "right" | "none";

type RevealProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  duration?: number;
  distance?: number;
  once?: boolean;
};

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: -32, y: 0 },
  right: { x: 32, y: 0 },
  none: { x: 0, y: 0 },
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.65,
  distance,
  once = true,
  ...props
}: RevealProps) {
  const reduced = useReducedMotion();
  const offset = offsets[direction];
  const y = distance ?? offset.y;
  const x = direction === "left" || direction === "right" ? (distance ?? offset.x) : offset.x;

  if (reduced) {
    return (
      <div className={className} {...(props as object)}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x, y, filter: direction === "none" ? undefined : "blur(6px)" }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ ...viewportDefault, once }}
      transition={{ duration, delay, ease: easeSmooth }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
