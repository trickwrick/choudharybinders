"use client";

import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

/** Respects prefers-reduced-motion for animation gating. */
export function useReducedMotion() {
  return useFramerReducedMotion() ?? false;
}
