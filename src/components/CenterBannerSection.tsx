"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { sectionImages } from "@/lib/site-images";
import Button from "./Button";
import Container from "./Container";
import ImageReveal from "./motion/ImageReveal";
import MagneticWrap from "./motion/MagneticWrap";
import Reveal from "./motion/Reveal";
import SectionDivider from "./motion/SectionDivider";
import SectionImage from "./SectionImage";
import TextReveal from "./motion/TextReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const layers = [
  { label: "Paper", color: "bg-white", delay: 0 },
  { label: "Ink", color: "bg-primary/20", delay: 0.15 },
  { label: "Print", color: "bg-accent/15", delay: 0.3 },
];

export default function CenterBannerSection() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <>
      <SectionDivider variant="white" />
      <section className="relative bg-white py-10 sm:py-14">
        <Container>
          <Reveal>
            <div
              ref={ref}
              className="print-crop-marks relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border/60 shadow-xl"
            >
              <div className="group relative">
                <ImageReveal className="relative">
                  <motion.div style={reduced ? undefined : { y: imageY }}>
                    <SectionImage
                      src={sectionImages.centerBanner}
                      alt="Complete printing and branding solutions — Choudhary Binders & Printers"
                      aspect="16/7"
                      sizes="(max-width: 1024px) 100vw, 1024px"
                      imageClassName="!p-0 transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </motion.div>
                </ImageReveal>

                {/* Paper → Ink → Print layered hint */}
                <div className="pointer-events-none absolute bottom-4 right-4 hidden gap-1 sm:flex">
                  {layers.map((layer) => (
                    <motion.div
                      key={layer.label}
                      initial={{ opacity: 0, y: 12, rotate: -4 }}
                      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + layer.delay, duration: 0.5 }}
                      className={`rounded-md border border-white/40 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow backdrop-blur-sm ${layer.color}`}
                    >
                      {layer.label}
                    </motion.div>
                  ))}
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 lg:px-14">
                  <Reveal delay={0.15}>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/75 sm:text-sm">
                      Paper → Ink → Print → Finish
                    </p>
                  </Reveal>
                  <Reveal delay={0.25}>
                    <h2 className="mt-2 max-w-lg text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">
                      <TextReveal delay={0.3}>We Print Miracles</TextReveal>
                      <br />
                      <TextReveal delay={0.4}>for Your Brand</TextReveal>
                    </h2>
                  </Reveal>
                  <Reveal delay={0.45} className="mt-5">
                    <MagneticWrap strength={0.2}>
                      <Button href="#contact" size="md" variant="accent">
                        Enquire Now
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </MagneticWrap>
                  </Reveal>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
