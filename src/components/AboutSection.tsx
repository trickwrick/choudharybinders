"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Clock,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  fadeUp,
  slideFromLeft,
  slideFromRight,
  staggerContainer,
  staggerItem,
} from "@/lib/animations";
import { sectionImages } from "@/lib/site-images";
import Button from "./Button";
import Container from "./Container";
import SectionHeading from "./SectionHeading";
import SectionImage from "./SectionImage";

const stats = [
  { value: "45+", label: "Years of Excellence" },
  { value: "1000+", label: "Projects Completed" },
  { value: "500+", label: "Happy Clients" },
  { value: "10+", label: "Printing Services" },
];

const highlights = [
  {
    icon: Award,
    title: "Premium Quality",
    description:
      "High-grade materials, sharp print finish, and durable signage built to last outdoors and indoors.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description:
      "Fast turnaround for banners, flex boards, LED signs, and bulk printing — without compromising quality.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Since 1980",
    description:
      "Decades of experience serving businesses, showrooms, hotels, and brands across Jaipur and India.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="bg-white py-12 sm:py-16 lg:py-20">
      <Container>
        <SectionHeading spaced className="!mb-4 sm:!mb-5">
          About Us
        </SectionHeading>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mb-10 max-w-2xl text-center text-sm text-text/60 sm:mb-12 sm:text-base"
        >
          Jaipur&apos;s trusted name in printing, advertising &amp; branding
          solutions
        </motion.p>

        <div className="grid items-start gap-8 md:grid-cols-2 md:gap-10 lg:gap-14">
          <motion.div
            variants={slideFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="relative space-y-4 md:sticky md:top-24"
          >
            <div className="brand-tricolor-bar absolute -left-3 top-6 hidden h-24 w-1 rounded-full md:block" />
            <div className="relative overflow-hidden rounded-2xl border border-border/80 shadow-xl">
              <div className="group">
                <SectionImage
                  src={sectionImages.about}
                  alt="Choudhary Binders & Printers — printing and signage work in Jaipur"
                  aspect="4/3"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  imageClassName="!p-0"
                />
              </div>
              <div className="absolute right-3 top-3 flex items-center gap-2 rounded-full bg-brand-lime px-3 py-1.5 shadow-md sm:right-4 sm:top-4 sm:px-4 sm:py-2">
                <Sparkles className="h-4 w-4 text-text" />
                <span className="text-xs font-bold text-text sm:text-sm">
                  Since 1980
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-border bg-light-bg px-5 py-4">
              <p className="text-3xl font-bold text-primary">1980</p>
              <div>
                <p className="text-sm font-semibold text-text">
                  Established in Jaipur
                </p>
                <p className="text-xs text-text/55">
                  Over four decades of printing excellence
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={slideFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary sm:text-sm">
              <MapPin className="h-3.5 w-3.5" />
              Vidhyadhar Nagar, Jaipur
            </span>

            <h3 className="mt-5 text-2xl font-bold leading-snug text-text sm:text-3xl lg:text-[2rem]">
              Your Complete Printing &amp;{" "}
              <span className="brand-gradient-text">Branding Partner</span>
            </h3>

            <div className="mt-5 space-y-4 text-sm leading-relaxed text-text/70 sm:text-base">
              <p>
                <strong className="font-semibold text-text">
                  Choudhary Binders &amp; Printers
                </strong>{" "}
                was founded in 1980 with a simple vision — to deliver reliable,
                high-quality printing and advertising solutions that help
                businesses stand out. From a modest beginning in Jaipur, we have
                grown into a full-service printing house trusted by retail
                stores, corporates, hotels, jewellers, and institutions across
                Rajasthan and beyond.
              </p>
              <p>
                We specialize in offset printing, flex &amp; banner printing,
                LED sign boards, shop branding, outdoor hoardings, promotional
                materials, and complete visual identity solutions. Our experienced
                team handles everything from design support to fabrication and
                on-site installation — so you get a seamless, professional
                experience every time.
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-8 grid grid-cols-2 gap-3 sm:gap-4"
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={staggerItem}
                  className="rounded-xl border border-border/80 bg-light-bg px-4 py-4 text-center transition-colors hover:border-primary/25 hover:bg-white sm:px-5 sm:py-5"
                >
                  <p className="text-xl font-bold text-primary sm:text-2xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs font-medium text-text/60 sm:text-sm">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-8 space-y-4">
              {highlights.map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex gap-4 rounded-xl border border-transparent p-1 transition-colors hover:border-border/60 hover:bg-light-bg/50"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-text">{item.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-text/65">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-8 flex flex-wrap gap-3 sm:mt-10"
            >
              <Button href="#contact" size="lg">
                Get a Free Quote
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="tel:+917821013457" variant="outline" size="lg">
                Call +91-7821013457
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
