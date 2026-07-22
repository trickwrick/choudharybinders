"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Gem,
  GraduationCap,
  HeartPulse,
  Home,
  Store,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";
import Container from "./Container";

const clientTypes: { label: string; icon: LucideIcon }[] = [
  { label: "Jewellery Showrooms", icon: Gem },
  { label: "Hotels & Restaurants", icon: UtensilsCrossed },
  { label: "Healthcare", icon: HeartPulse },
  { label: "Retail Stores", icon: Store },
  { label: "Corporate Offices", icon: Building2 },
  { label: "Educational Institutes", icon: GraduationCap },
  { label: "Real Estate", icon: Home },
];

export default function ClientsSection() {
  return (
    <section className="relative overflow-hidden border-y border-border/40 bg-gradient-to-b from-white via-[#fffaf5] to-white py-14 sm:py-16 lg:py-20">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1 section-heading-tricolor opacity-80"
        aria-hidden
      />
      <div className="pointer-events-none absolute -left-24 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-[var(--flag-kesari-dark)]/6 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-[var(--flag-green)]/6 blur-3xl" />

      <Container className="relative">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          
          <h2 className="mt-3 text-xl font-bold leading-snug text-text sm:text-2xl lg:text-[1.75rem]">
            Trusted by businesses across Jaipur &amp; India
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="section-heading-tricolor mx-auto mt-4 h-1 w-20 origin-center rounded-full"
          />
          <p className="mt-4 text-sm leading-relaxed text-text/55 sm:text-base">
            From local shops to national brands — printing &amp; branding for
            every industry
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-12 flex flex-wrap items-start justify-center gap-x-8 gap-y-11 sm:gap-x-10 lg:gap-x-12"
        >
          {clientTypes.map((item) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                variants={staggerItem}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group flex w-[7.5rem] flex-col items-center text-center sm:w-28"
              >
                <div className="relative">
                  <span className="absolute inset-0 scale-100 rounded-full bg-[var(--flag-green)]/0 transition-all duration-300 group-hover:scale-125 group-hover:bg-[var(--flag-green)]/10" />
                  <div className="relative flex h-[5.75rem] w-[5.75rem] items-center justify-center rounded-full border-2 border-[#c87941]/90 bg-white p-[3px] shadow-[0_4px_20px_rgba(15,23,42,0.08)] ring-4 ring-white transition-all duration-300 group-hover:border-[var(--flag-kesari-dark)] group-hover:shadow-[0_8px_28px_rgba(232,117,0,0.22)] sm:h-24 sm:w-24">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-white to-[#fff8f2] transition-all duration-300 group-hover:from-[var(--flag-kesari-dark)] group-hover:to-[#d96a00]">
                      <Icon
                        className="h-9 w-9 text-[#001233] transition-all duration-300 group-hover:scale-110 group-hover:text-white sm:h-10 sm:w-10"
                        strokeWidth={1.75}
                      />
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-xs font-bold leading-snug text-text/80 transition-colors duration-300 group-hover:text-[var(--flag-kesari-dark)] sm:text-sm">
                  {item.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
