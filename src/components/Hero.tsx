"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { heroSlides } from "@/lib/site-images";

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const goTo = useCallback((index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }, [current]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % heroSlides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c === 0 ? heroSlides.length - 1 : c - 1));
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slideVariants = {
    enter: (dir: number) => ({ x: dir >= 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir >= 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <section id="home" className="relative pt-[7.25rem]">
      <div className="relative h-[380px] overflow-hidden sm:h-[420px] lg:h-[480px]">
        <AnimatePresence custom={direction} initial={false} mode="popLayout">
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={heroSlides[current].src}
              alt={heroSlides[current].alt}
              fill
              priority={current === 0}
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/30 to-black/10" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <motion.p
              key={`tag-${current}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-brand-lime sm:text-sm"
            >
              Since 1980
            </motion.p>

            <motion.h1
              key={`title-${current}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-5xl"
            >
              {heroSlides[current].title}
            </motion.h1>

            <motion.p
              key={`sub-${current}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mt-3 text-sm text-white/85 sm:text-base lg:text-lg"
            >
              {heroSlides[current].subtitle}
            </motion.p>

            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="btn-brand-cta mt-6 sm:text-base"
            >
              Enquire Now
              <ArrowRight className="h-5 w-5" />
            </motion.a>
          </div>
        </div>

        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/35 sm:left-5 sm:h-11 sm:w-11"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/35 sm:right-5 sm:h-11 sm:w-11"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {heroSlides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "w-8 bg-brand-gold" : "w-2 bg-white/50 hover:bg-accent"
              }`}
            />
          ))}
        </div>

        <div className="brand-tricolor-bar absolute inset-x-0 bottom-0 z-20 h-1" />
      </div>
    </section>
  );
}
