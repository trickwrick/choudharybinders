"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { heroSlides as fallbackSlides } from "@/lib/site-images";
import type { HeroSlide } from "@/lib/types/cms";
import StatsStrip from "./StatsStrip";

const AUTO_MS = 6000;

const heroFeatures = [
  "Your Go-To Partner for Innovative Printing",
  "Mix and Match Colors, Sizes & Designs",
  "Fast, Reliable Delivery Across India",
  "Customizable Branding Solutions",
  "Expert Team with Years of Experience",
  "High-Resolution Print Output",
];

export default function Hero({ slides }: { slides?: HeroSlide[] }) {
  const heroSlides = slides && slides.length > 0 ? slides : [...fallbackSlides];
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  const slideCount = heroSlides.length;

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slideCount);
    setProgress(0);
  }, [slideCount]);

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? slideCount - 1 : c - 1));
    setProgress(0);
  }, [slideCount]);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
    setProgress(0);
  }, []);

  /* Auto-advance — zoom continues even when cursor is on hero */
  useEffect(() => {
    if (slideCount <= 1) return;

    const advanceTimer = window.setInterval(() => {
      setCurrent((c) => (c + 1) % slideCount);
      setProgress(0);
    }, AUTO_MS);

    return () => window.clearInterval(advanceTimer);
  }, [slideCount]);

  /* Progress bar sync */
  useEffect(() => {
    const start = Date.now();
    const tick = window.setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min(100, (elapsed / AUTO_MS) * 100));
    }, 50);

    return () => window.clearInterval(tick);
  }, [current]);

  const slide = heroSlides[current];
  const zoomIn = current % 2 === 0;

  return (
    <>
    <section id="home" className="relative">
      <div className="relative min-h-[100svh] overflow-hidden">
        {/* Auto zoom + crossfade background — Print Express style */}
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute inset-0 h-full w-full"
                initial={{ scale: zoomIn ? 1 : 1.2 }}
                animate={{ scale: zoomIn ? 1.2 : 1 }}
                transition={{
                  duration: AUTO_MS / 1000,
                  ease: "linear",
                }}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={current === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-black/40 to-black/75" />

        {/* Center headline — content sits below transparent navbar */}
        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-5xl flex-col items-center justify-center px-4 pb-44 pt-[8rem] text-center sm:px-6 lg:pb-48">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl"
            >
              <h1 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem]">
                Your Trusted Printing
                <br />
                &amp; Branding Partner
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
                {slide.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Feature bullets */}
        <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-8 sm:px-6 sm:pb-10 lg:px-8">
          <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-3.5">
            {heroFeatures.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2.5 text-left text-sm font-medium text-white/90 sm:text-[15px]"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent">
                  <Check className="h-3 w-3 stroke-[3] text-white" />
                </span>
                {feature}
              </li>
            ))}
          </ul>

          <div className="mx-auto mt-6 flex max-w-6xl items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous slide"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next slide"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              {heroSlides.map((item, index) => (
                <button
                  key={`dot-${item.src}`}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => goTo(index)}
                  className="relative h-1 overflow-hidden rounded-full bg-white/30 transition-all"
                  style={{ width: index === current ? 40 : 10 }}
                >
                  {index === current ? (
                    <span
                      className="absolute inset-y-0 left-0 rounded-full bg-accent transition-[width] duration-100 linear"
                      style={{ width: `${progress}%` }}
                    />
                  ) : null}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="brand-tricolor-bar absolute inset-x-0 bottom-0 z-20 h-1" />
      </div>
    </section>

    <StatsStrip />
  </>
  );
}
