"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  ChevronLeft,
  ChevronRight,
  Lamp,
  Megaphone,
  Printer,
  Sparkles,
  Sun,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { fadeUp } from "@/lib/animations";
import { categoryImages } from "@/lib/site-images";
import Button from "./Button";
import Container from "./Container";
import SectionHeading from "./SectionHeading";

type CategoryId =
  | "indoor"
  | "flex"
  | "outdoor"
  | "promotional"
  | "led"
  | "offset";

type CategoryFilter = "all" | CategoryId;

const categories: {
  id: CategoryId;
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
  tag: string;
}[] = [
  {
    id: "indoor",
    title: "Indoor Branding",
    tag: "Retail",
    icon: Building2,
    image: categoryImages.indoor,
    description:
      "Shop interiors, wall graphics & in-store display branding for retail spaces.",
  },
  {
    id: "flex",
    title: "Flex Printing Service",
    tag: "Large Format",
    icon: Printer,
    image: categoryImages.flex,
    description:
      "High-quality flex banners, hoardings & large-format prints for campaigns.",
  },
  {
    id: "outdoor",
    title: "Outdoor Branding",
    tag: "Outdoor",
    icon: Sun,
    image: categoryImages.outdoor,
    description:
      "Billboards, building signage & outdoor advertising solutions across Jaipur.",
  },
  {
    id: "promotional",
    title: "Promotional Desk",
    tag: "Events",
    icon: Megaphone,
    image: categoryImages.promotional,
    description:
      "Promotional stands, counters & event display setups for exhibitions.",
  },
  {
    id: "led",
    title: "LED Sign Boards",
    tag: "Illuminated",
    icon: Lamp,
    image: categoryImages.led,
    description:
      "LED boards, glow signs & illuminated shop front branding that stands out.",
  },
  {
    id: "offset",
    title: "Offset Printing",
    tag: "Bulk Print",
    icon: Sparkles,
    image: categoryImages.offset,
    description:
      "Bulk printing for brochures, catalogues, publications & marketing collateral.",
  },
];

const filters: { id: CategoryFilter; label: string }[] = [
  { id: "all", label: "All Categories" },
  ...categories.map((item) => ({ id: item.id, label: item.title })),
];

const trackTransition = {
  duration: 0.75,
  ease: [0.25, 0.1, 0.25, 1] as const,
};

function CategoryCard({
  item,
}: {
  item: (typeof categories)[number];
}) {
  const Icon = item.icon;

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-border/70 bg-white shadow-sm transition-all duration-300 hover:border-primary/25 hover:shadow-xl sm:flex-row">
      <div className="relative h-44 shrink-0 overflow-hidden sm:h-auto sm:min-h-[220px] sm:w-[42%]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, 320px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent sm:from-black/40" />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary shadow-sm sm:text-xs">
          <Icon className="h-3 w-3" />
          {item.tag}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5 lg:p-6">
        <h3 className="text-base font-bold text-text sm:text-lg">{item.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-text/65">
          {item.description}
        </p>
        <a
          href="#contact"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
        >
          Enquire Now
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </article>
  );
}

export default function CategorySection() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");
  const [slideIndex, setSlideIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);

  const filteredCategories = useMemo(
    () =>
      activeFilter === "all"
        ? categories
        : categories.filter((item) => item.id === activeFilter),
    [activeFilter],
  );

  const maxSlideIndex = Math.max(0, filteredCategories.length - slidesPerView);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const update = () => {
      const width = node.offsetWidth;
      setContainerWidth(width);
      if (width >= 1024) setSlidesPerView(3);
      else if (width >= 640) setSlidesPerView(2);
      else setSlidesPerView(1);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(node);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    setSlideIndex(0);
  }, [activeFilter]);

  useEffect(() => {
    setSlideIndex((i) => Math.min(i, maxSlideIndex));
  }, [maxSlideIndex]);

  const gap = slidesPerView === 1 ? 16 : 20;
  const slideWidth =
    containerWidth > 0
      ? (containerWidth - gap * (slidesPerView - 1)) / slidesPerView
      : 0;
  const trackX = -slideIndex * (slideWidth + gap);

  const goPrev = useCallback(() => {
    if (isAnimating || slideIndex <= 0) return;
    setIsAnimating(true);
    setSlideIndex((i) => Math.max(0, i - 1));
  }, [isAnimating, slideIndex]);

  const goNext = useCallback(() => {
    if (isAnimating || slideIndex >= maxSlideIndex) return;
    setIsAnimating(true);
    setSlideIndex((i) => Math.min(maxSlideIndex, i + 1));
  }, [isAnimating, maxSlideIndex, slideIndex]);

  return (
    <section id="category" className="bg-section-warm py-12 sm:py-16 lg:py-20">
      <Container>
        <SectionHeading spaced>Category</SectionHeading>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-8 flex flex-wrap justify-center gap-2 sm:mt-10"
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all sm:px-5 sm:text-sm ${
                activeFilter === filter.id
                  ? "bg-primary text-white shadow-md shadow-primary/25"
                  : "border border-border bg-white text-text/70 hover:border-primary/30 hover:text-primary"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        <div className="relative mt-8 sm:mt-10">
          <div ref={containerRef} className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {slideWidth > 0 && (
                  <motion.div
                    className="flex items-stretch"
                    style={{ gap }}
                    animate={{ x: trackX }}
                    transition={trackTransition}
                    onAnimationComplete={() => setIsAnimating(false)}
                  >
                    {filteredCategories.map((item) => (
                      <div
                        key={item.id}
                        style={{ width: slideWidth, minWidth: slideWidth }}
                        className="shrink-0"
                      >
                        <CategoryCard item={item} />
                      </div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {filteredCategories.length > slidesPerView && (
            <>
              <button
                type="button"
                onClick={goPrev}
                disabled={isAnimating || slideIndex <= 0}
                aria-label="Previous categories"
                className="absolute -left-1 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-border bg-white p-2.5 shadow-md transition-all hover:border-primary/30 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40 sm:flex"
              >
                <ChevronLeft className="h-5 w-5 text-text/70" />
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={isAnimating || slideIndex >= maxSlideIndex}
                aria-label="Next categories"
                className="absolute -right-1 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-border bg-white p-2.5 shadow-md transition-all hover:border-primary/30 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40 sm:flex"
              >
                <ChevronRight className="h-5 w-5 text-text/70" />
              </button>
            </>
          )}

          {filteredCategories.length > slidesPerView && (
            <div className="mt-5 flex items-center justify-center gap-2">
              {Array.from({ length: maxSlideIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true);
                      setSlideIndex(i);
                    }
                  }}
                  className={`h-2 rounded-full transition-all ${
                    i === slideIndex
                      ? "w-6 bg-primary"
                      : "w-2 bg-border hover:bg-primary/40"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-primary/15 bg-gradient-to-r from-white via-white to-primary/5 px-6 py-6 sm:mt-12 sm:flex-row sm:px-8 sm:py-7"
        >
          <div className="text-center sm:text-left">
            <p className="text-lg font-bold text-text sm:text-xl">
              Looking for a specific printing or branding category?
            </p>
            <p className="mt-1 text-sm text-text/60">
              Tell us what you need — we&apos;ll share options and a free quote.
            </p>
          </div>
          <Button href="#contact" size="lg" className="shrink-0">
            Contact Us Today
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
