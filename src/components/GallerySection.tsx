"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { fadeUp } from "@/lib/animations";
import { galleryImages } from "@/lib/site-images";
import Container from "./Container";

type GalleryItem = (typeof galleryImages)[number];

function CarouselRow({
  items,
  size,
  onSelect,
  autoDirection,
  paused = false,
}: {
  items: GalleryItem[];
  size: "sm" | "lg";
  onSelect: (index: number) => void;
  autoDirection?: "left" | "right";
  paused?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const hoverPausedRef = useRef(false);
  const isLarge = size === "lg";
  const loopItems = [...items, ...items];

  const scrollStep = useCallback(
    (direction: -1 | 1) => {
      const track = trackRef.current;
      if (!track) return;

      const firstChild = track.firstElementChild as HTMLElement | null;
      const gap = isLarge ? 16 : 12;
      const step = firstChild
        ? firstChild.offsetWidth + gap
        : track.clientWidth * 0.35;

      track.scrollBy({ left: direction * step, behavior: "smooth" });

      window.setTimeout(() => {
        const el = trackRef.current;
        if (!el) return;
        const half = el.scrollWidth / 2;
        if (direction === 1 && el.scrollLeft >= half - 4) {
          el.scrollLeft -= half;
        } else if (direction === -1 && el.scrollLeft <= 4) {
          el.scrollLeft += half;
        }
      }, 450);
    },
    [isLarge],
  );

  const scroll = (direction: -1 | 1) => {
    scrollStep(direction);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !autoDirection) return;
    if (autoDirection === "left") {
      track.scrollLeft = track.scrollWidth / 2;
    }
  }, [autoDirection, items.length]);

  useEffect(() => {
    if (!autoDirection || paused) return;

    const direction = autoDirection === "left" ? -1 : 1;
    const id = window.setInterval(() => {
      if (hoverPausedRef.current) return;
      scrollStep(direction);
    }, 2000);

    return () => window.clearInterval(id);
  }, [autoDirection, paused, scrollStep]);

  return (
    <div
      className="relative flex items-center gap-2 sm:gap-3"
      onMouseEnter={() => {
        hoverPausedRef.current = true;
      }}
      onMouseLeave={() => {
        hoverPausedRef.current = false;
      }}
    >
      <button
        type="button"
        onClick={() => scroll(-1)}
        aria-label="Scroll gallery left"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[var(--flag-kesari-dark)] transition-colors hover:bg-[var(--flag-kesari-dark)]/10 sm:h-10 sm:w-10"
      >
        <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.5} />
      </button>

      <div
        ref={trackRef}
        className="flex flex-1 snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-4 [&::-webkit-scrollbar]:hidden"
      >
        {loopItems.map((item, index) => {
          const globalIndex = galleryImages.findIndex(
            (img) => img.src === item.src,
          );

          return (
            <button
              key={`${size}-${item.src}-${index}`}
              type="button"
              onClick={() => onSelect(globalIndex)}
              className={`group relative shrink-0 snap-start overflow-hidden rounded-2xl border border-border/50 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                isLarge
                  ? "h-[11rem] w-[17.5rem] sm:h-[14rem] sm:w-[22rem] lg:h-[15rem] lg:w-[24rem]"
                  : "h-[5.5rem] w-[8.5rem] sm:h-[6.5rem] sm:w-[10rem] lg:h-[7rem] lg:w-[11rem]"
              }`}
            >
              <Image
                src={item.src}
                alt={item.label}
                fill
                sizes={
                  isLarge
                    ? "(max-width: 640px) 280px, 384px"
                    : "(max-width: 640px) 136px, 176px"
                }
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => scroll(1)}
        aria-label="Scroll gallery right"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[var(--flag-kesari-dark)] transition-colors hover:bg-[var(--flag-kesari-dark)]/10 sm:h-10 sm:w-10"
      >
        <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.5} />
      </button>
    </div>
  );
}

export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const showPrev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + galleryImages.length) % galleryImages.length,
    );
  }, []);

  const showNext = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i + 1) % galleryImages.length,
    );
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  const activeItem =
    lightboxIndex !== null ? galleryImages[lightboxIndex] : null;

  const topRowItems = [...galleryImages];
  const bottomRowItems = galleryImages.slice(0, 5);

  return (
    <section id="gallery" className="bg-[#f8f9fb] py-12 sm:py-16 lg:py-20">
      <Container>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mb-10 max-w-2xl text-center sm:mb-12"
        >
          <h2 className="text-2xl font-bold text-[#0a2463] sm:text-3xl lg:text-4xl">
            Gallery
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text/55 sm:text-base">
            Our recent printing, branding, signage &amp; outdoor advertising work
            across Jaipur
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6 sm:space-y-8"
        >
          <CarouselRow
            items={topRowItems}
            size="sm"
            autoDirection="left"
            paused={lightboxIndex !== null}
            onSelect={setLightboxIndex}
          />
          <CarouselRow
            items={bottomRowItems}
            size="lg"
            autoDirection="right"
            paused={lightboxIndex !== null}
            onSelect={setLightboxIndex}
          />
        </motion.div>
      </Container>

      <AnimatePresence>
        {activeItem && lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Gallery lightbox"
          >
            <motion.button
              type="button"
              onClick={closeLightbox}
              aria-label="Close gallery"
              className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 sm:right-6 sm:top-6"
            >
              <X className="h-6 w-6" />
            </motion.button>

            <motion.button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 sm:left-6 sm:flex"
            >
              <ChevronLeft className="h-6 w-6" />
            </motion.button>

            <motion.button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              aria-label="Next image"
              className="absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 sm:right-6 sm:flex"
            >
              <ChevronRight className="h-6 w-6" />
            </motion.button>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
                <Image
                  src={activeItem.src}
                  alt={activeItem.label}
                  fill
                  sizes="(max-width: 1200px) 95vw, 1024px"
                  className="object-contain"
                  priority
                />
              </div>
              <div className="border-t border-white/10 bg-black/80 px-4 py-3 text-center sm:px-6 sm:py-4">
                <p className="text-sm font-semibold text-white sm:text-base">
                  {activeItem.label}
                </p>
                <p className="mt-1 text-xs text-white/50">
                  {lightboxIndex + 1} / {galleryImages.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
