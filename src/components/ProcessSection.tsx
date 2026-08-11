"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { MessageSquare, Package, Palette, Printer } from "lucide-react";
import { type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import Container from "./Container";
import Reveal from "./motion/Reveal";
import SectionDivider from "./motion/SectionDivider";
import SectionHeading from "./SectionHeading";

const steps: {
  step: string;
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    step: "01",
    icon: MessageSquare,
    title: "Share Requirement",
    description: "Call, WhatsApp or fill the form — tell us what you need printed or branded.",
  },
  {
    step: "02",
    icon: Palette,
    title: "Design & Approval",
    description: "Our team prepares artwork or uses yours — you approve before we print.",
  },
  {
    step: "03",
    icon: Printer,
    title: "Print & Fabricate",
    description: "Production begins with quality checks at every stage of printing & fabrication.",
  },
  {
    step: "04",
    icon: Package,
    title: "Deliver & Install",
    description: "On-time delivery across Jaipur with optional on-site installation support.",
  },
];

function ProcessStep({
  item,
  index,
  activeIndex,
}: {
  item: (typeof steps)[number];
  index: number;
  activeIndex: number;
}) {
  const isActive = index === activeIndex;
  const isPast = index < activeIndex;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className="relative text-center"
    >
      <motion.div
        animate={{
          scale: isActive ? 1.05 : 1,
          opacity: isActive ? 1 : isPast ? 0.85 : 0.55,
        }}
        transition={{ duration: 0.45 }}
        className={`relative mx-auto flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl border-2 bg-white shadow-md ${
          isActive ? "border-primary shadow-lg shadow-primary/15" : "border-primary/20"
        }`}
      >
        <item.icon className={`h-7 w-7 ${isActive ? "text-primary" : "text-primary/70"}`} />
        <span
          className={`absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-white shadow ${
            isActive ? "bg-accent" : "bg-primary/60"
          }`}
        >
          {item.step}
        </span>
      </motion.div>

      {index < steps.length - 1 && (
        <div className="mx-auto my-3 h-8 w-0.5 bg-gradient-to-b from-primary/40 to-transparent sm:hidden" />
      )}

      <h3
        className={`mt-5 text-base font-bold sm:text-lg ${
          isActive ? "text-text" : "text-text/70"
        }`}
      >
        {item.title}
      </h3>
      <p className="mx-auto mt-2 max-w-[220px] text-sm leading-relaxed text-text/60">
        {item.description}
      </p>
    </motion.div>
  );
}

export default function ProcessSection() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.75", "end 0.35"],
  });

  const lineProgress = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
    { stiffness: 80, damping: 22 },
  );

  useEffect(() => {
    if (reduced) return;
    const unsub = scrollYProgress.on("change", (v) => {
      const idx = Math.min(steps.length - 1, Math.floor(v * steps.length));
      setActiveIndex(idx);
    });
    return unsub;
  }, [scrollYProgress, reduced]);

  return (
    <>
      <SectionDivider variant="mint" />
      <section
        id="process"
        ref={sectionRef}
        className="relative bg-section-mint py-12 sm:py-16 lg:py-20"
      >
        <Container>
          <SectionHeading spaced className="!mb-4 sm:!mb-5">
            How We Work
          </SectionHeading>
          <Reveal delay={0.1} className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
            <p className="text-sm text-text/60 sm:text-base">
              A simple, transparent production journey — from enquiry to final delivery
            </p>
          </Reveal>

          <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {!reduced && (
              <div className="pointer-events-none absolute top-[3.25rem] hidden h-0.5 overflow-hidden rounded-full bg-primary/10 lg:block lg:left-[12%] lg:right-[12%]">
                <motion.div
                  style={{ width: lineProgress }}
                  className="h-full bg-gradient-to-r from-accent via-primary to-brand-lime"
                />
              </div>
            )}

            {steps.map((item, index) => (
              <ProcessStep
                key={item.step}
                item={item}
                index={index}
                activeIndex={reduced ? -1 : activeIndex}
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
