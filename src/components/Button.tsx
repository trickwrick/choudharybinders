"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "accent";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-primary to-[#0ADB0A] text-white shadow-lg shadow-primary/35 hover:shadow-primary/50 hover:brightness-105",
  secondary:
    "bg-light-bg text-text border border-border hover:bg-white hover:border-primary/40 hover:text-primary",
  outline:
    "bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/25",
  ghost:
    "bg-transparent text-text hover:bg-primary/10 hover:text-primary",
  accent: "btn-india-tricolor",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className={combinedClassName}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={combinedClassName}
      {...props}
    >
      {children}
    </motion.button>
  );
}
