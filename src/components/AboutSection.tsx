"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Clock,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  fadeUp,
  slideFromLeft,
  slideFromRight,
  staggerContainer,
  staggerItem,
} from "@/lib/animations";
import { companyContent, contentImages, coreValues } from "@/lib/site-content";
import Button from "./Button";
import Container from "./Container";
import CountUp from "./motion/CountUp";
import ImageReveal from "./motion/ImageReveal";
import MagneticWrap from "./motion/MagneticWrap";
import Reveal from "./motion/Reveal";
import SectionDivider from "./motion/SectionDivider";
import TextReveal from "./motion/TextReveal";
import SectionHeading from "./SectionHeading";
import SectionImage from "./SectionImage";

const stats = [
  { value: "45+", label: "Years of Excellence" },
  { value: "1000+", label: "Projects Completed" },
  { value: "500+", label: "Happy Clients" },
  { value: "10+", label: "Printing Services" },
];

const highlights = coreValues.map((item, index) => ({
  icon: [Award, Clock, ShieldCheck, Sparkles][index] ?? Award,
  title: item.title,
  description: item.description,
}));

export default function AboutSection({
  contactHref = "#contact",
}: {
  contactHref?: string;
}) {
  return (
    <>
      <SectionDivider variant="white" />
      <section id="about" className="relative bg-white py-12 sm:py-16 lg:py-20">
        <div className="print-grain pointer-events-none absolute inset-0 opacity-20" />
        <Container className="relative">
        <SectionHeading spaced className="!mb-4 sm:!mb-5">
          About Us
        </SectionHeading>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mb-10 max-w-2xl text-center text-sm text-text/60 sm:mb-12 sm:text-base"
        >
          {companyContent.brandLine}
        </motion.p>

        <div className="grid items-start gap-8 md:grid-cols-2 md:gap-10 lg:gap-14">
          <motion.div
            variants={slideFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="relative space-y-4 md:sticky md:top-24"
          >
            <div className="brand-tricolor-bar absolute -left-3 top-6 hidden h-24 w-1 rounded-full md:block" />
            <ImageReveal direction="left" className="relative overflow-hidden rounded-2xl border border-border/80 shadow-xl">
              <div className="group relative">
                <SectionImage
                  src={contentImages.visionMissionAbout}
                  alt="Choudhary Binders & Printers — vision, mission and about us"
                  aspect="4/3"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  imageClassName="!p-0 transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute right-3 top-3 flex items-center gap-2 rounded-full bg-brand-lime px-3 py-1.5 shadow-md sm:right-4 sm:top-4 sm:px-4 sm:py-2">
                  <Sparkles className="h-4 w-4 text-text" />
                  <span className="text-xs font-bold text-text sm:text-sm">
                    Since 1980
                  </span>
                </div>
              </div>
            </ImageReveal>

            <div className="flex items-center gap-4 rounded-xl border border-border bg-light-bg px-5 py-4">
              <p className="text-3xl font-bold text-primary">1980</p>
              <div>
                <p className="text-sm font-semibold text-text">
                  Established in Jaipur
                </p>
                <p className="text-xs text-text/55">
                  Over four decades of printing excellence
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={slideFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary sm:text-sm">
              <MapPin className="h-3.5 w-3.5" />
              Vidhyadhar Nagar, Jaipur
            </span>

            <h3 className="mt-5 text-2xl font-bold leading-snug text-text sm:text-3xl lg:text-[2rem]">
              Complete Printing &amp;{" "}
              <span className="brand-gradient-text">
                <TextReveal delay={0.1}>Binding Solutions</TextReveal>
              </span>
            </h3>

            <div className="mt-5 space-y-4 text-sm leading-relaxed text-text/70 sm:text-base">
              <div className="rounded-xl border border-primary/15 bg-primary/5 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-primary">Vision</p>
                <p className="mt-2">{companyContent.vision}</p>
              </div>
              <div className="rounded-xl border border-accent/15 bg-accent/5 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-accent">Our Mission</p>
                <p className="mt-2">{companyContent.mission}</p>
              </div>
              <p>{companyContent.about}</p>
              <p>{companyContent.intro}</p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-8 grid grid-cols-2 gap-3 sm:gap-4"
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={staggerItem}
                  className="rounded-xl border border-border/80 bg-light-bg px-4 py-4 text-center transition-colors hover:border-primary/25 hover:bg-white sm:px-5 sm:py-5"
                >
                  <p className="text-xl font-bold text-primary sm:text-2xl">
                    <CountUp value={stat.value} />
                  </p>
                  <p className="mt-1 text-xs font-medium text-text/60 sm:text-sm">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-8 space-y-4">
              {highlights.map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex gap-4 rounded-xl border border-transparent p-1 transition-colors hover:border-border/60 hover:bg-light-bg/50"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-text">{item.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-text/65">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-8 flex flex-wrap gap-3 sm:mt-10"
            >
              <MagneticWrap strength={0.18}>
                <Button href={contactHref} size="lg">
                  Get a Free Quote
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </MagneticWrap>
              <Button href="tel:+917821013457" variant="outline" size="lg">
                Call +91-7821013457
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
    </>
  );
}
