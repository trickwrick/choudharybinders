"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  FolderKanban,
  HeartHandshake,
  LayoutGrid,
  type LucideIcon,
} from "lucide-react";
import { categories } from "@/lib/categories";
import CountUp from "./motion/CountUp";

const stats: {
  value: string;
  label: string;
  icon: LucideIcon;
  accent: string;
}[] = [
  {
    value: "45+",
    label: "Years of Experience",
    icon: CalendarDays,
    accent: "from-accent/15 to-accent/5",
  },
  {
    value: "1000+",
    label: "Projects Completed",
    icon: FolderKanban,
    accent: "from-primary/15 to-primary/5",
  },
  {
    value: "500+",
    label: "Happy Clients",
    icon: HeartHandshake,
    accent: "from-brand-lime/20 to-brand-lime/5",
  },
  {
    value: String(categories.length),
    label: "Print Categories",
    icon: LayoutGrid,
    accent: "from-accent/15 to-primary/5",
  },
];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 32, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function StatsStrip() {
  return (
    <section
      aria-label="Company statistics"
      className="border-b border-border/70 bg-white py-10 sm:py-12"
    >
      <div className="px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={container}
        className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={item}
            whileHover={{ y: -6, transition: { duration: 0.28, ease: "easeOut" } }}
            className="group relative overflow-hidden rounded-2xl border border-border/70 bg-light-bg/40 p-4 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-5"
          >
            <div className="brand-tricolor-bar absolute inset-x-0 top-0 h-[3px] scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />

            <div
              className={`mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${stat.accent} text-primary transition-transform duration-300 group-hover:scale-110`}
            >
              <stat.icon className="h-5 w-5" strokeWidth={2.2} />
            </div>

            <p className="text-2xl font-extrabold tracking-tight text-primary sm:text-[1.75rem]">
              <CountUp value={stat.value} duration={1.8} />
            </p>

            <p className="mt-1.5 text-[11px] font-bold uppercase leading-snug tracking-[0.12em] text-text/45 sm:text-xs">
              {stat.label}
            </p>

            <div className="pointer-events-none absolute -bottom-6 -right-6 h-20 w-20 rounded-full bg-primary/5 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
          </motion.div>
        ))}
      </motion.div>
      </div>
    </section>
  );
}
