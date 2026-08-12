"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { CategorySummary } from "@/lib/categories";
import type { ProductVariantGroup } from "@/lib/product-variants";
import Container from "./Container";

function VariantCard({
  variant,
  categorySlug,
  productId,
}: {
  variant: ProductVariantGroup["variants"][number];
  categorySlug: string;
  productId: string;
}) {
  return (
    <Link
      href={`/category/${categorySlug}/${productId}/${variant.id}`}
      className="group flex flex-col transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative overflow-hidden rounded-xl border border-border/70 shadow-sm transition-shadow group-hover:border-primary/30 group-hover:shadow-lg">
        <div className="brand-gradient-bg flex min-h-[88px] items-center justify-center px-4 py-5 sm:min-h-[96px]">
          <p className="text-center text-sm font-bold uppercase leading-snug tracking-wide text-white sm:text-base">
            {variant.label}
          </p>
        </div>
      </div>

      <div className="mt-3 space-y-1 px-0.5">
        <p className="text-sm font-bold text-text">
          Product Code:{" "}
          <span className="font-semibold">{variant.code}</span>
        </p>
        <p className="text-sm text-text/80">{variant.description}</p>
        {variant.options ? (
          <p className="text-sm font-medium text-primary">{variant.options}</p>
        ) : null}
        <p className="text-sm font-medium text-accent">
          Production Time: {variant.productionTime}
        </p>
      </div>
    </Link>
  );
}

export default function ProductVariantsPage({
  category,
  categorySlug,
  productTitle,
  variantGroup,
}: {
  category: CategorySummary;
  categorySlug: string;
  productTitle: string;
  variantGroup: ProductVariantGroup;
}) {
  const pageTitle = `${variantGroup.title.toUpperCase()} (QTY. ${variantGroup.minQty.toUpperCase()})`;

  return (
    <section className="bg-section-mint pb-12 pt-6 sm:pb-16 sm:pt-8">
      <Container>
        <nav
          aria-label="Breadcrumb"
          className="mb-6 text-xs text-text/55 sm:text-sm"
        >
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="transition-colors hover:text-primary">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li>
              <Link
                href="/category"
                className="transition-colors hover:text-primary"
              >
                Category
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li>
              <Link
                href={`/category/${categorySlug}`}
                className="transition-colors hover:text-primary"
              >
                {category.title}
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li className="font-medium text-text">{productTitle}</li>
          </ol>
        </nav>

        <h1 className="brand-gradient-text text-xl font-bold uppercase tracking-wide sm:text-2xl lg:text-[1.65rem]">
          {pageTitle}
        </h1>

        <div className="section-heading-tricolor mx-auto mt-3 h-1 w-16 rounded-full sm:mx-0" />

        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3">
          {variantGroup.variants.map((variant) => (
            <VariantCard
              key={variant.id}
              variant={variant}
              categorySlug={categorySlug}
              productId={variantGroup.productId}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
