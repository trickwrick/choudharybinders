"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Lamp,
  Megaphone,
  Printer,
  Sparkles,
  Sun,
  type LucideIcon,
} from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { categoryImages } from "@/lib/site-images";
import Button from "./Button";
import Container from "./Container";
import SectionHeading from "./SectionHeading";

const categories: {
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
  href: string;
}[] = [
  {
    title: "Indoor Branding",
    description: "Shop interiors, wall graphics & in-store display branding",
    image: categoryImages.indoor,
    icon: Building2,
    href: "#contact",
  },
  {
    title: "Flex Printing Service",
    description: "High-quality flex banners, hoardings & large-format prints",
    image: categoryImages.flex,
    icon: Printer,
    href: "#contact",
  },
  {
    title: "Outdoor Branding",
    description: "Billboards, building signage & outdoor advertising solutions",
    image: categoryImages.outdoor,
    icon: Sun,
    href: "#contact",
  },
  {
    title: "Promotional Desk",
    description: "Promotional stands, counters & event display setups",
    image: categoryImages.promotional,
    icon: Megaphone,
    href: "#contact",
  },
  {
    title: "LED Sign Boards",
    description: "LED boards, glow signs & illuminated shop front branding",
    image: categoryImages.led,
    icon: Lamp,
    href: "#contact",
  },
  {
    title: "Offset Printing",
    description: "Bulk printing for brochures, catalogues & publications",
    image: categoryImages.offset,
    icon: Sparkles,
    href: "#contact",
  },
];

function bentoClass(index: number) {
  if (index === 0) return "col-span-2 row-span-2 min-h-[240px] md:min-h-0";
  if (index === 5) return "col-span-2 min-h-[160px] md:col-span-2";
  return "min-h-[160px]";
}

export default function CategorySection() {
  return (
    <section id="category" className="bg-section-warm py-12 sm:py-16 lg:py-20">
      <Container>
        <SectionHeading spaced>Category</SectionHeading>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[175px] sm:gap-4 md:grid-cols-4 md:auto-rows-[185px] lg:auto-rows-[200px]"
        >
          {categories.map((item, index) => {
            const Icon = item.icon;
            const isFeatured = index === 0;
            const isWide = index === 5;

            return (
              <motion.a
                key={item.title}
                href={item.href}
                variants={staggerItem}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className={`group relative block h-full overflow-hidden rounded-2xl border border-border/60 shadow-md transition-all duration-300 hover:border-primary/30 hover:shadow-2xl ${bentoClass(index)}`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes={
                    isFeatured
                      ? "(max-width: 768px) 100vw, 50vw"
                      : isWide
                        ? "(max-width: 768px) 100vw, 50vw"
                        : "(max-width: 768px) 50vw, 25vw"
                  }
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/15 transition-opacity duration-300 group-hover:from-black/95" />

                <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-primary shadow-lg sm:left-4 sm:top-4">
                  <Icon className="h-4 w-4" />
                </span>

                <span className="pointer-events-none absolute right-3 top-3 text-2xl font-bold text-white/25 sm:right-4 sm:top-4 sm:text-3xl">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div
                  className={`absolute inset-x-0 bottom-0 flex flex-col justify-end ${
                    isFeatured ? "p-5 sm:p-6 lg:p-7" : "p-4 sm:p-5"
                  }`}
                >
                  <h3
                    className={`font-bold text-white ${
                      isFeatured
                        ? "text-xl sm:text-2xl lg:text-3xl"
                        : "text-sm sm:text-base lg:text-lg"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`mt-1.5 leading-relaxed text-white/75 ${
                      isFeatured
                        ? "line-clamp-3 text-sm sm:text-base"
                        : "line-clamp-2 text-xs sm:text-sm"
                    }`}
                  >
                    {item.description}
                  </p>

                  <span
                    className={`mt-3 inline-flex items-center gap-1.5 font-semibold text-brand-lime transition-all duration-300 ${
                      isFeatured ? "text-sm sm:text-base" : "text-xs sm:text-sm"
                    } translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100`}
                  >
                    Explore
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>

                <span className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-accent via-primary to-brand-lime transition-all duration-500 group-hover:w-full" />
              </motion.a>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 flex justify-center sm:mt-10"
        >
          <Button href="#contact" variant="outline" size="lg">
            View All Services
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
