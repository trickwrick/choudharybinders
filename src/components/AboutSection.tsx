"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Sparkles, Target, Telescope } from "lucide-react";
import { fadeUp, slideFromLeft, slideFromRight } from "@/lib/animations";
import { companyContent, contentImages } from "@/lib/site-content";
import Button from "./Button";
import Container from "./Container";
import SectionDivider from "./motion/SectionDivider";
import SectionHeading from "./SectionHeading";

const ABOUT_IMAGE = contentImages.visionMissionAbout;
const ABOUT_IMAGE_FALLBACK = "/gallery/01-printing-solution.jpg";

function AboutImage() {
  const [src, setSrc] = useState<string>(ABOUT_IMAGE);

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border/80 bg-white shadow-lg">
      <Image
        src={src}
        alt="Choudhary Binders & Printers — vision, mission and about us"
        width={1020}
        height={1020}
        sizes="(max-width: 768px) 100vw, 45vw"
        quality={90}
        className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.02]"
        onError={() => {
          if (src !== ABOUT_IMAGE_FALLBACK) setSrc(ABOUT_IMAGE_FALLBACK);
        }}
      />
      <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-brand-lime px-3 py-1.5 shadow-md">
        <Sparkles className="h-3.5 w-3.5 text-text" />
        <span className="text-xs font-bold text-text">Since 1980</span>
      </div>
    </div>
  );
}

function VisionMissionCards({ layout = "grid" }: { layout?: "grid" | "stack" }) {
  const cards = [
    {
      title: "Vision",
      text: companyContent.vision,
      icon: Telescope,
      border: "border-primary/20",
      bg: "bg-gradient-to-br from-primary/10 via-primary/5 to-white",
      titleColor: "text-primary",
      iconBg: "bg-primary/15 text-primary",
    },
    {
      title: "Mission",
      text: companyContent.mission,
      icon: Target,
      border: "border-accent/20",
      bg: "bg-gradient-to-br from-accent/10 via-accent/5 to-white",
      titleColor: "text-accent",
      iconBg: "bg-accent/15 text-accent",
    },
  ] as const;

  return (
    <div
      className={
        layout === "grid"
          ? "mt-5 grid gap-4 sm:grid-cols-2 sm:gap-5"
          : "mt-6 space-y-4 sm:space-y-5"
      }
    >
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className={`rounded-2xl border ${card.border} ${card.bg} p-5 shadow-sm sm:p-6`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${card.iconBg}`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className={`text-sm font-bold uppercase tracking-wide sm:text-base ${card.titleColor}`}
                >
                  {card.title}
                </p>
                <p className="mt-2.5 text-sm leading-relaxed text-text/75 sm:text-base sm:leading-relaxed">
                  {card.text}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CompactAbout() {
  return (
    <section id="about" className="relative bg-white py-8 sm:py-10">
      <Container>
        <div className="mb-6 text-center sm:mb-7">
          <h2 className="text-2xl font-extrabold tracking-tight text-text sm:text-3xl">
            About <span className="text-primary">Us</span>
          </h2>
          <div className="section-heading-tricolor mx-auto mt-3 h-1 w-16 rounded-full" />
        </div>

        <div className="grid items-center gap-6 md:grid-cols-2 md:gap-8">
          <motion.div
            variants={slideFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            <AboutImage />
          </motion.div>

          <motion.div
            variants={slideFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
              <MapPin className="h-3.5 w-3.5" />
              Vidhyadhar Nagar, Jaipur
            </span>

            <p className="mt-4 text-sm leading-relaxed text-text/70 sm:text-base">
              {companyContent.about}
            </p>

            <VisionMissionCards layout="grid" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function FullAbout() {
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
            >
              <AboutImage />
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

              <h3 className="mt-5 text-2xl font-bold leading-snug text-text sm:text-3xl">
                Complete Printing &amp;{" "}
                <span className="brand-gradient-text">Binding Solutions</span>
              </h3>

              <VisionMissionCards layout="stack" />

              <div className="mt-6 space-y-4 text-sm leading-relaxed text-text/70 sm:text-base">
                <p>{companyContent.about}</p>
                <p>{companyContent.intro}</p>
              </div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-8 sm:mt-10"
              >
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

export default function AboutSection({
  contactHref: _contactHref = "#contact",
  compact = false,
}: {
  contactHref?: string;
  compact?: boolean;
}) {
  if (compact) {
    return <CompactAbout />;
  }
  return <FullAbout />;
}
