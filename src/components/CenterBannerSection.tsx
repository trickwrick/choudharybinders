"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { companyContent } from "@/lib/site-content";
import { sectionImages } from "@/lib/site-images";
import Button from "./Button";
import Container from "./Container";
import MagneticWrap from "./motion/MagneticWrap";

export default function CenterBannerSection() {
  return (
    <section className="relative bg-white py-8 sm:py-10">
      <Container>
        <div className="print-crop-marks mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border/60 shadow-xl">
          <div className="grid lg:grid-cols-[1fr_1.15fr]">
            <div className="relative flex flex-col justify-center bg-[#0f172a] px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
              <div className="brand-tricolor-bar absolute inset-x-0 top-0 h-1" />
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-primary sm:text-xs">
                {companyContent.completeSolutionsBadge}
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
                Printing That
                <br />
                Builds Your Brand
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/90 sm:text-base">
                {companyContent.tagline} — vibrant prints, professional finishes.
              </p>
              <div className="mt-5">
                <MagneticWrap strength={0.2}>
                  <Button href="#contact" size="md" variant="primary">
                    Enquire Now
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </MagneticWrap>
              </div>
            </div>

            <div className="group relative min-h-[220px] bg-neutral-200 sm:min-h-[260px] lg:min-h-[280px]">
              <Image
                src={sectionImages.centerBanner}
                alt="Complete printing and branding solutions — Choudhary Binders & Printers"
                fill
                quality={95}
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
