"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Layers,
  Megaphone,
  Newspaper,
  Printer,
  Radio,
  Sparkles,
  Sun,
  Target,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { fadeUp } from "@/lib/animations";
import { serviceImages } from "@/lib/site-images";
import Button from "./Button";
import Container from "./Container";
import SectionHeading from "./SectionHeading";

type ServiceCategory = "all" | "printing" | "outdoor" | "advertising" | "fabrication";

const filters: { id: ServiceCategory; label: string }[] = [
  { id: "all", label: "All Services" },
  { id: "printing", label: "Printing" },
  { id: "outdoor", label: "Outdoor & Signage" },
  { id: "advertising", label: "Advertising & Media" },
  { id: "fabrication", label: "Fabrication" },
];

const services: {
  title: string;
  description: string;
  icon: LucideIcon;
  tag: string;
  category: Exclude<ServiceCategory, "all">;
  imageIndex: number;
}[] = [
  {
    title: "Alu Fabricators",
    tag: "ACP & Signage",
    icon: Wrench,
    category: "fabrication",
    imageIndex: 0,
    description:
      "Expert ACP fabrication, frame work, and structural signage solutions at competitive rates.",
  },
  {
    title: "Advertising & PR",
    tag: "Brand Promotion",
    icon: Megaphone,
    category: "advertising",
    imageIndex: 1,
    description:
      "Strategic advertising and PR campaigns tailored to grow your brand visibility and reach.",
  },
  {
    title: "Advertising Printing",
    tag: "Print Media",
    icon: Printer,
    category: "printing",
    imageIndex: 2,
    description:
      "Custom flyers, posters, pamphlets, and promotional print materials with sharp, vivid output.",
  },
  {
    title: "Fabrication & Cladding",
    tag: "Installation",
    icon: Layers,
    category: "fabrication",
    imageIndex: 3,
    description:
      "Professional fabrication, cladding, and on-site installation for boards, frames, and displays.",
  },
  {
    title: "Printing & Publishing",
    tag: "Publishing",
    icon: BookOpen,
    category: "printing",
    imageIndex: 4,
    description:
      "End-to-end printing for books, magazines, catalogues, and corporate publications.",
  },
  {
    title: "Hoarding Advertising",
    tag: "Large Format",
    icon: Radio,
    category: "outdoor",
    imageIndex: 5,
    description:
      "Eye-catching hoarding designs and printing for high-impact outdoor brand presence.",
  },
  {
    title: "Outdoor Advertising",
    tag: "Outdoor Media",
    icon: Sun,
    category: "outdoor",
    imageIndex: 6,
    description:
      "Billboards, banners, building wraps, and outdoor branding across Jaipur and beyond.",
  },
  {
    title: "Newspaper Advertising",
    tag: "Press Ads",
    icon: Newspaper,
    category: "advertising",
    imageIndex: 7,
    description:
      "Newspaper ad design and placement in daily, weekly, and regional publications.",
  },
  {
    title: "Magazine Ad Design",
    tag: "Creative Design",
    icon: Sparkles,
    category: "advertising",
    imageIndex: 8,
    description:
      "Creative magazine advertisements crafted to engage readers and drive enquiries.",
  },
  {
    title: "Media Planning",
    tag: "Strategy",
    icon: Target,
    category: "advertising",
    imageIndex: 9,
    description:
      "Smart media planning to reach the right audience through the right channels at the right time.",
  },
];

const trackTransition = {
  duration: 0.75,
  ease: [0.25, 0.1, 0.25, 1] as const,
};

function ServiceCard({
  service,
}: {
  service: (typeof services)[number];
}) {
  const Icon = service.icon;

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-border/70 bg-white shadow-sm transition-all duration-300 hover:border-primary/25 hover:shadow-xl sm:flex-row">
      <div className="relative h-44 shrink-0 overflow-hidden sm:h-auto sm:min-h-[220px] sm:w-[42%]">
        <Image
          src={serviceImages[service.imageIndex]}
          alt={service.title}
          fill
          sizes="(max-width: 640px) 100vw, 320px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent sm:from-black/40" />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary shadow-sm sm:text-xs">
          <Icon className="h-3 w-3" />
          {service.tag}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5 lg:p-6">
        <h3 className="text-base font-bold text-text sm:text-lg">
          {service.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-text/65">
          {service.description}
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

export default function WeHelpSection() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>("all");
  const [slideIndex, setSlideIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);

  const filteredServices = useMemo(
    () =>
      activeCategory === "all"
        ? services
        : services.filter((s) => s.category === activeCategory),
    [activeCategory],
  );

  const maxSlideIndex = Math.max(0, filteredServices.length - slidesPerView);

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
  }, [activeCategory]);

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
    <section id="services" className="bg-section-warm py-12 sm:py-16 lg:py-20">
      <Container>
        <SectionHeading spaced>How We Help You</SectionHeading>

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
              onClick={() => setActiveCategory(filter.id)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all sm:px-5 sm:text-sm ${
                activeCategory === filter.id
                  ? "bg-primary text-white shadow-md shadow-primary/25"
                  : "border border-border bg-white text-text/70 hover:border-primary/30 hover:text-primary"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        <div className="relative mt-8 sm:mt-10">
          <div
            ref={containerRef}
            className="overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
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
                    {filteredServices.map((service) => (
                      <div
                        key={service.title}
                        style={{ width: slideWidth, minWidth: slideWidth }}
                        className="shrink-0"
                      >
                        <ServiceCard service={service} />
                      </div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {filteredServices.length > slidesPerView && (
            <>
              <button
                type="button"
                onClick={goPrev}
                disabled={isAnimating || slideIndex <= 0}
                aria-label="Previous services"
                className="absolute -left-1 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-border bg-white p-2.5 shadow-md transition-all hover:border-primary/30 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40 sm:flex"
              >
                <ChevronLeft className="h-5 w-5 text-text/70" />
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={isAnimating || slideIndex >= maxSlideIndex}
                aria-label="Next services"
                className="absolute -right-1 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-border bg-white p-2.5 shadow-md transition-all hover:border-primary/30 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40 sm:flex"
              >
                <ChevronRight className="h-5 w-5 text-text/70" />
              </button>
            </>
          )}

          {filteredServices.length > slidesPerView && (
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
              Need a custom printing or branding solution?
            </p>
            <p className="mt-1 text-sm text-text/60">
              Share your requirement — we&apos;ll get back with a free quote.
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
