"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { categories, type CategoryId } from "@/lib/categories";
import type { ProductDoc } from "@/lib/types/cms";

const emptyProduct: Partial<ProductDoc> = {
  id: "",
  categoryId: "offset",
  title: "",
  image: "",
  images: [],
  minQty: "1 Piece",
  price: undefined,
  unit: "",
  description: "",
  specifications: [],
  active: true,
  order: 0,
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductDoc[]>([]);
  const [filter, setFilter] = useState<CategoryId | "all">("all");
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<ProductDoc> | null>(null);
  const [saving, setSaving] = useState(false);

  const loadProducts = async () => {
    setLoading(true);
    const url =
      filter === "all"
        ? "/api/admin/products"
        : `/api/admin/products?categoryId=${filter}`;
    const response = await fetch(url);
    const data = await response.json();
    setProducts(data.products ?? []);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, [filter]);

  const filteredCount = useMemo(() => products.length, [products]);

  const handleSave = async () => {
    if (!editing?.id || !editing.title || !editing.image || !editing.categoryId) return;
    setSaving(true);

    const method = editing._id ? "PUT" : "POST";
    await fetch("/api/admin/products", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...editing,
        images: editing.images?.length ? editing.images : [editing.image],
      }),
    });

    setSaving(false);
    setEditing(null);
    loadProducts();
  };

  const handleDelete = async (id?: string) => {
    if (!id || !confirm("Delete this product?")) return;
    await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" });
    loadProducts();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-text">Products</h2>
          <p className="mt-1 text-sm text-text/60">
            Add and manage products by category ({filteredCount} shown).
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            setEditing({
              ...emptyProduct,
              categoryId: filter === "all" ? "offset" : filter,
            })
          }
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-primary-dark"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
            filter === "all" ? "bg-primary text-white" : "bg-white text-text/70 border border-border"
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
                : "bg-white text-text/70 border border-border"
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
                          <Image src={product.image} alt={product.title} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-semibold text-text">{product.title}</p>
                          <p className="text-xs text-text/45">{product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 capitalize text-text/70">
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
                        <button
                          type="button"
                          onClick={() => setEditing(product)}
                          className="rounded-lg border border-border p-2 text-text/60 hover:text-primary"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
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

      {editing ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-text">
              {editing._id ? "Edit Product" : "Add Product"}
            </h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="mb-1 block text-sm font-semibold text-text">Category</span>
                <select
                  value={editing.categoryId}
                  onChange={(event) =>
                    setEditing({
                      ...editing,
                      categoryId: event.target.value as CategoryId,
                    })
                  }
                  className="w-full rounded-xl border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </label>
              {[
                ["Product Slug (URL)", "id"],
                ["Title", "title"],
                ["Image URL", "image"],
                ["Min. Quantity", "minQty"],
                ["Price (optional)", "price"],
                ["Unit (e.g. Sq.ft)", "unit"],
                ["Sort Order", "order"],
              ].map(([label, key]) => (
                <label key={key} className="block">
                  <span className="mb-1 block text-sm font-semibold text-text">{label}</span>
                  <input
                    type={key === "price" || key === "order" ? "number" : "text"}
                    value={String(editing[key as keyof ProductDoc] ?? "")}
                    onChange={(event) =>
                      setEditing({
                        ...editing,
                        [key]:
                          key === "price" || key === "order"
                            ? event.target.value
                              ? Number(event.target.value)
                              : undefined
                            : event.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
                  />
                </label>
              ))}
              <label className="block sm:col-span-2">
                <span className="mb-1 block text-sm font-semibold text-text">Description</span>
                <textarea
                  rows={4}
                  value={editing.description ?? ""}
                  onChange={(event) =>
                    setEditing({ ...editing, description: event.target.value })
                  }
                  className="w-full rounded-xl border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
                />
              </label>
              <label className="flex items-center gap-2 text-sm font-medium text-text sm:col-span-2">
                <input
                  type="checkbox"
                  checked={editing.active !== false}
                  onChange={(event) =>
                    setEditing({ ...editing, active: event.target.checked })
                  }
                />
                Show on website
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="rounded-xl border border-border px-4 py-2 text-sm font-semibold text-text/70"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Product"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
