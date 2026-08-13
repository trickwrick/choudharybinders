"use client";

import Image from "next/image";
import { sectionImages } from "@/lib/site-images";
import Container from "./Container";

export default function CenterBannerSection() {
  return (
    <section className="relative bg-white py-8 sm:py-10">
      <Container>
        <div className="print-crop-marks group mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border/60 shadow-xl">
          <Image
            src={sectionImages.centerBanner}
            alt="Complete printing and branding solutions — Choudhary Binders & Printers"
            width={1024}
            height={337}
            quality={95}
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.01]"
          />
        </div>
      </Container>
    </section>
  );
}
