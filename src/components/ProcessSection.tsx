"use client";

import { motion } from "framer-motion";
import { MessageSquare, Package, Palette, Printer } from "lucide-react";
import { type LucideIcon } from "lucide-react";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";
import Container from "./Container";
import SectionHeading from "./SectionHeading";

const steps: {
  step: string;
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    step: "01",
    icon: MessageSquare,
    title: "Share Requirement",
    description: "Call, WhatsApp or fill the form — tell us what you need printed or branded.",
  },
  {
    step: "02",
    icon: Palette,
    title: "Design & Approval",
    description: "Our team prepares artwork or uses yours — you approve before we print.",
  },
  {
    step: "03",
    icon: Printer,
    title: "Print & Fabricate",
    description: "Production begins with quality checks at every stage of printing & fabrication.",
  },
  {
    step: "04",
    icon: Package,
    title: "Deliver & Install",
    description: "On-time delivery across Jaipur with optional on-site installation support.",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="bg-section-mint py-12 sm:py-16 lg:py-20">
      <Container>
        <SectionHeading spaced className="!mb-4 sm:!mb-5">
          How We Work
        </SectionHeading>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mb-10 max-w-2xl text-center text-sm text-text/60 sm:mb-12 sm:text-base"
        >
          A simple, transparent process from enquiry to delivery
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
        >
          <div className="pointer-events-none absolute top-[3.25rem] hidden h-0.5 bg-gradient-to-r from-accent via-primary to-brand-lime lg:block lg:left-[12%] lg:right-[12%]" />

          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              variants={staggerItem}
              className="relative text-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative mx-auto flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl border-2 border-primary/20 bg-white shadow-md"
              >
                <item.icon className="h-7 w-7 text-primary" />
                <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white shadow">
                  {item.step}
                </span>
              </motion.div>

              {index < steps.length - 1 && (
                <div className="mx-auto my-3 h-8 w-0.5 bg-gradient-to-b from-primary/40 to-transparent sm:hidden" />
              )}

              <h3 className="mt-5 text-base font-bold text-text sm:text-lg">
                {item.title}
              </h3>
              <p className="mx-auto mt-2 max-w-[220px] text-sm leading-relaxed text-text/60">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
