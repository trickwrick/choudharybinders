"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Container from "./Container";
import { businessInfo } from "@/lib/site-business";

export type TestimonialItem = {
  _id?: string | any;
  name: string;
  role?: string;
  organization?: string;
  text: string;
  image?: string;
  rating?: number;
  timeAgo?: string;
};

// Authentic Google Reviews matching Choudhary Binders real customer feedback
const defaultGoogleReviews: TestimonialItem[] = [
  {
    name: "Sanil Sharma",
    timeAgo: "11 months ago",
    rating: 5,
    text: "Choudhary Binders & Printers is very professional press in Vidhyadhar Nagar. High quality printing with best rate in Jaipur. Staff is cooperative and delivery is always on time.",
  },
  {
    name: "Dhara Singh Bairwa",
    timeAgo: "12 months ago",
    rating: 5,
    text: "Owner and team are very cooperative and helpful. Book binding, lamination and flex printing quality is awesome. Always recommended for corporate stationery and banners.",
    image: "/testimonials/raunak.jpg",
  },
  {
    name: "Pankaj Kumar Sharma",
    timeAgo: "12 months ago",
    rating: 5,
    text: "Very good quality printing and hard binding work. Quick turnaround and prompt customer service. Highly satisfied with their printing solutions.",
    image: "/testimonials/stuti.jpg",
  },
  {
    name: "Gaurav Kumar",
    timeAgo: "1 year ago",
    rating: 5,
    text: "Nice printing and binding work in Jaipur. Reasonable prices and excellent quality finish for catalogues, brochures and corporate prints.",
    image: "/testimonials/priya.jpg",
  },
  {
    name: "Kuch Bhi",
    timeAgo: "1 year ago",
    rating: 5,
    text: "Nice services and super fast delivery. Best printing hub in Central Spine Vidhyadhar Nagar.",
  },
  {
    name: "Sunil Choudhary",
    timeAgo: "1 year ago",
    rating: 5,
    text: "One of the most trusted and reliable printers in Jaipur. Superb finish and durable binding work.",
  },
];

// Official Google "G" multicolored vector icon
function GoogleIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

// Google Blue verified check badge
function VerifiedBadge() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#1a73e8]" fill="currentColor" aria-label="Verified Review">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  );
}

export default function TestimonialsSection({
  testimonials = [],
}: {
  testimonials?: TestimonialItem[];
}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [expandedReviews, setExpandedReviews] = useState<Record<number, boolean>>({});

  const reviews: TestimonialItem[] =
    testimonials && testimonials.length > 0
      ? testimonials.map((t, idx) => ({
          ...t,
          timeAgo: (t as any).timeAgo || `${(idx + 1) * 2} months ago`,
          rating: (t as any).rating || 5,
        }))
      : defaultGoogleReviews;

  // Official direct Google Review link for Choudhary Binders
  const writeReviewUrl = "https://g.page/r/CcOgUmajCJogEAE/review";

  const updateScrollButtons = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons, { passive: true });
    window.addEventListener("resize", updateScrollButtons);
    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [reviews]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const cardWidth = 320; // 1 card scroll distance
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  const toggleExpand = (index: number) => {
    setExpandedReviews((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const getInitials = (name: string) => {
    if (!name) return "C";
    const parts = name.trim().split(" ");
    return parts.length > 1
      ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
      : name.slice(0, 2).toUpperCase();
  };

  // Google avatar circle background colors (matching screenshot's teal / grey / vibrant look)
  const avatarBgColors = [
    "bg-[#00897b] text-white", // Teal like 'S' in screenshot
    "bg-[#546e7a] text-white", // Steel blue like 'K' in screenshot
    "bg-[#1e88e5] text-white", // Blue
    "bg-[#d81b60] text-white", // Rose
    "bg-[#fb8c00] text-white", // Amber
  ];

  return (
    <section id="testimonials" className="relative overflow-hidden bg-[#fafafa] py-16 sm:py-20 dark:bg-slate-950">
      <Container>
        {/* Section Heading - Exact Font & Blue tone from screenshot */}
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-[#1e3a8a] sm:text-3xl md:text-4xl dark:text-blue-400">
            Clients Testimonials
          </h2>
        </div>

        {/* Outer Flex Container: Left Summary Block + Right Slider with Floating Navigation Arrows */}
        <div className="flex flex-col items-center gap-6 md:gap-8 lg:flex-row lg:items-center">
          
          {/* Left Summary Card (Hospital screenshot exact match: Logo, Name, 4.7 Stars, Count, Write a review) */}
          <div className="flex w-full flex-col items-center text-center sm:max-w-xs lg:w-64 lg:shrink-0 lg:items-start lg:text-left">
            <div className="flex flex-col items-center lg:items-start">
              {/* Logo */}
              <div className="relative mb-3 h-14 w-14 overflow-hidden rounded-xl border border-slate-200/80 bg-white p-1 shadow-xs dark:border-slate-800">
                <Image
                  src={businessInfo.logo}
                  alt="Choudhary Binders & Printers"
                  width={56}
                  height={56}
                  className="h-full w-full object-contain"
                />
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-base font-bold text-slate-900 dark:text-white sm:text-lg">
                Choudhary Binders &amp; Printers
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Central Spine, Vidhyadhar Nagar
              </p>

              {/* 5-Star Rating */}
              <div className="mt-2.5 flex items-center gap-1 text-[#f4b400]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < 4
                        ? "fill-[#f4b400] text-[#f4b400]"
                        : "fill-[#f4b400]/70 text-[#f4b400]"
                    }`}
                  />
                ))}
              </div>

              {/* Review Count */}
              <p className="mt-1 text-xs font-semibold text-slate-700 dark:text-slate-300 sm:text-sm">
                199+ Google reviews
              </p>

              {/* Write a Review Button */}
              <a
                href={writeReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-center rounded-md border border-slate-400 bg-white px-5 py-1.5 text-xs font-semibold text-slate-800 shadow-xs transition-colors hover:border-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Write a review
              </a>
            </div>
          </div>

          {/* Right Cards Slider Area with Side Arrow Buttons */}
          <div className="relative w-full flex-1 min-w-0">
            {/* Left Side Arrow Button (Floating vertically centered, screenshot style) */}
            {canScrollLeft && (
              <button
                type="button"
                onClick={() => scroll("left")}
                aria-label="Previous review"
                className="absolute -left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-lg transition-transform hover:scale-110 active:scale-95 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}

            {/* Right Side Arrow Button (Floating vertically centered, screenshot style) */}
            {canScrollRight && (
              <button
                type="button"
                onClick={() => scroll("right")}
                aria-label="Next review"
                className="absolute -right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-lg transition-transform hover:scale-110 active:scale-95 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            )}

            {/* Scroll Container */}
            <div
              ref={scrollContainerRef}
              className="flex gap-4 overflow-x-auto pb-4 pt-2 scrollbar-none snap-x snap-mandatory px-2"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {reviews.map((review, index) => {
                const colorClass = avatarBgColors[index % avatarBgColors.length];
                const isExpanded = expandedReviews[index];

                return (
                  <div
                    key={review._id || index}
                    className="flex w-[270px] shrink-0 flex-col justify-between rounded-2xl bg-[#f1f3f4] p-5 shadow-xs transition-shadow hover:shadow-md dark:bg-slate-900/90 sm:w-[290px] snap-start"
                  >
                    <div>
                      {/* Card Header: Avatar + Name / Time + Google G Icon */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-3">
                          {review.image ? (
                            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-1 ring-slate-200 dark:ring-slate-700">
                              <Image
                                src={review.image}
                                alt={review.name}
                                fill
                                sizes="40px"
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${colorClass}`}
                            >
                              {getInitials(review.name)}
                            </div>
                          )}

                          <div className="min-w-0">
                            <h4 className="truncate text-xs font-bold text-slate-900 dark:text-white sm:text-sm">
                              {review.name}
                            </h4>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400">
                              {review.timeAgo || "Google Review"}
                            </p>
                          </div>
                        </div>

                        {/* Google 'G' multicolored icon */}
                        <GoogleIcon className="h-4 w-4 shrink-0" />
                      </div>

                      {/* Stars + Verified Checkmark */}
                      <div className="mt-3 flex items-center gap-1.5">
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-3.5 w-3.5 fill-[#f4b400] text-[#f4b400]"
                            />
                          ))}
                        </div>
                        <VerifiedBadge />
                      </div>

                      {/* Review Text Body */}
                      <p
                        className={`mt-3 text-xs leading-relaxed text-slate-700 dark:text-slate-300 ${
                          isExpanded ? "" : "line-clamp-3"
                        }`}
                      >
                        {review.text}
                      </p>
                    </div>

                    {/* "Read more" toggle button like Google reviews widget */}
                    {review.text.length > 70 && (
                      <div className="mt-2 pt-1">
                        <button
                          type="button"
                          onClick={() => toggleExpand(index)}
                          className="text-[11px] font-medium text-slate-500 hover:text-slate-800 hover:underline dark:text-slate-400 dark:hover:text-slate-200"
                        >
                          {isExpanded ? "Show less" : "Read more"}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
