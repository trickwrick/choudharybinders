"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "./Container";
import Reveal from "./motion/Reveal";
import SectionDivider from "./motion/SectionDivider";
import TextReveal from "./motion/TextReveal";

const clientLogos = [
  { src: "/clients/bosch.png", name: "Bosch" },
  { src: "/clients/allen.png", name: "Allen" },
  { src: "/clients/bisleri.png", name: "Bisleri" },
  { src: "/clients/max-healthcare.png", name: "Max Healthcare" },
  { src: "/clients/sdmh.png", name: "SDMH" },
  { src: "/clients/jecrc.png", name: "JECRC" },
  { src: "/clients/arvind.png", name: "Arvind" },
  { src: "/clients/manglam.png", name: "Manglam" },
  { src: "/clients/normet.png", name: "Normet" },
  { src: "/clients/switchon.png", name: "SwitchOn" },
  { src: "/clients/apex-hospital.png", name: "Apex Hospital" },
  { src: "/clients/raj-hospital.png", name: "Raj Hospital" },
];

export default function ClientsSection() {
  const marqueeItems = [...clientLogos, ...clientLogos];

  return (
    <>
      <SectionDivider variant="white" />
      <section aria-label="Our clients" className="relative overflow-hidden py-12 sm:py-14">
        <div className="print-grain pointer-events-none absolute inset-0 opacity-40" />

        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal delay={0}>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/70">
                Trusted Across Industries
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-text sm:text-3xl lg:text-4xl">
                <TextReveal delay={0.15}>Brands That Choose</TextReveal>{" "}
                <span className="brand-gradient-text">
                  <TextReveal delay={0.25}>Quality Printing</TextReveal>
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-text/55 sm:text-base">
                From retail showrooms to hospitals and corporates — businesses across Jaipur
                trust us for precision print, signage &amp; branding.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.28} className="relative mt-10 sm:mt-12">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent sm:w-24" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent sm:w-24" />

            <div className="animate-marquee-clients flex w-max items-center gap-4 sm:gap-5">
              {marqueeItems.map((client, index) => (
                <motion.div
                  key={`${client.name}-${index}`}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="flex h-16 w-[9.5rem] shrink-0 items-center justify-center rounded-2xl border border-border/80 bg-white px-4 py-2 shadow-sm sm:h-[4.5rem] sm:w-44 sm:px-5"
                >
                  <Image
                    src={client.src}
                    alt={client.name}
                    width={140}
                    height={56}
                    className="max-h-10 w-auto object-contain sm:max-h-12"
                  />
                </motion.div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
