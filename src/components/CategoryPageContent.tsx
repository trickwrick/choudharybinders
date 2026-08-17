"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { fadeUp } from "@/lib/animations";
import { getCategoryIcon } from "@/lib/category-icons";
import type { CategoryProduct } from "@/lib/category-products";
import type { PublicCategory } from "@/lib/types/public-catalog";
import Button from "./Button";
import Container from "./Container";
import SectionHeading from "./SectionHeading";

type CategoryFilter = "all" | string;

const IMAGE_FALLBACK = "/categories/flex-printing.jpg";

type CategoryPageContentProps = {
  categories: PublicCategory[];
  productsByCategory: Record<string, CategoryProduct[]>;
};

function ProductCard({
  product,
  categoryId,
}: {
  product: CategoryProduct;
  categoryId: string;
}) {
  const [imgSrc, setImgSrc] = useState<string>(product.image);

  return (
    <Link
      href={`/category/${categoryId}/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-white shadow-sm transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
        <Image
          src={imgSrc}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          onError={() => {
            if (imgSrc !== IMAGE_FALLBACK) setImgSrc(IMAGE_FALLBACK);
          }}
        />
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold text-primary opacity-0 shadow-sm transition-opacity group-hover:opacity-100 sm:text-xs">
          View Details
          <ArrowRight className="h-3 w-3" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-sm font-bold leading-snug text-text transition-colors group-hover:text-primary sm:text-base">
          {product.title}
        </h3>
        <p className="mt-1.5 text-xs text-text/55 sm:text-sm">
          Min. Qty: {product.minQty}
        </p>
      </div>
    </Link>
  );
}

function CategoryProductsGroup({
  category,
  products,
}: {
  category: PublicCategory;
  products: CategoryProduct[];
}) {
  const Icon = getCategoryIcon(category.iconKey);

  return (
    <section id={category.id} className="scroll-mt-32">
      <div className="mb-5 flex flex-col gap-3 border-b border-border/60 pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary sm:text-xs">
            <Icon className="h-3 w-3" />
            {category.tag}
          </span>
          <h2 className="mt-2 text-xl font-bold text-text sm:text-2xl">
            {category.title}
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-text/60">
            {category.description}
          </p>
        </div>
        <Link
          href={`/category/${category.id}`}
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
        >
          View All {products.length} Products
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            categoryId={category.id}
          />
        ))}
      </div>
    </section>
  );
}

export default function CategoryPageContent({
  categories,
  productsByCategory,
}: CategoryPageContentProps) {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");

  const filters = useMemo(
    () => [
      { id: "all" as const, label: "All Categories" },
      ...categories.map((item) => ({ id: item.id, label: item.title })),
    ],
    [categories],
  );

  const totalProductCount = useMemo(
    () =>
      Object.values(productsByCategory).reduce(
        (sum, items) => sum + items.length,
        0,
      ),
    [productsByCategory],
  );

  const activeCategory =
    activeFilter === "all"
      ? null
      : (categories.find((item) => item.id === activeFilter) ?? null);

  const activeProducts =
    activeFilter === "all" ? [] : (productsByCategory[activeFilter] ?? []);

  const visibleProductCount =
    activeFilter === "all" ? totalProductCount : activeProducts.length;

  return (
    <section className="bg-section-warm py-12 sm:py-16 lg:py-20">
      <Container>
        <SectionHeading spaced>Category</SectionHeading>

        <div className="mb-8 rounded-2xl border border-border/60 bg-white px-3 py-3 shadow-sm sm:mb-10 sm:px-4">
          <p className="mb-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-text/45">
            Filter by Category
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors sm:px-5 sm:text-sm ${
                  activeFilter === filter.id
                    ? "bg-primary text-white shadow-md shadow-primary/25"
                    : "border border-border bg-white text-text/70 hover:border-primary/30 hover:text-primary"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={activeFilter}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeFilter === "all" ? (
            <div className="space-y-12 sm:space-y-14">
              {categories.map((category) => (
                <CategoryProductsGroup
                  key={category.id}
                  category={category}
                  products={productsByCategory[category.id] ?? []}
                />
              ))}
            </div>
          ) : activeCategory ? (
            <>
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary sm:text-xs">
                    {activeCategory.tag}
                  </span>
                  <h2 className="mt-2 text-2xl font-bold text-text sm:text-3xl">
                    {activeCategory.title}
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm text-text/60 sm:text-base">
                    {activeCategory.description}
                  </p>
                </div>
                <Link
                  href={`/category/${activeCategory.id}`}
                  className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  Open Full Page
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {activeProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    categoryId={activeFilter}
                  />
                ))}
              </div>
            </>
          ) : null}
        </motion.div>

        <p className="mt-8 text-center text-sm text-text/50">
          {activeFilter === "all"
            ? `Showing all ${categories.length} categories with ${visibleProductCount} products`
            : activeCategory
              ? `Showing ${visibleProductCount} products in ${activeCategory.title}`
              : null}
        </p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-primary/15 bg-gradient-to-r from-white via-white to-primary/5 px-6 py-6 sm:mt-12 sm:flex-row sm:px-8 sm:py-7"
        >
          <div className="text-center sm:text-left">
            <p className="text-lg font-bold text-text sm:text-xl">
              Need a custom print or branding solution?
            </p>
            <p className="mt-1 text-sm text-text/60">
              Share your requirement — we&apos;ll quote within 24 hours.
            </p>
          </div>
          <Button href="/contact" size="lg" className="shrink-0">
            Get Free Quote
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
