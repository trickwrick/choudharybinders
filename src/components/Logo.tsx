"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: 58,
  md: 66,
  lg: 82,
};

export default function Logo({ size = "md", className = "" }: LogoProps) {
  const height = sizeMap[size];

  return (
    <motion.a
      href="#home"
      className={`group relative inline-block shrink-0 ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label="Choudhary Binders & Printers - Home"
    >
      <Image
        src="/logo-main.png"
        alt="Choudhary Binders & Printers"
        width={804}
        height={310}
        className="w-auto max-w-[min(100%,280px)] object-contain transition-[filter] duration-300 group-hover:brightness-105 sm:max-w-none"
        style={{ height }}
        priority
      />
    </motion.a>
  );
}
