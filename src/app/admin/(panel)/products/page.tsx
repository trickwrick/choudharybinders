"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Pencil, Plus, RefreshCw, Trash2 } from "lucide-react";
import type { CategoryDoc } from "@/lib/types/cms";
import type { ProductDoc } from "@/lib/types/cms";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductDoc[]>([]);
  const [categories, setCategories] = useState<CategoryDoc[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [message, setMessage] = useState("");
  const [catalogTotal, setCatalogTotal] = useState<number | null>(null);

  const loadCategories = async () => {
    const response = await fetch("/api/admin/categories");
    const data = await response.json();
    setCategories(data.categories ?? []);
  };

  const loadProducts = async () => {
    setLoading(true);
    const url =
      filter === "all"
        ? "/api/admin/products"
        : `/api/admin/products?categoryId=${filter}`;
    const response = await fetch(url);
    const data = await response.json();
    setProducts(data.products ?? []);
    setCatalogTotal(
      typeof data.catalogTotal === "number" ? data.catalogTotal : null,
    );
    setLoading(false);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [filter]);

  const filteredCount = useMemo(() => products.length, [products]);

  const handleDelete = async (id?: string) => {
    if (!id || !confirm("Delete this product?")) return;
    await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" });
    loadProducts();
  };

  const handleSync = async () => {
    setSyncing(true);
    setMessage("");
    const response = await fetch("/api/admin/sync-products", { method: "POST" });
    const data = await response.json();
    setSyncing(false);

    if (!response.ok) {
      setMessage(data.error || "Sync failed.");
      return;
    }

    setMessage("Products synced from website catalog.");
    loadProducts();
  };

  const newProductHref =
    filter === "all" ? "/admin/products/new" : `/admin/products/new?category=${filter}`;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-text">Products</h2>
          <p className="mt-1 text-sm text-text/60">
            {loading
              ? "Loading products from catalog..."
              : catalogTotal != null
                ? `Showing ${filteredCount} products (website catalog has ${catalogTotal} products).`
                : `Add and manage products by category (${filteredCount} shown).`}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleSync}
            disabled={syncing}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-semibold text-text/70 hover:border-primary/30 hover:text-primary disabled:opacity-60"
          >
            <RefreshCw className={`h-4 w-4 ${syncing ? "animate-spin" : ""}`} />
            Sync Catalog
          </button>
          <Link
            href={newProductHref}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-primary-dark"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </Link>
        </div>
      </div>

      {message ? (
        <p className="rounded-xl bg-primary/10 px-4 py-3 text-sm font-medium text-primary">
          {message}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
            filter === "all"
              ? "bg-primary text-white"
              : "border border-border bg-white text-text/70"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => setFilter(category.id)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
              filter === category.id
                ? "bg-primary text-white"
                : "border border-border bg-white text-text/70"
            }`}
          >
            {category.title}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-sm text-text/60">Loading products...</p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border/70 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-light-bg text-left text-xs uppercase tracking-wide text-text/55">
                <tr>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Min Qty</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={String(product._id)} className="border-t border-border/60">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-light-bg">
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-text">{product.title}</p>
                          <p className="text-xs text-text/45">{product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-text/70">
                      {categories.find((item) => item.id === product.categoryId)?.title ??
                        product.categoryId}
                    </td>
                    <td className="px-4 py-3 text-text/70">
                      {product.price != null
                        ? `₹${product.price}${product.unit ? ` / ${product.unit}` : ""}`
                        : "On request"}
                    </td>
                    <td className="px-4 py-3 text-text/70">{product.minQty}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                          product.active
                            ? "bg-primary/10 text-primary"
                            : "bg-text/10 text-text/50"
                        }`}
                      >
                        {product.active ? "Active" : "Hidden"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/products/edit/${product._id}`}
                          className="rounded-lg border border-border p-2 text-text/60 hover:text-primary"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(String(product._id))}
                          className="rounded-lg border border-red-200 p-2 text-red-500 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
