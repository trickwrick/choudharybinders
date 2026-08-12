"use client";

import { motion } from "framer-motion";
import {
  Clock,
  Crosshair,
  Headphones,
  ShieldCheck,
} from "lucide-react";
import { type LucideIcon } from "lucide-react";
import { cardHover3d } from "@/lib/animations";
import { companyContent, coreValues } from "@/lib/site-content";
import Container from "./Container";
import Reveal from "./motion/Reveal";
import SectionDivider from "./motion/SectionDivider";
import { StaggerItem, StaggerReveal } from "./motion/StaggerReveal";
import TextReveal from "./motion/TextReveal";
import SectionHeading from "./SectionHeading";

const icons: LucideIcon[] = [Crosshair, ShieldCheck, Clock, Headphones];

export default function WhyChooseUsSection() {
  return (
    <>
      <SectionDivider variant="white" />
      <section id="why-us" className="relative bg-white py-12 sm:py-16 lg:py-20">
        <Container>
          <SectionHeading spaced className="!mb-4 sm:!mb-5">
            Why Choose Us
          </SectionHeading>
          <Reveal delay={0.1} className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
            <p className="text-sm text-text/60 sm:text-base">
              <TextReveal delay={0.12}>{companyContent.tagline}</TextReveal>
            </p>
          </Reveal>

          <StaggerReveal
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
            stagger={0.07}
          >
            {coreValues.map((item, index) => {
              const Icon = icons[index] ?? ShieldCheck;
              return (
                <StaggerItem key={item.title}>
                  <motion.div
                    initial="rest"
                    whileHover="hover"
                    variants={cardHover3d}
                    className="perspective-card group press-card h-full rounded-2xl border border-border/70 bg-light-bg/50 p-6 hover:bg-white sm:p-7"
                  >
                    <motion.div
                      whileHover={{ rotate: [0, -4, 4, 0] }}
                      transition={{ duration: 0.5 }}
                      className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white"
                    >
                      <Icon className="h-6 w-6" />
                    </motion.div>
                    <h3 className="mt-5 text-lg font-bold text-text">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-text/65">
                      {item.description}
                    </p>
                    <span className="mt-4 block h-0.5 w-0 bg-gradient-to-r from-accent via-primary to-brand-lime transition-all duration-500 group-hover:w-12" />
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerReveal>
        </Container>
      </section>
    </>
  );
}
