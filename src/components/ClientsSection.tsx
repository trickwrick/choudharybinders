"use client";

import Image from "next/image";
import Container from "./Container";
import Reveal from "./motion/Reveal";

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

const marqueeItems = [...clientLogos, ...clientLogos];

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
        </Reveal>
      </Container>

      <Reveal delay={0.08} className="relative mt-6 sm:mt-7">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-24" />

        <div className="flex w-max animate-marquee-clients items-center gap-8 px-4 sm:gap-10">
          {marqueeItems.map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="group flex shrink-0 flex-col items-center gap-3"
              title={client.name}
            >
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-border/70 bg-white shadow-[0_4px_18px_rgba(0,0,0,0.07)] transition-all duration-300 ease-out group-hover:-translate-y-1.5 group-hover:scale-110 group-hover:border-primary/40 group-hover:shadow-[0_12px_32px_rgba(17,192,17,0.22)] sm:h-[6.75rem] sm:w-[6.75rem]">
                <span className="pointer-events-none absolute inset-0 rounded-full bg-primary/0 transition-colors duration-300 group-hover:bg-primary/[0.06]" />
                <span className="pointer-events-none absolute -inset-1 rounded-full border-2 border-primary/0 transition-all duration-300 group-hover:border-primary/25" />
                <Image
                  src={client.src}
                  alt={client.name}
                  width={96}
                  height={96}
                  className="relative z-[1] h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14"
                />
              </div>
              <span className="max-w-[6rem] truncate text-center text-[10px] font-semibold text-text/45 transition-colors duration-300 group-hover:font-bold group-hover:text-primary sm:max-w-[6.5rem] sm:text-[11px]">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
