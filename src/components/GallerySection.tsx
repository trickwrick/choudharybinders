"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";
import { galleryImages } from "@/lib/site-images";
import Container from "./Container";
import SectionHeading from "./SectionHeading";

function bentoClass(index: number) {
  if (index === 0) {
    return "col-span-2 row-span-2 h-full min-h-[200px]";
  }
  return "h-full min-h-[140px]";
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

  return (
    <section id="gallery" className="bg-section-warm py-12 sm:py-16">
      <Container>
        <SectionHeading spaced className="!mb-4 sm:!mb-5">
          Gallery
        </SectionHeading>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mb-10 max-w-2xl text-center text-sm text-text/60 sm:mb-12 sm:text-base"
        >
          Our recent printing, branding, signage &amp; outdoor advertising work
          across Jaipur
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          className="grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[170px] sm:gap-4 md:grid-cols-4 md:auto-rows-[185px] lg:auto-rows-[200px]"
        >
          {galleryImages.map((item, index) => (
            <motion.button
              key={item.label}
              type="button"
              variants={staggerItem}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              onClick={() => setLightboxIndex(index)}
              className={`group relative overflow-hidden rounded-xl border border-border/80 bg-white text-left shadow-sm transition-shadow hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${bentoClass(index)}`}
            >
              <Image
                src={item.src}
                alt={item.label}
                fill
                sizes={
                  index === 0
                    ? "(max-width: 768px) 100vw, 50vw"
                    : "(max-width: 768px) 50vw, 25vw"
                }
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

              <div className="absolute inset-0 flex items-center justify-center bg-primary/0 opacity-0 transition-all duration-300 group-hover:bg-primary/10 group-hover:opacity-100">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-primary shadow-lg">
                  <ZoomIn className="h-5 w-5" />
                </span>
              </div>

              <p className="absolute bottom-0 left-0 right-0 p-3 text-xs font-semibold text-white sm:p-4 sm:text-sm">
                {item.label}
              </p>
            </motion.button>
          ))}
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
