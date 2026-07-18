"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { scaleIn } from "@/lib/animations";
import { sectionImages } from "@/lib/site-images";
import Button from "./Button";
import Container from "./Container";
import SectionImage from "./SectionImage";

export default function CenterBannerSection() {
  return (
    <section className="bg-white py-10 sm:py-14">
      <Container>
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border/60 shadow-xl"
        >
          <div className="group relative">
            <SectionImage
              src={sectionImages.centerBanner}
              alt="Complete printing and branding solutions — Choudhary Binders & Printers"
              aspect="16/7"
              sizes="(max-width: 1024px) 100vw, 1024px"
              imageClassName="!p-0 transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 lg:px-14">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xs font-semibold uppercase tracking-[0.3em] text-white/75 sm:text-sm"
              >
                Complete Printing Solutions
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-2 max-w-lg text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl"
              >
                We Print Miracles for Your Brand
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45 }}
                className="mt-5"
              >
                <Button href="#contact" size="md" variant="accent">
                  Enquire Now
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
