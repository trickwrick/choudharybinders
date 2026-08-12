"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { cardHover3d } from "@/lib/animations";
import { categories } from "@/lib/categories";
import Container from "./Container";
import Reveal from "./motion/Reveal";
import { StaggerItem, StaggerReveal } from "./motion/StaggerReveal";
import SectionHeading from "./SectionHeading";

const IMAGE_FALLBACK = "/categories/flex-printing.jpg";

function CategoryCardImage({ src, alt }: { src: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      className="object-cover transition-transform duration-600 ease-out group-hover:scale-[1.06]"
      onError={() => {
        if (imgSrc !== IMAGE_FALLBACK) setImgSrc(IMAGE_FALLBACK);
      }}
    />
  );
}

export default function ProductsSection() {
  return (
    <section id="category" className="relative bg-section-mint py-12 sm:py-16 lg:py-20">
        <div className="print-grain pointer-events-none absolute inset-0 opacity-25" />

        <Container className="relative">
          <SectionHeading spaced>Category</SectionHeading>

          <Reveal delay={0.1} className="mx-auto -mt-6 mb-10 max-w-2xl text-center sm:mb-12">
            <p className="text-sm text-text/60 sm:text-base">
              Explore our printing &amp; signage categories — each crafted with precision,
              colour accuracy &amp; durable materials.
            </p>
          </Reveal>

          <StaggerReveal
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
            stagger={0.08}
            delayChildren={0.05}
          >
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <StaggerItem key={category.id}>
                  <motion.div
                    initial="rest"
                    whileHover="hover"
                    variants={cardHover3d}
                    className="perspective-card h-full"
                  >
                    <Link
                      href={`/category/${category.id}`}
                      className="press-card group flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-white shadow-sm"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
                        <CategoryCardImage src={category.image} alt={category.title} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary shadow-sm sm:text-xs">
                          <Icon className="h-3 w-3" />
                          {category.tag}
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col p-4 sm:p-5">
                        <h3 className="text-base font-bold text-text transition-colors group-hover:text-primary sm:text-lg">
                          {category.title}
                        </h3>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-text/60">
                          {category.description}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                          View Products
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerReveal>
        </Container>
      </section>
  );
}
