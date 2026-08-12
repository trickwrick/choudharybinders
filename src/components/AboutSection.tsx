"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { fadeUp, slideFromLeft, slideFromRight } from "@/lib/animations";
import { companyContent, contentImages } from "@/lib/site-content";
import Button from "./Button";
import Container from "./Container";
import MagneticWrap from "./motion/MagneticWrap";
import SectionDivider from "./motion/SectionDivider";
import SectionHeading from "./SectionHeading";

const ABOUT_IMAGE = contentImages.visionMissionAbout;
const ABOUT_IMAGE_FALLBACK = "/gallery/01-printing-solution.jpg";

function AboutImage() {
  const [src, setSrc] = useState(ABOUT_IMAGE);

  return (
    <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/80 bg-[#f4f4f4] shadow-lg">
      <Image
        src={src}
        alt="Choudhary Binders & Printers — vision, mission and about us"
        fill
        sizes="(max-width: 768px) 100vw, 45vw"
        quality={90}
        className="object-contain p-1 transition-transform duration-700 group-hover:scale-[1.02]"
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

function CompactAbout({ contactHref }: { contactHref: string }) {
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
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
              <MapPin className="h-3 w-3" />
              Vidhyadhar Nagar, Jaipur
            </span>

            <p className="mt-3 text-sm leading-relaxed text-text/70 sm:text-[15px]">
              {companyContent.about}
            </p>

            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
              <div className="rounded-xl border border-primary/15 bg-primary/5 p-3">
                <p className="text-[10px] font-bold uppercase tracking-wide text-primary">Vision</p>
                <p className="mt-1.5 text-xs leading-relaxed text-text/70">{companyContent.vision}</p>
              </div>
              <div className="rounded-xl border border-accent/15 bg-accent/5 p-3">
                <p className="text-[10px] font-bold uppercase tracking-wide text-accent">Mission</p>
                <p className="mt-1.5 text-xs leading-relaxed text-text/70">{companyContent.mission}</p>
              </div>
            </div>

            <div className="mt-5">
              <MagneticWrap strength={0.18}>
                <Button href={contactHref} size="md">
                  Get a Free Quote
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </MagneticWrap>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function FullAbout({ contactHref }: { contactHref: string }) {
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

export default function AboutSection({
  contactHref = "#contact",
  compact = false,
}: {
  contactHref?: string;
  compact?: boolean;
}) {
  if (compact) {
    return <CompactAbout contactHref={contactHref} />;
  }
  return <FullAbout contactHref={contactHref} />;
}
