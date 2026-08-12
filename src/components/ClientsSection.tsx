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
      className="-mt-1 overflow-hidden border-b border-border/50 bg-white pb-10 pt-5 sm:pb-12 sm:pt-6"
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

      <Reveal delay={0.08} className="relative mt-6 sm:mt-8">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-24" />

        <div className="flex w-max animate-marquee-clients items-center gap-6 px-4 sm:gap-8">
          {marqueeItems.map((client, index) => (
            <div
              key={`${client.src}-${index}`}
              className="group flex shrink-0 flex-col items-center"
              title={client.name}
            >
              <div className="relative flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-full border border-border/70 bg-white p-3 shadow-[0_4px_18px_rgba(0,0,0,0.07)] transition-all duration-300 ease-out group-hover:-translate-y-1.5 group-hover:scale-105 group-hover:border-primary/40 group-hover:shadow-[0_12px_32px_rgba(17,192,17,0.2)] sm:h-24 sm:w-24 sm:p-3.5">
                <span className="pointer-events-none absolute inset-0 rounded-full bg-primary/0 transition-colors duration-300 group-hover:bg-primary/[0.05]" />
                <Image
                  src={client.src}
                  alt={client.name}
                  width={80}
                  height={80}
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
