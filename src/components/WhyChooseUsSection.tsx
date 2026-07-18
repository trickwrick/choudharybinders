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
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";
import Container from "./Container";
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
    <section id="why-us" className="bg-white py-12 sm:py-16 lg:py-20">
      <Container>
        <SectionHeading spaced className="!mb-4 sm:!mb-5">
          Why Choose Us
        </SectionHeading>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mb-10 max-w-2xl text-center text-sm text-text/60 sm:mb-12 sm:text-base"
        >
          Trusted by showrooms, hotels, corporates &amp; retailers since 1980
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
        >
          {reasons.map((item) => (
            <motion.div
              key={item.title}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              className="group rounded-2xl border border-border/70 bg-light-bg/50 p-6 transition-all duration-300 hover:border-primary/25 hover:bg-white hover:shadow-xl sm:p-7"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-text">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text/65">
                {item.description}
              </p>
              <span className="mt-4 block h-0.5 w-0 bg-gradient-to-r from-accent via-primary to-brand-lime transition-all duration-500 group-hover:w-12" />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
