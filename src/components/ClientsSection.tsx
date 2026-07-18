"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import Container from "./Container";

const clients = [
  "Jewellery Showrooms",
  "Hotels & Restaurants",
  "Corporate Offices",
  "Retail Stores",
  "Event Organisers",
  "Real Estate",
  "Hospitals & Clinics",
  "Educational Institutes",
];

export default function ClientsSection() {
  return (
    <section className="border-y border-border/60 bg-white py-8 sm:py-10">
      <Container>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.3em] text-text/45 sm:text-sm"
        >
          Trusted by businesses across Jaipur &amp; India
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative overflow-hidden"
        >
          <div className="flex animate-marquee gap-4 whitespace-nowrap sm:gap-6">
            {[...clients, ...clients].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="inline-flex shrink-0 items-center rounded-full border border-border/80 bg-light-bg px-5 py-2.5 text-sm font-medium text-text/70"
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
