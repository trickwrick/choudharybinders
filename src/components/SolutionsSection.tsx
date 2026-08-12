"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Handshake,
  Printer,
} from "lucide-react";
import { cardHover3d } from "@/lib/animations";
import {
  bindingSolutions,
  companyContent,
  contentImages,
  printingSolutions,
} from "@/lib/site-content";
import Button from "./Button";
import Container from "./Container";
import ImageReveal from "./motion/ImageReveal";
import Reveal from "./motion/Reveal";
import SectionDivider from "./motion/SectionDivider";
import { StaggerItem, StaggerReveal } from "./motion/StaggerReveal";
import TextReveal from "./motion/TextReveal";
import SectionHeading from "./SectionHeading";

function ServiceList({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2.5 text-sm leading-relaxed text-text/70 sm:text-[15px]"
        >
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function SolutionsSection() {
  return (
    <>
      <SectionDivider variant="white" />
      <section id="services" className="relative bg-white py-12 sm:py-16 lg:py-20">
        <div className="print-grain pointer-events-none absolute inset-0 opacity-20" />
        <Container className="relative">
          <SectionHeading spaced className="!mb-4 sm:!mb-5">
            {printingSolutions.title}
          </SectionHeading>
          <Reveal delay={0.1} className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/80">
              {printingSolutions.subtitle}
            </p>
            <p className="mt-3 text-sm text-text/60 sm:text-base">
              {companyContent.intro}
            </p>
          </Reveal>

          <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-10">
            <Reveal>
              <ImageReveal className="overflow-hidden rounded-2xl border border-border/70 shadow-xl">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={contentImages.printingSolutions}
                    alt="Our printing solutions — Choudhary Binders & Printers"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </ImageReveal>
            </Reveal>

            <Reveal delay={0.1}>
              <motion.div
                initial="rest"
                whileHover="hover"
                variants={cardHover3d}
                className="perspective-card h-full rounded-2xl border border-border/70 bg-light-bg/50 p-6 sm:p-8"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Printer className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text">Printing</h3>
                    <p className="text-sm text-text/60">{printingSolutions.description}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <ServiceList items={printingSolutions.items} />
                </div>
                <div className="mt-6 rounded-xl border border-primary/15 bg-white p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-primary">
                    Features
                  </p>
                  <ul className="mt-3 space-y-2">
                    {printingSolutions.features.map((feature) => (
                      <li key={feature} className="text-sm text-text/70">
                        • {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </Reveal>
          </div>

          <div className="mt-10 grid items-start gap-8 lg:mt-14 lg:grid-cols-2 lg:gap-10">
            <Reveal delay={0.05}>
              <motion.div
                initial="rest"
                whileHover="hover"
                variants={cardHover3d}
                className="perspective-card h-full rounded-2xl border border-border/70 bg-light-bg/50 p-6 sm:p-8"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text">{bindingSolutions.title}</h3>
                    <p className="text-sm text-text/60">{bindingSolutions.subtitle}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <ServiceList items={bindingSolutions.items} />
                </div>
                <div className="mt-6 flex items-center gap-3 rounded-xl border border-accent/20 bg-white px-4 py-3">
                  <Handshake className="h-5 w-5 text-accent" />
                  <p className="text-sm font-semibold text-text">
                    {companyContent.completeSolutionsBadge}
                  </p>
                </div>
              </motion.div>
            </Reveal>

            <Reveal delay={0.12}>
              <ImageReveal className="overflow-hidden rounded-2xl border border-border/70 shadow-xl">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={contentImages.printingBinding}
                    alt="Printing and binding services — Choudhary Binders & Printers"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </ImageReveal>
            </Reveal>
          </div>

          <StaggerReveal
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
            stagger={0.06}
          >
            {printingSolutions.extendedItems.map((item) => (
              <StaggerItem key={item}>
                <div className="rounded-xl border border-border/70 bg-white px-4 py-3 text-center text-sm font-medium text-text/75 shadow-sm">
                  {item}
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>

          <Reveal delay={0.15} className="mt-10 text-center">
            <p className="text-lg font-bold text-text sm:text-xl">
              <TextReveal delay={0.1}>{companyContent.brandLine}</TextReveal>
            </p>
            <p className="mt-2 text-sm text-text/60">{companyContent.tagline}</p>
            <div className="mt-6">
              <Button href="#contact" size="lg">
                Get a Free Quote
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
