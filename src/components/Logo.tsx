"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  onDark?: boolean;
}

const sizeMap = {
  sm: 64,
  md: 84,
  lg: 96,
};

export default function Logo({ size = "md", className = "", onDark = false }: LogoProps) {
  const height = sizeMap[size];

  return (
    <motion.a
      href="/#home"
      className={`group relative inline-block shrink-0 ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label="Choudhary Binders & Printers - Home"
    >
      <Image
        src="/logo-brand.png"
        alt="Choudhary Binders & Printers"
        width={420}
        height={120}
        className={`w-auto max-w-[min(100%,300px)] object-contain object-left transition-[filter] duration-300 sm:max-w-[360px] ${
          onDark
            ? "drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] group-hover:brightness-110"
            : "brightness-0 group-hover:brightness-90"
        }`}
        style={{ height }}
        priority
      />
    </motion.a>
  );
}
