"use client";

import Container from "./Container";
import SectionHeading from "./SectionHeading";

const dummyClients = [
  "Client One",
  "Client Two",
  "Client Three",
  "Client Four",
  "Client Five",
  "Client Six",
  "Client Seven",
  "Client Eight",
];

export default function ClientsSection() {
  const marqueeItems = [...dummyClients, ...dummyClients];

  return (
    <section aria-label="Our clients" className="py-8 sm:py-10">
      <Container>
        <SectionHeading>Our Clients</SectionHeading>

        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent sm:w-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent sm:w-20" />

          <div className="animate-marquee-clients flex w-max items-center gap-4 sm:gap-5">
            {marqueeItems.map((name, index) => (
              <div
                key={`${name}-${index}`}
                className="flex h-16 shrink-0 items-center justify-center rounded-2xl border border-border bg-white px-5 py-2 shadow-sm sm:h-[4.5rem] sm:px-6 sm:py-3"
              >
                <span className="whitespace-nowrap text-sm font-semibold text-text sm:text-base">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
