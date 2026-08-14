"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Pencil, Plus, RefreshCw, Trash2 } from "lucide-react";
import type { CategoryDoc } from "@/lib/types/cms";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [message, setMessage] = useState("");

  const loadCategories = async () => {
    setLoading(true);
    const response = await fetch("/api/admin/categories");
    const data = await response.json();
    setCategories(data.categories ?? []);
    setLoading(false);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleDelete = async (id?: string) => {
    if (!id || !confirm("Delete this category?")) return;
    await fetch(`/api/admin/categories?id=${id}`, { method: "DELETE" });
    loadCategories();
  };

  const handleSync = async () => {
    setSyncing(true);
    setMessage("");
    const response = await fetch("/api/admin/sync-categories", { method: "POST" });
    const data = await response.json();
    setSyncing(false);

    if (!response.ok) {
      setMessage(data.error || "Sync failed.");
      return;
    }

    setMessage("Categories synced from website catalog.");
    loadCategories();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-text">Categories</h2>
          <p className="mt-1 text-sm text-text/60">
            Manage product categories — cover image, title, tag, and order.
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
            href={`/admin/categories/new?order=${categories.length}`}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-primary-dark"
          >
            <Plus className="h-4 w-4" />
            Add Category
          </Link>
        </div>
      </div>

      {message ? (
        <p className="rounded-xl bg-primary/10 px-4 py-3 text-sm font-medium text-primary">
          {message}
        </p>
      ) : null}

      {loading ? (
        <p className="text-sm text-text/60">Loading categories...</p>
      ) : categories.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-white px-6 py-10 text-center">
          <p className="text-sm text-text/60">No categories yet.</p>
          <button
            type="button"
            onClick={handleSync}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white"
          >
            <RefreshCw className="h-4 w-4" />
            Import from Catalog
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <article
              key={String(category._id)}
              className="overflow-hidden rounded-2xl border border-border/70 bg-white shadow-sm"
            >
              <div className="relative h-44 bg-light-bg">
                {category.image ? (
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover"
                  />
                ) : null}
                {!category.active ? (
                  <span className="absolute left-3 top-3 rounded-full bg-black/70 px-2 py-1 text-[10px] font-bold uppercase text-white">
                    Hidden
                  </span>
                ) : null}
              </div>
              <div className="p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  {category.tag || "Category"} · Order {category.order}
                </p>
                <h3 className="mt-1 text-lg font-bold text-text">{category.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-text/60">{category.description}</p>
                <p className="mt-2 text-xs font-medium text-text/45">/{category.id}</p>
                <div className="mt-4 flex gap-2">
                  <Link
                    href={`/admin/categories/edit/${category._id}`}
                    className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-text/70 hover:border-primary/30 hover:text-primary"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(String(category._id))}
                    className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
