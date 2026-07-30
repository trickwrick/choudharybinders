"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  ChevronRight,
  Grid2X2,
  Heart,
  LayoutList,
  Package,
  SlidersHorizontal,
  X,
} from "lucide-react";
import type { CategorySummary } from "@/lib/categories";
import type { CategoryProduct } from "@/lib/category-products";
import { formatProductPrice } from "@/lib/product-details";
import Button from "./Button";
import Container from "./Container";

type SortOption = "popularity" | "price-asc" | "price-desc" | "name";
type ViewMode = "grid" | "list";
type PriceFilter = "all" | "priced" | "quote";

const sortOptions: { id: SortOption; label: string }[] = [
  { id: "popularity", label: "Popularity" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "name", label: "Name A-Z" },
];

const priceFilters: { id: PriceFilter; label: string }[] = [
  { id: "all", label: "All Products" },
  { id: "priced", label: "With Price" },
  { id: "quote", label: "Price on Request" },
];

function ProductCard({
  product,
  viewMode,
  categorySlug,
}: {
  product: CategoryProduct;
  viewMode: ViewMode;
  categorySlug: string;
}) {
  const href = `/category/${categorySlug}/${product.id}`;
  const hasPrice = product.price != null;
  const priceLabel = hasPrice
    ? formatProductPrice(product.price!, product.unit)
    : null;

  if (viewMode === "list") {
    return (
      <Link
        href={href}
        className="group flex gap-4 rounded-2xl border border-border/70 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-lg sm:gap-5 sm:p-4"
      >
        <div className="relative h-28 w-36 shrink-0 overflow-hidden rounded-xl bg-light-bg sm:h-36 sm:w-48">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="192px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <button
            type="button"
            aria-label="Add to wishlist"
            onClick={(event) => event.preventDefault()}
            className="absolute right-2 top-2 rounded-full bg-white/95 p-1.5 text-text/45 shadow-sm transition-colors hover:text-primary"
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3 className="text-base font-bold text-text transition-colors group-hover:text-primary sm:text-lg">
              {product.title}
            </h3>
            {!hasPrice ? (
              <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent">
                Get Quote
              </span>
            ) : null}
          </div>
          <p className="mt-1.5 text-sm text-text/55">Min. Qty: {product.minQty}</p>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            {priceLabel ? (
              <p className="text-lg font-bold text-primary">{priceLabel}</p>
            ) : (
              <p className="text-sm font-medium text-text/50">Contact for pricing</p>
            )}
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
              View Details
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-light-bg">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-primary opacity-0 shadow-sm transition-all duration-300 group-hover:opacity-100">
          View Details
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
        <button
          type="button"
          aria-label="Add to wishlist"
          onClick={(event) => event.preventDefault()}
          className="absolute right-3 top-3 rounded-full bg-white/95 p-2 text-text/45 shadow-sm transition-colors hover:text-primary"
        >
          <Heart className="h-4 w-4" />
        </button>
        {!hasPrice ? (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
            Get Quote
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="line-clamp-2 text-base font-bold leading-snug text-text transition-colors group-hover:text-primary">
          {product.title}
        </h3>
        <p className="mt-2 text-sm text-text/55">Min. Qty: {product.minQty}</p>
        <div className="mt-auto pt-3">
          {priceLabel ? (
            <p className="text-lg font-bold text-primary">{priceLabel}</p>
          ) : (
            <p className="text-sm font-semibold text-text/45">Price on request</p>
          )}
        </div>
      </div>
    </Link>
  );
}

function FilterPanel({
  priceFilter,
  onPriceFilterChange,
  onClear,
  activeFilterCount,
}: {
  priceFilter: PriceFilter;
  onPriceFilterChange: (value: PriceFilter) => void;
  onClear: () => void;
  activeFilterCount: number;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-text/70">
          Filters
        </h2>
        {activeFilterCount > 0 ? (
          <button
            type="button"
            onClick={onClear}
            className="text-xs font-semibold text-primary hover:underline"
          >
            Clear all
          </button>
        ) : null}
      </div>

      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-text/50">
          Pricing
        </p>
        <div className="space-y-2">
          {priceFilters.map((filter) => (
            <label
              key={filter.id}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition-colors ${
                priceFilter === filter.id
                  ? "border-primary/30 bg-primary/5 font-semibold text-primary"
                  : "border-border/70 text-text/70 hover:border-primary/20 hover:bg-light-bg"
              }`}
            >
              <input
                type="radio"
                name="price-filter"
                value={filter.id}
                checked={priceFilter === filter.id}
                onChange={() => onPriceFilterChange(filter.id)}
                className="h-4 w-4 accent-primary"
              />
              {filter.label}
            </label>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-primary/15 bg-section-mint p-4">
        <p className="text-sm font-bold text-text">Need something custom?</p>
        <p className="mt-1 text-xs leading-relaxed text-text/60">
          Share your size, quantity, and design — we&apos;ll quote within 24 hours.
        </p>
        <Link
          href="/#contact"
          className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
        >
          Request a Quote
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}

export default function CategoryProductsPage({
  category,
  products,
}: {
  category: CategorySummary;
  products: CategoryProduct[];
}) {
  const [sortBy, setSortBy] = useState<SortOption>("popularity");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("all");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let items = [...products];

    if (priceFilter === "priced") {
      items = items.filter((product) => product.price != null);
    } else if (priceFilter === "quote") {
      items = items.filter((product) => product.price == null);
    }

    switch (sortBy) {
      case "price-asc":
        return items.sort(
          (a, b) =>
            (a.price ?? Number.MAX_SAFE_INTEGER) -
            (b.price ?? Number.MAX_SAFE_INTEGER),
        );
      case "price-desc":
        return items.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
      case "name":
        return items.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return items;
    }
  }, [products, priceFilter, sortBy]);

  const activeFilterCount = priceFilter === "all" ? 0 : 1;
  const total = filteredProducts.length;
  const showingFrom = total > 0 ? 1 : 0;
  const showingTo = total;

  const clearFilters = () => {
    setPriceFilter("all");
    setMobileFiltersOpen(false);
  };

  return (
    <section className="bg-section-mint pb-10 pt-0 sm:pb-12">
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
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/65 to-black/45" />
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
                <Link href="/#category" className="transition-colors hover:text-white">
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
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-sm">
              <Package className="h-4 w-4" />
              {products.length} products available
            </div>
          </div>
        </Container>
      </div>

      <Container className="mt-6 sm:mt-8">
        <div className="overflow-hidden rounded-2xl border border-border/70 bg-white shadow-sm">
          <div className="flex flex-col lg:flex-row">
            <aside className="hidden border-r border-border/70 px-5 py-6 lg:block lg:w-60 xl:w-64">
              <FilterPanel
                priceFilter={priceFilter}
                onPriceFilterChange={setPriceFilter}
                onClear={clearFilters}
                activeFilterCount={activeFilterCount}
              />
            </aside>

            <div className="min-w-0 flex-1 p-4 sm:p-5 lg:p-6">
              <div className="mb-5 flex flex-col gap-4 border-b border-border/60 pb-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-sm text-text/65">
                    Showing{" "}
                    <span className="font-semibold text-text">
                      {showingFrom}-{showingTo}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-text">{total}</span> items
                  </p>
                  {activeFilterCount > 0 ? (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary"
                    >
                      {priceFilters.find((item) => item.id === priceFilter)?.label}
                      <X className="h-3 w-3" />
                    </button>
                  ) : null}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(true)}
                    className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-text/70 transition-colors hover:border-primary/30 hover:text-primary lg:hidden"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                    {activeFilterCount > 0 ? (
                      <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-white">
                        {activeFilterCount}
                      </span>
                    ) : null}
                  </button>

                  <label className="flex items-center gap-2 text-sm text-text/70">
                    Sort By
                    <select
                      value={sortBy}
                      onChange={(event) =>
                        setSortBy(event.target.value as SortOption)
                      }
                      className="rounded-lg border border-border bg-white px-3 py-2 text-sm text-text outline-none transition-colors focus:border-primary"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <div className="flex items-center rounded-lg border border-border p-0.5">
                    <button
                      type="button"
                      aria-label="Grid view"
                      aria-pressed={viewMode === "grid"}
                      onClick={() => setViewMode("grid")}
                      className={`rounded-md p-2 transition-colors ${
                        viewMode === "grid"
                          ? "bg-primary text-white"
                          : "text-text/50 hover:text-text"
                      }`}
                    >
                      <Grid2X2 className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      aria-label="List view"
                      aria-pressed={viewMode === "list"}
                      onClick={() => setViewMode("list")}
                      className={`rounded-md p-2 transition-colors ${
                        viewMode === "list"
                          ? "bg-primary text-white"
                          : "text-text/50 hover:text-text"
                      }`}
                    >
                      <LayoutList className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {filteredProducts.length > 0 ? (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
                      : "flex flex-col gap-4"
                  }
                >
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      viewMode={viewMode}
                      categorySlug={category.id}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-border px-6 py-14 text-center">
                  <p className="text-lg font-bold text-text">No products match your filters</p>
                  <p className="mt-2 text-sm text-text/60">
                    Try changing filters or contact us for a custom {category.title.toLowerCase()} order.
                  </p>
                  <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="rounded-xl border border-border px-4 py-2 text-sm font-semibold text-text/70 transition-colors hover:border-primary/30 hover:text-primary"
                    >
                      Clear Filters
                    </button>
                    <Button href="/#contact" size="sm">
                      Request a Quote
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-primary/15 bg-white px-6 py-6 sm:flex-row sm:px-8">
          <div className="text-center sm:text-left">
            <p className="text-lg font-bold text-text">
              Can&apos;t find the exact product you need?
            </p>
            <p className="mt-1 text-sm text-text/60">
              We manufacture custom sizes, materials, and finishes for bulk orders across Jaipur.
            </p>
          </div>
          <Button href="/#contact" size="lg" className="shrink-0">
            Get Custom Quote
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Container>

      {mobileFiltersOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setMobileFiltersOpen(false)}
            className="absolute inset-0 bg-black/45"
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto rounded-t-3xl bg-white p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-text">Filters</h3>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="rounded-full p-2 text-text/50 hover:bg-light-bg hover:text-text"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <FilterPanel
              priceFilter={priceFilter}
              onPriceFilterChange={(value) => {
                setPriceFilter(value);
                setMobileFiltersOpen(false);
              }}
              onClear={clearFilters}
              activeFilterCount={activeFilterCount}
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
