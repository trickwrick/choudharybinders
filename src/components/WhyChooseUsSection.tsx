"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  Clock,
  Headphones,
  IndianRupee,
  Palette,
  Truck,
} from "lucide-react";
import { type LucideIcon } from "lucide-react";
import { cardHover3d } from "@/lib/animations";
import Container from "./Container";
import Reveal from "./motion/Reveal";
import SectionDivider from "./motion/SectionDivider";
import { StaggerItem, StaggerReveal } from "./motion/StaggerReveal";
import TextReveal from "./motion/TextReveal";
import SectionHeading from "./SectionHeading";

const reasons: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: BadgeCheck,
    title: "Premium Quality",
    description:
      "High-grade materials, vivid colours & sharp print finish on every order — indoors or outdoors.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description:
      "Fast turnaround for banners, flex, LED boards & bulk printing without cutting corners.",
  },
  {
    icon: Palette,
    title: "Design Support",
    description:
      "In-house creative team for layouts, branding concepts & print-ready artwork assistance.",
  },
  {
    icon: Truck,
    title: "Installation Service",
    description:
      "Professional on-site mounting for sign boards, hoardings, shop fronts & event setups.",
  },
  {
    icon: IndianRupee,
    title: "Competitive Pricing",
    description:
      "Best value for businesses — transparent quotes with no hidden charges.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description:
      "Friendly team available to guide you from enquiry to final delivery across Jaipur & India.",
  },
];

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
              <TextReveal delay={0.12}>Trusted by showrooms, hotels, corporates</TextReveal>
              {" "}&amp; retailers since{" "}
              <span className="font-semibold text-primary">1980</span>
            </p>
          </Reveal>

          <StaggerReveal
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
            stagger={0.07}
          >
            {reasons.map((item) => (
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
                    <item.icon className="h-6 w-6" />
                  </motion.div>
                  <h3 className="mt-5 text-lg font-bold text-text">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text/65">
                    {item.description}
                  </p>
                  <span className="mt-4 block h-0.5 w-0 bg-gradient-to-r from-accent via-primary to-brand-lime transition-all duration-500 group-hover:w-12" />
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </Container>
      </section>
    </>
  );
}
