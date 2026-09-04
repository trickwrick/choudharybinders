"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import ProductImagesField from "@/components/admin/ProductImagesField";
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

function normalizeProductImages(product: Partial<ProductDoc>): Partial<ProductDoc> {
  const main = product.image ?? "";
  const gallery = [
    ...new Set([main, ...(product.images ?? [])].filter(Boolean)),
  ];
  return {
    ...product,
    image: main || gallery[0] || "",
    images: gallery.length ? gallery : main ? [main] : [],
  };
}

export default function ProductForm({
  initialProduct,
  defaultCategory = "offset",
}: {
  initialProduct?: Partial<ProductDoc>;
  defaultCategory?: CategoryId;
}) {
  const router = useRouter();
  const isEdit = Boolean(initialProduct?._id);
  const [product, setProduct] = useState<Partial<ProductDoc>>(
    normalizeProductImages(
      initialProduct ?? { ...emptyProduct, categoryId: defaultCategory },
    ),
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!product.id || !product.title || !product.image || !product.categoryId) {
      setError("Product slug, title, category, and main image are required.");
      return;
    }

    setSaving(true);
    setError("");

    const images = [
      ...new Set([product.image, ...(product.images ?? [])].filter(Boolean)),
    ];

    const method = isEdit ? "PUT" : "POST";
    const response = await fetch("/api/admin/products", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...product,
        image: product.image,
        images,
      }),
    });

    setSaving(false);

    if (!response.ok) {
      setError("Failed to save product. Please try again.");
      return;
    }

    router.push("/admin/products");
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>
          <h2 className="mt-2 text-2xl font-bold text-text">
            {isEdit ? "Edit Product" : "Add Product"}
          </h2>
          <p className="mt-1 text-sm text-text/60">
            {isEdit
              ? "Update product details and save changes."
              : "Fill in the details below to add a new product."}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-border/70 bg-white p-5 shadow-sm sm:p-6">
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-4">
            <ProductImagesField
              mainImage={product.image ?? ""}
              images={product.images ?? []}
              onChange={({ mainImage, images }) =>
                setProduct({
                  ...product,
                  image: mainImage,
                  images,
                })
              }
            />

            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-text">Category</span>
              <select
                value={product.categoryId}
                onChange={(event) => {
                  const newCategory = event.target.value as CategoryId;
                  let newUnit = product.unit;
                  if (newCategory === "offset" || newCategory === "digital") newUnit = "PCS";
                  if (newCategory === "flex") newUnit = "Sq.ft";
                  
                  setProduct({
                    ...product,
                    categoryId: newCategory,
                    unit: newUnit,
                  });
                }}
                className="w-full rounded-xl border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </label>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-text">
                  Product Slug (URL)
                </span>
                <input
                  type="text"
                  value={product.id ?? ""}
                  onChange={(event) =>
                    setProduct({
                      ...product,
                      id: event.target.value.toLowerCase().replace(/\s+/g, "-"),
                    })
                  }
                  placeholder="e.g. flex-banner"
                  className="w-full rounded-xl border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-text">Title</span>
                <input
                  type="text"
                  value={product.title ?? ""}
                  onChange={(event) =>
                    setProduct({ ...product, title: event.target.value })
                  }
                  className="w-full rounded-xl border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-text">Min. Quantity</span>
                <input
                  type="text"
                  value={product.minQty ?? ""}
                  onChange={(event) =>
                    setProduct({ ...product, minQty: event.target.value })
                  }
                  className="w-full rounded-xl border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-text">Sort Order</span>
                <input
                  type="number"
                  value={product.order ?? 0}
                  onChange={(event) =>
                    setProduct({ ...product, order: Number(event.target.value) })
                  }
                  className="w-full rounded-xl border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-text">
                  Price (optional)
                </span>
                <input
                  type="number"
                  value={product.price ?? ""}
                  onChange={(event) =>
                    setProduct({
                      ...product,
                      price: event.target.value ? Number(event.target.value) : undefined,
                    })
                  }
                  className="w-full rounded-xl border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-text">
                  Unit (e.g. Sq.ft)
                </span>
                <select
                  value={product.unit ?? ""}
                  onChange={(event) =>
                    setProduct({ ...product, unit: event.target.value })
                  }
                  className="w-full rounded-xl border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
                >
                  <option value="">None</option>
                  <option value="PCS">PCS</option>
                  <option value="Sq.ft">Sq.ft</option>
                  <option value="Ft">Ft</option>
                  <option value="Piece">Piece</option>
                  <option value="Set">Set</option>
                </select>
              </label>
            </div>

            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-text">Description</span>
              <textarea
                rows={5}
                value={product.description ?? ""}
                onChange={(event) =>
                  setProduct({ ...product, description: event.target.value })
                }
                className="w-full rounded-xl border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
              />
            </label>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-border/70 bg-light-bg p-4">
              <h4 className="text-sm font-bold text-text">Publish Settings</h4>
              <label className="mt-3 flex items-center gap-2 text-sm font-medium text-text">
                <input
                  type="checkbox"
                  checked={product.active !== false}
                  onChange={(event) =>
                    setProduct({ ...product, active: event.target.checked })
                  }
                />
                Show on website
              </label>
            </div>

            <div className="rounded-2xl border border-border/70 bg-white p-4">
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
                  {saving ? "Saving..." : isEdit ? "Update Product" : "Save Product"}
                </button>
                <Link
                  href="/admin/products"
                  className="rounded-xl border border-border px-4 py-3 text-center text-sm font-semibold text-text/70"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
