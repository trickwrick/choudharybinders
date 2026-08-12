"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Check,
  Handshake,
  Printer,
  Sparkles,
} from "lucide-react";
import {
  bindingSolutions,
  companyContent,
  contentImages,
  printingSolutions,
} from "@/lib/site-content";
import Button from "./Button";
import Container from "./Container";
import Reveal from "./motion/Reveal";
import { StaggerItem, StaggerReveal } from "./motion/StaggerReveal";

function ServicePanel({
  title,
  subtitle,
  icon: Icon,
  items,
  accent,
  delay = 0,
}: {
  title: string;
  subtitle: string;
  icon: typeof Printer;
  items: readonly string[];
  accent: "primary" | "accent";
  delay?: number;
}) {
  const styles =
    accent === "primary"
      ? {
          border: "border-l-primary",
          icon: "bg-primary/10 text-primary",
          dot: "bg-primary",
          hover: "hover:border-primary/30 hover:bg-primary/[0.03]",
        }
      : {
          border: "border-l-accent",
          icon: "bg-accent/10 text-accent",
          dot: "bg-accent",
          hover: "hover:border-accent/30 hover:bg-accent/[0.03]",
        };

  return (
    <Reveal delay={delay}>
      <motion.div
        whileHover={{ x: 4 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`group rounded-xl border border-border/70 border-l-[3px] ${styles.border} bg-white p-4 shadow-sm transition-colors duration-300 ${styles.hover} sm:p-4`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${styles.icon} transition-transform duration-300 group-hover:scale-110`}
          >
            <Icon className="h-4 w-4" strokeWidth={2.2} />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-extrabold text-text sm:text-lg">{title}</h3>
            <p className="mt-0.5 text-xs leading-relaxed text-text/55 sm:text-sm">{subtitle}</p>
          </div>
        </div>

        <ul className="mt-3 space-y-1">
          {items.map((item, index) => (
            <li
              key={item}
              className="flex items-center gap-2 rounded-lg px-1.5 py-1 transition-colors duration-200 group-hover:bg-white/80"
            >
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${styles.icon} text-[9px] font-bold`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-xs text-text/75 sm:text-sm">{item}</span>
              <Check className={`ml-auto h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${accent === "primary" ? "text-primary" : "text-accent"}`} />
            </li>
          ))}
        </ul>
      </motion.div>
    </Reveal>
  );
}

export default function SolutionsSection() {
  return (
    <section id="services" className="relative overflow-hidden bg-white py-8 sm:py-10 lg:py-12">
      <div className="print-grain pointer-events-none absolute inset-0 opacity-[0.18]" />
      <div className="pointer-events-none absolute right-0 top-1/4 h-96 w-96 rounded-full bg-primary/[0.04] blur-3xl" />

      <Container className="relative">
        <div className="grid items-end gap-4 lg:grid-cols-12 lg:gap-6">
          <Reveal className="lg:col-span-5">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary sm:text-xs">
              <Sparkles className="h-3 w-3" />
              {printingSolutions.subtitle}
            </span>
            <h2 className="mt-2 text-2xl font-extrabold leading-[1.15] tracking-tight text-text sm:text-3xl">
              Our Printing{" "}
              <span className="brand-gradient-text">Solutions</span>
            </h2>
            <p className="mt-2 max-w-md text-xs leading-relaxed text-text/60 sm:text-sm">
              {companyContent.intro}
            </p>

            <div className="mt-4 hidden flex-wrap gap-1.5 lg:flex">
              {printingSolutions.features.map((feature) => (
                <span
                  key={feature}
                  className="rounded-full border border-primary/20 bg-primary/[0.06] px-2.5 py-1 text-[10px] font-semibold text-primary"
                >
                  {feature}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-7">
            <div className="flex flex-wrap items-center justify-start gap-1.5 sm:justify-end">
              {printingSolutions.extendedItems.slice(0, 3).map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border/80 bg-section-warm px-2.5 py-1 text-[10px] font-medium text-text/60 sm:text-xs"
                >
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-6 grid gap-4 lg:mt-7 lg:grid-cols-12 lg:gap-5">
          <Reveal className="lg:col-span-5">
            <div className="group relative">
              <div className="absolute -inset-3 rounded-[1.75rem] bg-gradient-to-br from-primary/15 via-accent/10 to-primary/5 opacity-60 blur-sm transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative overflow-hidden rounded-2xl border border-border/70 shadow-[0_12px_40px_rgba(0,0,0,0.1)]">
                <div className="brand-tricolor-bar absolute inset-x-0 top-0 z-10 h-1" />
                <div className="relative aspect-[4/3] max-h-[320px] sm:max-h-[360px] lg:max-h-none lg:aspect-[5/4]">
                  <Image
                    src={contentImages.printingSolutions}
                    alt="Our printing solutions — Choudhary Binders & Printers"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                  <div className="rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur-md">
                    <p className="text-sm font-extrabold text-white sm:text-base">
                      {companyContent.brandLine}
                    </p>
                    <p className="mt-0.5 text-xs text-white/75">{companyContent.tagline}</p>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="absolute -bottom-3 -right-2 z-10 hidden max-w-[8rem] rounded-xl border border-border/70 bg-white p-2 shadow-lg sm:block lg:-right-3"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src={contentImages.printingBinding}
                    alt="Binding services"
                    fill
                    className="object-cover"
                    sizes="180px"
                  />
                </div>
                <p className="mt-1.5 text-center text-[10px] font-bold uppercase tracking-wide text-text/50">
                  Binding &amp; Finishing
                </p>
              </motion.div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-3 lg:col-span-7 lg:gap-4">
            <ServicePanel
              title="Printing"
              subtitle={printingSolutions.description}
              icon={Printer}
              items={printingSolutions.items}
              accent="primary"
            />

            <ServicePanel
              title={bindingSolutions.title}
              subtitle={bindingSolutions.subtitle}
              icon={BookOpen}
              items={bindingSolutions.items}
              accent="accent"
              delay={0.08}
            />

            <Reveal delay={0.14}>
              <div className="flex flex-col gap-3 rounded-xl border border-border/70 bg-section-warm/80 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Handshake className="h-4 w-4" />
                  </div>
                  <p className="text-xs font-semibold text-text sm:text-sm">
                    {companyContent.completeSolutionsBadge}
                  </p>
                </div>
                <Button href="#contact" size="sm" className="shrink-0">
                  Get a Free Quote
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.16} className="mt-6 lg:mt-7">
          <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-[#0f172a] px-4 py-5 sm:px-6 sm:py-6">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(17,192,17,0.15),transparent_50%),radial-gradient(circle_at_80%_50%,rgba(255,106,0,0.12),transparent_50%)]" />
            <p className="relative text-center text-xs font-bold uppercase tracking-[0.22em] text-white/45">
              Complete Print Services
            </p>
            <StaggerReveal
              className="relative mt-3 flex flex-wrap items-center justify-center gap-2"
              stagger={0.04}
            >
              {printingSolutions.extendedItems.map((item) => (
                <StaggerItem key={item}>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-white/80 transition-all duration-300 hover:border-primary/40 hover:bg-primary/15 hover:text-white">
                    <span className="h-1 w-1 rounded-full bg-primary" />
                    {item}
                  </span>
                </StaggerItem>
              ))}
            </StaggerReveal>
            <div className="relative mt-4 text-center">
              <Link
                href="/category"
                className="group inline-flex items-center gap-1.5 text-xs font-bold text-primary transition-colors hover:text-white sm:text-sm"
              >
                Browse All Categories
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
