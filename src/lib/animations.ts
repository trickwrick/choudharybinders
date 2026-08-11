import type { Variants } from "framer-motion";

export const easeSmooth = [0.22, 1, 0.36, 1] as const;

export const viewportDefault = {
  once: true,
  margin: "-60px" as const,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeSmooth },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: easeSmooth },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: easeSmooth },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.12 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: easeSmooth },
  },
};

export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easeSmooth },
  },
};

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easeSmooth },
  },
};

export const cardHover3d = {
  rest: { rotateX: 0, rotateY: 0, y: 0, scale: 1 },
  hover: {
    rotateX: 2,
    rotateY: -3,
    y: -6,
    scale: 1.01,
    transition: { duration: 0.45, ease: easeSmooth },
  },
};

export const imageZoomHover = {
  rest: { scale: 1 },
  hover: { scale: 1.06, transition: { duration: 0.55, ease: easeSmooth } },
};
