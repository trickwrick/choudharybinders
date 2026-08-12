"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight, Clock } from "lucide-react";
import type { CategorySummary } from "@/lib/categories";
import type { ProductVariant, ProductVariantGroup } from "@/lib/product-variants";
import Button from "./Button";
import Container from "./Container";

export default function ProductVariantDetailPage({
  category,
  categorySlug,
  productTitle,
  variantGroup,
  variant,
}: {
  category: CategorySummary;
  categorySlug: string;
  productTitle: string;
  variantGroup: ProductVariantGroup;
  variant: ProductVariant;
}) {
  return (
    <section className="bg-section-warm pb-12 pt-6 sm:pb-16 sm:pt-8">
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
            <li>
              <Link
                href={`/category/${categorySlug}/${variantGroup.productId}`}
                className="transition-colors hover:text-primary"
              >
                {productTitle}
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li className="line-clamp-1 font-medium text-text">{variant.label}</li>
          </ol>
        </nav>

        <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-border/70 bg-white shadow-sm">
          <div className="brand-gradient-bg flex min-h-[120px] items-center justify-center px-6 py-8">
            <p className="text-center text-lg font-bold uppercase tracking-wide text-white sm:text-xl">
              {variant.label}
            </p>
          </div>

          <div className="space-y-4 p-6 sm:p-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-text/45">
                Product Code
              </p>
              <p className="mt-1 text-lg font-bold text-text">{variant.code}</p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-text/45">
                Description
              </p>
              <p className="mt-1 text-base text-text/80">{variant.description}</p>
            </div>

            {variant.options ? (
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-text/45">
                  Options
                </p>
                <p className="mt-1 text-base font-medium text-primary">
                  {variant.options}
                </p>
              </div>
            ) : null}

            <div className="flex items-center gap-2 text-accent">
              <Clock className="h-4 w-4 shrink-0" />
              <p className="text-base font-medium">
                Production Time: {variant.productionTime}
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-text/45">
                Minimum Quantity
              </p>
              <p className="mt-1 text-base text-text/80">{variantGroup.minQty}</p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button href="/contact" size="lg">
                Get Best Price
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                href={`/category/${categorySlug}/${variantGroup.productId}`}
                variant="outline"
                size="lg"
              >
                View All Options
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
