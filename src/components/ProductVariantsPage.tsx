"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { CategorySummary } from "@/lib/categories";
import type {
  ProductVariantGroup,
  ProductVariantSection,
  VariantSectionTone,
} from "@/lib/product-variants";
import Container from "./Container";
import WhatsAppButton from "./WhatsAppButton";

function VariantCard({
  variant,
  categorySlug,
  productId,
  tone,
}: {
  variant: ProductVariantGroup["variants"][number];
  categorySlug: string;
  productId: string;
  tone: VariantSectionTone;
}) {
  return (
    <Link
      href={`/category/${categorySlug}/${productId}/${variant.id}`}
      className="group flex flex-col transition-transform duration-300 hover:-translate-y-0.5"
    >
      <div className="relative overflow-hidden rounded-xl border border-border/50 shadow-sm transition-shadow group-hover:shadow-md">
        <div
          className={`variant-card-surface ${tone} relative flex aspect-[1.75/1] items-center justify-center px-2.5 py-3`}
        >
          <div className="absolute inset-[5px] rounded-md border border-white/50" />
          <p className="relative z-[1] px-1 text-center text-[10px] font-bold uppercase leading-tight tracking-wide sm:text-[11px]">
            {variant.label}
          </p>
        </div>
      </div>

      <div className="mt-2 space-y-0.5 px-0.5 text-center sm:text-left">
        <p className="text-[11px] font-bold text-[#1d4ed8] sm:text-xs">{variant.name}</p>
        <p className="text-[10px] text-text/70 sm:text-[11px]">
          Product Code: <span className="font-semibold">{variant.code}</span>
        </p>
        {variant.options ? (
          <p className="text-[10px] font-medium leading-snug text-accent sm:text-[11px]">
            {variant.options}
          </p>
        ) : null}
        <p className="text-[10px] font-medium text-text/65 sm:text-[11px]">
          {variant.productionTime}
        </p>
      </div>
    </Link>
  );
}

function VariantSectionBlock({
  section,
  categorySlug,
  productId,
}: {
  section: ProductVariantSection;
  categorySlug: string;
  productId: string;
}) {
  return (
    <section className="space-y-4">
      <h2 className="variant-section-title text-lg font-bold uppercase tracking-wide text-text sm:text-xl">
        {section.title}
      </h2>

      <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 sm:gap-x-4 sm:gap-y-6">
        {section.variants.map((variant) => (
          <VariantCard
            key={variant.id}
            variant={variant}
            categorySlug={categorySlug}
            productId={productId}
            tone={section.tone}
          />
        ))}
      </div>
    </section>
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
  const whatsappMessage = `Hello, I would like the best price for ${productTitle} from Choudhary Binders & Printers.`;

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

        <h1 className="variant-page-title text-lg font-bold uppercase tracking-wide sm:text-xl lg:text-2xl">
          {productTitle}
        </h1>

        <div className="section-heading-tricolor mx-auto mt-2 h-1 w-14 rounded-full opacity-80 sm:mx-0" />

        <div className="mx-auto mt-8 max-w-6xl space-y-10 sm:space-y-12">
          {variantGroup.sections.map((section) => (
            <VariantSectionBlock
              key={section.id}
              section={section}
              categorySlug={categorySlug}
              productId={variantGroup.productId}
            />
          ))}
        </div>

        <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-3 sm:flex-row sm:justify-center">
          <WhatsAppButton message={whatsappMessage} size="lg" className="sm:min-w-[200px]" />
        </div>
      </Container>
    </section>
  );
}
