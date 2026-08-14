"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { CATEGORY_ICON_OPTIONS } from "@/lib/category-icons";
import type { CategoryDoc } from "@/lib/types/cms";

const emptyCategory: Partial<CategoryDoc> = {
  id: "",
  title: "",
  description: "",
  image: "",
  tag: "",
  icon: "Sparkles",
  order: 0,
  active: true,
};

export default function CategoryForm({
  initialCategory,
  defaultOrder = 0,
}: {
  initialCategory?: Partial<CategoryDoc>;
  defaultOrder?: number;
}) {
  const router = useRouter();
  const isEdit = Boolean(initialCategory?._id);
  const [category, setCategory] = useState<Partial<CategoryDoc>>(
    initialCategory ?? { ...emptyCategory, order: defaultOrder },
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!category.title || !category.image) {
      setError("Title and cover image are required.");
      return;
    }

    if (!isEdit && !category.id && !category.title) {
      setError("Title is required to generate category slug.");
      return;
    }

    setSaving(true);
    setError("");

    const method = isEdit ? "PUT" : "POST";
    const response = await fetch("/api/admin/categories", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    });

    setSaving(false);

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setError(data.error || "Failed to save category. Please try again.");
      return;
    }

    router.push("/admin/categories");
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/categories"
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Categories
        </Link>
        <h2 className="mt-2 text-2xl font-bold text-text">
          {isEdit ? "Edit Category" : "Add Category"}
        </h2>
        <p className="mt-1 text-sm text-text/60">
          Manage category title, cover image, tag, and display order.
        </p>
      </div>

      <div className="rounded-2xl border border-border/70 bg-white p-5 shadow-sm sm:p-6">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="space-y-4">
            <ImageUploadField
              label="Cover Image"
              folder="categories"
              value={category.image ?? ""}
              onChange={(url) => setCategory({ ...category, image: url })}
            />

            {!isEdit ? (
              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-text">
                  Slug (URL id)
                </span>
                <input
                  type="text"
                  value={category.id ?? ""}
                  onChange={(event) =>
                    setCategory({ ...category, id: event.target.value })
                  }
                  placeholder="e.g. offset-printing"
                  className="w-full rounded-xl border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
                />
                <span className="mt-1 block text-xs text-text/50">
                  Leave blank to auto-generate from title. Used in `/category/[slug]`.
                </span>
              </label>
            ) : (
              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-text">Slug</span>
                <input
                  type="text"
                  value={category.id ?? ""}
                  disabled
                  className="w-full rounded-xl border border-border bg-light-bg px-3 py-2.5 text-sm text-text/60"
                />
              </label>
            )}

            {[
              ["Title", "title"],
              ["Tag", "tag"],
              ["Description", "description"],
            ].map(([label, key]) => (
              <label key={key} className="block">
                <span className="mb-1 block text-sm font-semibold text-text">{label}</span>
                {key === "description" ? (
                  <textarea
                    rows={4}
                    value={String(category[key as keyof CategoryDoc] ?? "")}
                    onChange={(event) =>
                      setCategory({ ...category, [key]: event.target.value })
                    }
                    className="w-full rounded-xl border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
                  />
                ) : (
                  <input
                    type="text"
                    value={String(category[key as keyof CategoryDoc] ?? "")}
                    onChange={(event) =>
                      setCategory({ ...category, [key]: event.target.value })
                    }
                    className="w-full rounded-xl border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
                  />
                )}
              </label>
            ))}

            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-text">Icon</span>
              <select
                value={category.icon ?? "Sparkles"}
                onChange={(event) =>
                  setCategory({ ...category, icon: event.target.value })
                }
                className="w-full rounded-xl border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
              >
                {CATEGORY_ICON_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-text">Order</span>
              <input
                type="number"
                value={category.order ?? 0}
                onChange={(event) =>
                  setCategory({ ...category, order: Number(event.target.value) })
                }
                className="w-full rounded-xl border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
              />
            </label>

            <label className="flex items-center gap-2 text-sm font-medium text-text">
              <input
                type="checkbox"
                checked={category.active !== false}
                onChange={(event) =>
                  setCategory({ ...category, active: event.target.checked })
                }
              />
              Show on website
            </label>
          </div>

          <div className="rounded-2xl border border-border/70 bg-light-bg p-4">
            {error ? (
              <p className="mb-3 rounded-xl bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
                {error}
              </p>
            ) : null}
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white disabled:opacity-60"
              >
                {saving ? "Saving..." : isEdit ? "Update Category" : "Save Category"}
              </button>
              <Link
                href="/admin/categories"
                className="rounded-xl border border-border bg-white px-4 py-3 text-center text-sm font-semibold text-text/70"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
