"use client";

import Image from "next/image";
import { trustedClientLogos } from "@/lib/trusted-client-logos";
import Container from "./Container";
import Reveal from "./motion/Reveal";

const marqueeItems = [...trustedClientLogos, ...trustedClientLogos];

export default function ClientsSection() {
  return (
    <section
      aria-label="Our clients"
      className="-mt-1 overflow-hidden border-b border-border/50 bg-white pb-12 pt-6 sm:pb-14 sm:pt-8"
    >
      <Container>
        <Reveal>
          <h2 className="text-center text-2xl font-extrabold tracking-tight text-text sm:text-3xl">
            Trusted Across <span className="text-primary">Industries</span>
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-sm text-text/55">
            Proud printing partner for {trustedClientLogos.length}+ brands across
            healthcare, education, hospitality &amp; more
          </p>
        </Reveal>
      </Container>

      <Reveal delay={0.08} className="relative mt-8 sm:mt-10">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-24" />

        <div className="flex w-max animate-marquee-clients items-center gap-10 px-6 sm:gap-14 sm:px-8">
          {marqueeItems.map((client, index) => (
            <div
              key={`${client.src}-${index}`}
              className="group flex shrink-0 flex-col items-center"
              title={client.name}
            >
              <div className="relative flex h-28 w-28 items-center justify-center rounded-2xl border border-border/70 bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out group-hover:-translate-y-1.5 group-hover:border-primary/35 group-hover:shadow-[0_14px_36px_rgba(17,192,17,0.18)] sm:h-32 sm:w-32 sm:p-5">
                <span className="pointer-events-none absolute inset-0 rounded-2xl bg-primary/0 transition-colors duration-300 group-hover:bg-primary/[0.04]" />
                <Image
                  src={client.src}
                  alt={client.name}
                  width={112}
                  height={112}
                  className="relative z-[1] h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
