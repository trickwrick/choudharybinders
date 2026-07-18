"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  FileText,
  Lamp,
  LayoutGrid,
  Megaphone,
  Presentation,
  type LucideIcon,
} from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { productImages } from "@/lib/site-images";
import Button from "./Button";
import Container from "./Container";
import SectionHeading from "./SectionHeading";

const products: {
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
  tag: string;
}[] = [
  {
    title: "Banner Stand",
    tag: "Display",
    icon: Presentation,
    image: productImages[0],
    description: "Portable roll-up & standee displays for events and shops",
  },
  {
    title: "Flex Board",
    tag: "Signage",
    icon: LayoutGrid,
    image: productImages[1],
    description: "Durable flex boards for indoor & outdoor branding",
  },
  {
    title: "LED Sign Board",
    tag: "Illuminated",
    icon: Lamp,
    image: productImages[2],
    description: "Bright LED boards for shops, hotels & commercial fronts",
  },
  {
    title: "Promotional Canopy",
    tag: "Events",
    icon: Megaphone,
    image: productImages[3],
    description: "Custom printed canopies for events & outdoor campaigns",
  },
  {
    title: "Pamphlet Printing",
    tag: "Print",
    icon: FileText,
    image: productImages[4],
    description: "Pamphlets, leaflets & marketing print collateral",
  },
  {
    title: "Indoor Branding",
    tag: "Retail",
    icon: Building2,
    image: productImages[5],
    description: "Wall graphics & in-store visual branding solutions",
  },
];

export default function ProductsSection() {
  return (
    <section id="products" className="bg-section-mint py-12 sm:py-16 lg:py-20">
      <Container>
        <SectionHeading spaced>Products</SectionHeading>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
        >
          {products.map((product) => {
            const Icon = product.icon;

            return (
              <motion.a
                key={product.title}
                href="#contact"
                variants={staggerItem}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-white shadow-sm transition-all duration-300 hover:border-primary/25 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary shadow-sm sm:text-xs">
                    <Icon className="h-3 w-3" />
                    {product.tag}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <h3 className="text-base font-bold text-text transition-colors group-hover:text-primary sm:text-lg">
                    {product.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-text/60">
                    {product.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Enquire Now
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
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
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-primary/15 bg-white px-6 py-6 sm:mt-10 sm:flex-row sm:px-8 sm:py-7"
        >
          <div className="text-center sm:text-left">
            <p className="text-lg font-bold text-text sm:text-xl">
              Looking for a custom product?
            </p>
            <p className="mt-1 text-sm text-text/60">
              Tell us what you need — we&apos;ll manufacture &amp; deliver it for you.
            </p>
          </div>
          <Button href="#contact" size="lg" className="shrink-0">
            Request a Quote
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
