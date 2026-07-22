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

export default function CategorySection() {
  return (
    <section id="category" className="bg-section-warm py-12 sm:py-16 lg:py-20">
      <Container>
        <SectionHeading spaced>Category</SectionHeading>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
        >
          {categories.map((item) => {
            const Icon = item.icon;

            return (
              <motion.a
                key={item.title}
                href={item.href}
                variants={staggerItem}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-white shadow-sm transition-all duration-300 hover:border-primary/25 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-light-bg">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary shadow-md">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-bold text-text">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-text/65">
                    {item.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors group-hover:text-primary-dark">
                    Enquire Now
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
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
