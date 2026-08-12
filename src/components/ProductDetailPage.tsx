"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Clock,
  MessageCircle,
  Share2,
  Star,
} from "lucide-react";
import type { CategorySummary } from "@/lib/categories";
import type { CategoryProduct } from "@/lib/category-products";
import {
  formatProductPrice,
  type ProductDetail,
} from "@/lib/product-details";
import { businessInfo } from "@/lib/site-business";
import Button from "./Button";
import Container from "./Container";
import ProductQuoteModal, {
  type ProductQuoteInfo,
} from "./ProductQuoteModal";

function RelatedProductCard({
  product,
  categorySlug,
}: {
  product: CategoryProduct;
  categorySlug: string;
}) {
  return (
    <article className="flex min-w-[220px] max-w-[240px] shrink-0 flex-col overflow-hidden rounded-xl border border-border/70 bg-white shadow-sm">
      <Link
        href={`/category/${categorySlug}/${product.id}`}
        className="relative aspect-square overflow-hidden bg-light-bg"
      >
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="240px"
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-3">
        <Link
          href={`/category/${categorySlug}/${product.id}`}
          className="line-clamp-2 text-sm font-bold text-text hover:text-primary"
        >
          {product.title}
        </Link>
        <p className="mt-1 text-xs text-text/55">{businessInfo.name}</p>
        {product.price != null ? (
          <p className="mt-2 text-sm font-bold text-primary">
            {formatProductPrice(product.price, product.unit)}
          </p>
        ) : (
          <p className="mt-2 text-xs text-text/60">Min. Qty: {product.minQty}</p>
        )}
        <div className="mt-3 flex flex-col gap-2">
          <a
            href={businessInfo.phoneTel}
            className="inline-flex items-center justify-center rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            Call Now
          </a>
          <Link
            href={`/category/${categorySlug}/${product.id}`}
            className="inline-flex items-center justify-center rounded-lg border border-[#2563eb] bg-[#2563eb] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1d4ed8]"
          >
            Get Best Price
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function ProductDetailPage({
  category,
  categorySlug,
  product,
  relatedProducts,
}: {
  category: CategorySummary;
  categorySlug: string;
  product: ProductDetail;
  relatedProducts: CategoryProduct[];
}) {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState(product.unit ?? "Sq.ft");
  const [quoteOpen, setQuoteOpen] = useState(false);

  const unitOptions = useMemo(() => {
    const options = new Set([product.unit ?? "Sq.ft", "Sq.ft", "Ft", "Piece", "Set"]);
    return Array.from(options);
  }, [product.unit]);

  const quoteProduct = useMemo<ProductQuoteInfo>(
    () => ({
      productId: product.id,
      productTitle: product.title,
      categoryId: categorySlug,
      image: product.image,
      quantity,
      unit,
      minQty: product.minQty,
    }),
    [
      categorySlug,
      product.id,
      product.image,
      product.minQty,
      product.title,
      quantity,
      unit,
    ],
  );

  const priceLabel =
    product.price != null
      ? formatProductPrice(product.price, product.unit)
      : "Price on request";

  return (
    <>
    <section className="bg-[#f3f4f6] py-6 sm:py-8 lg:py-10">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-4 text-xs text-text/55 sm:text-sm">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li>
              <Link href="/category" className="hover:text-primary">
                Category
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li>
              <Link
                href={`/category/${categorySlug}`}
                className="hover:text-primary"
              >
                {category.title}
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li className="line-clamp-1 font-medium text-text">{product.title}</li>
          </ol>
        </nav>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)_300px] xl:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_320px]">
          <div className="self-start rounded-xl border border-border/70 bg-white p-3 shadow-sm sm:p-4 lg:sticky lg:top-28">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-light-bg">
              <Image
                src={product.images[activeImage] ?? product.image}
                alt={product.title}
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover"
                priority
              />
            </div>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {product.images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-md border-2 transition-colors sm:h-20 sm:w-20 ${
                    activeImage === index
                      ? "border-[#2563eb]"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.title} view ${index + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border border-border/70 bg-white p-4 shadow-sm sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <h1 className="text-xl font-bold text-text sm:text-2xl">
                  {product.title}
                </h1>
                <button
                  type="button"
                  aria-label="Share product"
                  className="rounded-lg p-2 text-text/45 transition-colors hover:bg-light-bg hover:text-text"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>

              <p className="mt-3 text-2xl font-bold text-text">{priceLabel}</p>
              <p className="mt-1 text-sm text-text/60">
                Min. Qty: {product.minQty}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(event) =>
                    setQuantity(Math.max(1, Number(event.target.value) || 1))
                  }
                  className="h-10 w-20 rounded-lg border border-border px-3 text-sm outline-none focus:border-primary"
                  aria-label="Quantity"
                />
                <select
                  value={unit}
                  onChange={(event) => setUnit(event.target.value)}
                  className="h-10 rounded-lg border border-border px-3 text-sm outline-none focus:border-primary"
                  aria-label="Unit"
                >
                  {unitOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <Button
                  type="button"
                  size="sm"
                  className="min-w-[120px]"
                  onClick={() => setQuoteOpen(true)}
                >
                  Get Quote
                </Button>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-border/70 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-border/70 px-4 py-3 sm:px-5">
                <h2 className="text-base font-bold text-text">Specification</h2>
                <button
                  type="button"
                  className="text-xs font-semibold text-[#2563eb] hover:underline"
                >
                  View Details
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[320px] text-sm">
                  <tbody>
                    {product.specifications.map((spec, index) => (
                      <tr
                        key={spec.label}
                        className={index % 2 === 0 ? "bg-[#f8fafc]" : "bg-white"}
                      >
                        <th className="w-[38%] px-4 py-3 text-left font-semibold text-text/75 sm:px-5">
                          {spec.label}
                        </th>
                        <td className="px-4 py-3 text-text/80 sm:px-5">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-xl border border-border/70 bg-white p-4 shadow-sm sm:p-5">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-base font-bold text-text">Description</h2>
                <button
                  type="button"
                  className="text-xs font-semibold text-[#2563eb] hover:underline"
                >
                  View Details
                </button>
              </div>
              <p className="text-sm leading-relaxed text-text/70">
                {product.description}
              </p>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-xl border border-border/70 bg-white shadow-sm">
              <div className="border-b border-border/70 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-text/50">
                  Seller Information
                </p>
              </div>

              <div className="p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-border bg-white">
                    <Image
                      src={businessInfo.logo}
                      alt={businessInfo.name}
                      fill
                      sizes="56px"
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-text">
                      {businessInfo.name}
                    </h3>
                    <p className="mt-0.5 text-xs text-text/60">
                      {businessInfo.countryCode} | {businessInfo.location}
                    </p>
                    <span className="mt-2 inline-flex rounded bg-text px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                      {businessInfo.tagline}
                    </span>
                  </div>
                </div>

                <div className="mt-4 space-y-2 border-t border-border/60 pt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-[#22c55e] text-[#22c55e]" />
                    <span className="font-bold text-text">{businessInfo.rating}</span>
                    <span className="text-text/55">
                      ({businessInfo.ratingCount} Ratings)
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-text/70">
                    <BadgeCheck className="h-4 w-4 text-[#22c55e]" />
                    Verified
                  </div>
                  <p className="text-text/70">
                    {businessInfo.yearsInBusiness} Years in Business
                  </p>
                  <div className="flex items-center gap-2 text-text/70">
                    <Clock className="h-4 w-4" />
                    Responds in {businessInfo.responseTime}
                  </div>
                  <p className="text-text/70">{businessInfo.enquiries} enquiries</p>
                </div>

                <div className="mt-4 space-y-2.5">
                  <Button
                    type="button"
                    className="w-full justify-center"
                    onClick={() => setQuoteOpen(true)}
                  >
                    Get Best Price
                  </Button>
                  <a
                    href={businessInfo.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-lg border border-[#25D366] px-4 py-3 text-sm font-bold text-[#25D366] transition-colors hover:bg-[#25D366]/5"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {relatedProducts.length > 0 ? (
          <div className="mt-8 rounded-xl border border-border/70 bg-white p-4 shadow-sm sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-text">Customers Also Viewed</h2>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  aria-label="Previous products"
                  className="rounded-lg border border-border p-2 text-text/50 hover:text-text"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next products"
                  className="rounded-lg border border-border p-2 text-text/50 hover:text-text"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {relatedProducts.map((item) => (
                <RelatedProductCard
                  key={item.id}
                  product={item}
                  categorySlug={categorySlug}
                />
              ))}
            </div>
          </div>
        ) : null}
      </Container>
    </section>

    <ProductQuoteModal
      open={quoteOpen}
      onClose={() => setQuoteOpen(false)}
      product={quoteProduct}
    />
    </>
  );
}
