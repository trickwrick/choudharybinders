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
        <div className="relative mx-auto w-full max-w-[1064px] overflow-hidden px-4 sm:px-0">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-white to-transparent sm:w-12" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white to-transparent sm:w-12" />

          <div className="flex w-max animate-marquee-clients items-center gap-8 py-2 sm:gap-10">
            {marqueeItems.map((client, index) => (
              <div
                key={`${client.src}-${index}`}
                className="flex h-20 w-28 shrink-0 items-center justify-center sm:h-[5.25rem] sm:w-36"
                title={client.name}
              >
                <Image
                  src={client.src}
                  alt={client.name}
                  width={144}
                  height={84}
                  className="max-h-16 max-w-full object-contain object-center sm:max-h-[4.5rem]"
                  style={{ width: "auto", height: "auto" }}
                />
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
