"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { fadeUp } from "@/lib/animations";
import Container from "./Container";

const testimonials = [
  {
    name: "Stuti Singh",
    role: "Marketing Manager",
    organization: "Corporate Client, Jaipur",
    text: "We ordered the display stands along with banner for our company and absolutely loved the quality of the standee and banner. We would like to thank Choudhary Binders & Printers for the quick turnaround.",
    image: "/testimonials/stuti.jpg",
  },
  {
    name: "Raunak Sharma",
    role: "Business Owner",
    organization: "Sharma Enterprises, Jaipur",
    text: "We have been using Choudhary Binders & Printers for our advertising services for a long time now. They are very professional and always ensure client satisfaction.",
    image: "/testimonials/raunak.jpg",
  },
  {
    name: "Priya Mehta",
    role: "Showroom Owner",
    organization: "Mehta Jewellers, Jaipur",
    text: "Excellent flex printing and signage work for our showroom. The team understood our requirements perfectly and delivered on time with premium quality results.",
    image: "/testimonials/priya.jpg",
  },
];

const trackTransition = {
  duration: 0.85,
  ease: [0.25, 0.1, 0.25, 1] as const,
};

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

interface TestimonialCardProps {
  testimonial: (typeof testimonials)[number];
  variant: "active" | "side";
}

function TestimonialCard({ testimonial, variant }: TestimonialCardProps) {
  const isActive = variant === "active";

  return (
    <div
      className={`flex h-full w-full min-w-0 overflow-hidden rounded-2xl border border-border/70 bg-white shadow-xl sm:rounded-3xl ${
        isActive ? "shadow-2xl" : ""
      }`}
    >
      <div
        className={`relative shrink-0 overflow-hidden bg-[#153258] ${
          isActive ? "w-[7.5rem] sm:w-[9.5rem]" : "w-[5.5rem] sm:w-[6.5rem]"
        }`}
      >
        <div className="absolute inset-y-0 right-0 w-8 translate-x-1/2 rounded-full bg-[#153258]" />
        <div
          className={`relative flex items-center justify-center ${
            isActive
              ? "min-h-[220px] p-4 sm:min-h-[250px] sm:p-5"
              : "min-h-[180px] p-3 sm:min-h-[200px]"
          }`}
        >
          <div
            className={`relative shrink-0 overflow-hidden rounded-full border-[3px] border-white/30 shadow-lg ${
              isActive ? "h-20 w-20 sm:h-24 sm:w-24" : "h-14 w-14 sm:h-16 sm:w-16"
            }`}
          >
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              sizes={isActive ? "96px" : "64px"}
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div
        className={`relative z-10 flex min-w-0 flex-1 flex-col justify-center bg-white ${
          isActive ? "px-4 py-5 sm:px-6 sm:py-6" : "px-3 py-4 sm:px-4"
        }`}
      >
        <div
          className={`testimonial-quote-scroll overflow-y-auto pr-1 ${
            isActive ? "max-h-28 sm:max-h-32" : "max-h-20 sm:max-h-24"
          }`}
        >
          <p
            className={`leading-relaxed text-text/75 ${
              isActive
                ? "text-sm sm:text-[15px]"
                : "line-clamp-4 text-[11px] sm:text-xs"
            }`}
          >
            &ldquo;{testimonial.text}&rdquo;
          </p>
        </div>
        <div
          className={`border-t border-border/60 ${
            isActive ? "mt-4 pt-4" : "mt-3 pt-3"
          }`}
        >
          <p
            className={`font-bold text-text ${
              isActive ? "text-base sm:text-lg" : "text-sm"
            }`}
          >
            {testimonial.name}
          </p>
          <p
            className={`font-semibold text-text/65 ${
              isActive ? "mt-0.5 text-sm" : "mt-0.5 text-xs"
            }`}
          >
            {testimonial.role}
          </p>
          <p className={`text-text/50 ${isActive ? "text-sm" : "text-xs"}`}>
            {testimonial.organization}
          </p>
        </div>
      </div>
    </div>
  );
}

function TestimonialTrack({
  current,
  onSelect,
  isAnimating,
  setIsAnimating,
}: {
  current: number;
  onSelect: (index: number) => void;
  isAnimating: boolean;
  setIsAnimating: (value: boolean) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isWide, setIsWide] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const update = () => {
      setContainerWidth(node.offsetWidth);
      setIsWide(window.matchMedia("(min-width: 1024px)").matches);
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

  const gap = isWide ? 28 : 16;
  const slideWidth =
    containerWidth > 0
      ? isWide
        ? containerWidth * 0.58
        : containerWidth
      : 0;
  const centerOffset =
    containerWidth > 0 ? (containerWidth - slideWidth) / 2 : 0;
  const trackX = centerOffset - current * (slideWidth + gap);

  return (
    <div
      ref={containerRef}
      className="min-h-[270px] w-full overflow-hidden"
    >
      {slideWidth > 0 && (
        <motion.div
          className="flex items-stretch"
          style={{ gap }}
          animate={{ x: trackX }}
          transition={trackTransition}
          onAnimationComplete={() => setIsAnimating(false)}
        >
          {testimonials.map((testimonial, index) => {
            const isActive = index === current;

            return (
              <motion.button
                key={testimonial.name}
                type="button"
                disabled={isAnimating}
                onClick={() => !isActive && onSelect(index)}
                style={{ width: slideWidth, minWidth: slideWidth }}
                animate={{
                  scale: isActive ? 1 : 0.9,
                  opacity: isActive ? 1 : 0.5,
                  filter: isActive ? "grayscale(0)" : "grayscale(1)",
                }}
                transition={trackTransition}
                className={`shrink-0 border-0 bg-transparent p-0 text-left ${
                  isActive ? "cursor-default" : "cursor-pointer"
                } disabled:cursor-default`}
                aria-label={
                  isActive
                    ? `Current testimonial: ${testimonial.name}`
                    : `View testimonial from ${testimonial.name}`
                }
              >
                <TestimonialCard
                  testimonial={testimonial}
                  variant={isActive ? "active" : "side"}
                />
              </motion.button>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const len = testimonials.length;

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating || index === current) return;
      setIsAnimating(true);
      setCurrent(index);
    },
    [current, isAnimating],
  );

  const prev = useCallback(() => {
    goTo(mod(current - 1, len));
  }, [current, goTo, len]);

  const next = useCallback(() => {
    goTo(mod(current + 1, len));
  }, [current, goTo, len]);

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-section-warm py-14 sm:py-16"
    >
      <Container className="relative">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-text/55 sm:text-sm">
            Trusted by businesses across Jaipur
          </p>
          <h2 className="mt-3 text-3xl font-extrabold uppercase tracking-wide text-text sm:text-4xl lg:text-[2.75rem]">
            Hall of Fame
          </h2>
        </motion.div>

        <div className="relative mt-10 sm:mt-12">
          <TestimonialTrack
            current={current}
            onSelect={goTo}
            isAnimating={isAnimating}
            setIsAnimating={setIsAnimating}
          />
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-8 flex justify-center gap-3 sm:mt-10 sm:gap-4"
        >
          <motion.button
            type="button"
            onClick={prev}
            disabled={isAnimating}
            whileHover={isAnimating ? undefined : { scale: 1.03 }}
            whileTap={isAnimating ? undefined : { scale: 0.97 }}
            className="rounded-full border border-border bg-white px-8 py-2.5 text-sm font-bold text-text shadow-sm transition-shadow hover:border-primary/30 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 sm:px-10 sm:py-3 sm:text-base"
          >
            Previous
          </motion.button>
          <motion.button
            type="button"
            onClick={next}
            disabled={isAnimating}
            whileHover={isAnimating ? undefined : { scale: 1.03 }}
            whileTap={isAnimating ? undefined : { scale: 0.97 }}
            className="rounded-full border border-border bg-white px-8 py-2.5 text-sm font-bold text-text shadow-sm transition-shadow hover:border-primary/30 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 sm:px-10 sm:py-3 sm:text-base"
          >
            Next
          </motion.button>
        </motion.div>
      </Container>
    </section>
  );
}
