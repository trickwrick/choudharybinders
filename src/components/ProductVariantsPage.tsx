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
      className="group flex flex-col transition-transform duration-300 hover:-translate-y-0.5"
    >
      <div className="relative overflow-hidden rounded-lg border border-white/60 shadow-md transition-shadow group-hover:shadow-lg">
        <div className="brand-gradient-bg relative flex aspect-[1.75/1] items-center justify-center px-2.5 py-3">
          <div className="absolute inset-[6px] rounded border border-white/35 bg-white/10" />
          <p className="relative z-[1] px-1 text-center text-[10px] font-bold uppercase leading-tight tracking-wide text-white sm:text-[11px]">
            {variant.label}
          </p>
        </div>
      </div>

      <div className="mt-2 space-y-0.5 px-0.5">
        <p className="text-[11px] font-bold text-text sm:text-xs">
          Code: <span className="font-semibold">{variant.code}</span>
        </p>
        <p className="line-clamp-2 text-[10px] leading-snug text-text/75 sm:text-[11px]">
          {variant.description}
        </p>
        {variant.options ? (
          <p className="text-[10px] font-medium leading-snug text-primary sm:text-[11px]">
            {variant.options}
          </p>
        ) : null}
        <p className="text-[10px] font-medium text-accent sm:text-[11px]">
          {variant.productionTime}
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
    <section className="bg-section-mint pb-10 pt-6 sm:pb-12 sm:pt-8">
      <Container>
        <nav
          aria-label="Breadcrumb"
          className="mb-5 text-xs text-text/55 sm:text-sm"
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

        <h1 className="brand-gradient-text text-lg font-bold uppercase tracking-wide sm:text-xl lg:text-2xl">
          {pageTitle}
        </h1>

        <div className="section-heading-tricolor mx-auto mt-2 h-1 w-14 rounded-full sm:mx-0" />

        <div className="mx-auto mt-6 grid max-w-5xl grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-4 sm:gap-x-4 sm:gap-y-6">
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
