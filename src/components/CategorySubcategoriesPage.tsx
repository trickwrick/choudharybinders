"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { fadeUp } from "@/lib/animations";
import type { CategorySummary } from "@/lib/categories";
import type { PublicCategory } from "@/lib/types/public-catalog";
import Container from "./Container";

export default function CategorySubcategoriesPage({
  category,
  subcategories,
}: {
  category: CategorySummary;
  subcategories: PublicCategory[];
}) {
  return (
    <section className="bg-section-warm pb-12 sm:pb-16 lg:pb-20">
      <div className="relative overflow-hidden border-b border-border/60 bg-white">
        <div className="absolute inset-0">
          <Image
            src={category.image}
            alt={category.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/65 to-black/45" />
        </div>

        <Container className="relative py-10 sm:py-12 lg:py-14">
          <nav aria-label="Breadcrumb" className="mb-5 text-xs text-white/70 sm:text-sm">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li>
                <Link href="/category" className="transition-colors hover:text-white">
                  Category
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li className="font-medium text-white">{category.title}</li>
            </ol>
          </nav>

          <div className="max-w-2xl">
            <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm sm:text-xs">
              {category.tag}
            </span>
            <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-[2.65rem]">
              {category.title}
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
              {category.description}
            </p>
          </div>
        </Container>
      </div>

      <Container className="mt-12 sm:mt-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {subcategories.map((sub, index) => (
            <motion.div
              key={sub.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/category/${sub.id}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-xl"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-light-bg">
                  <Image
                    src={sub.image}
                    alt={sub.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-primary opacity-0 shadow-sm transition-all duration-300 group-hover:opacity-100">
                    View Products
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="mb-2 text-[10px] font-bold uppercase tracking-widest text-primary">
                    {sub.tag}
                  </span>
                  <h3 className="text-lg font-bold leading-snug text-text transition-colors group-hover:text-primary">
                    {sub.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-text/60">
                    {sub.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
