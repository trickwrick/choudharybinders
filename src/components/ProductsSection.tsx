"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cardHover3d } from "@/lib/animations";
import { categories } from "@/lib/categories";
import Button from "./Button";
import Container from "./Container";
import ImageReveal from "./motion/ImageReveal";
import MagneticWrap from "./motion/MagneticWrap";
import Reveal from "./motion/Reveal";
import SectionDivider from "./motion/SectionDivider";
import { StaggerItem, StaggerReveal } from "./motion/StaggerReveal";
import SectionHeading from "./SectionHeading";

export default function ProductsSection() {
  return (
    <>
      <SectionDivider variant="mint" />
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
            {categories.map((category, index) => {
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
                      <ImageReveal delay={index * 0.05} className="relative aspect-[4/3]">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={category.image}
                            alt={category.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-600 ease-out group-hover:scale-[1.06]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary shadow-sm sm:text-xs">
                            <Icon className="h-3 w-3" />
                            {category.tag}
                          </span>
                        </div>
                      </ImageReveal>

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

          <Reveal delay={0.15} className="mt-8 sm:mt-10">
            <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-primary/15 bg-white px-6 py-6 sm:flex-row sm:px-8 sm:py-7">
              <div className="text-center sm:text-left">
                <p className="text-lg font-bold text-text sm:text-xl">
                  Looking for a custom product?
                </p>
                <p className="mt-1 text-sm text-text/60">
                  Tell us what you need — we&apos;ll manufacture &amp; deliver it for you.
                </p>
              </div>
              <MagneticWrap strength={0.18}>
                <Button href="#contact" size="lg" className="shrink-0">
                  Request a Quote
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </MagneticWrap>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
