"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ImageIcon, Loader2, Upload, X } from "lucide-react";
import type { GalleryImageDoc } from "@/lib/types/cms";

export default function GalleryForm({
  initialImage,
  defaultOrder = 0,
}: {
  initialImage?: GalleryImageDoc;
  defaultOrder?: number;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const isEditing = !!initialImage;

  const [formData, setFormData] = useState({
    src: initialImage?.src ?? "",
    label: initialImage?.label ?? "",
    order: initialImage?.order ?? defaultOrder,
    active: initialImage?.active ?? true,
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const data = new FormData();
    data.append("file", file);
    data.append("folder", "gallery");

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        throw new Error("Failed to upload image");
      }

      const json = await res.json();
      setFormData((prev) => ({ ...prev, src: json.url }));
    } catch (err: any) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.src) {
      setError("An image is required.");
      setLoading(false);
      return;
    }

    try {
      const url = isEditing
        ? `/api/admin/gallery/${initialImage._id}`
        : "/api/admin/gallery";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isEditing ? { ...formData, _id: initialImage._id } : formData),
      });

      if (!res.ok) {
        throw new Error("Failed to save gallery image");
      }

      router.push("/admin/gallery");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An error occurred");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6">
      <div className="admin-card overflow-hidden rounded-3xl">
        <div className="border-b border-border/70 bg-light-bg/50 px-6 py-4">
          <h2 className="text-lg font-bold text-text">
            {isEditing ? "Edit Gallery Image" : "Add Gallery Image"}
          </h2>
        </div>

        <div className="space-y-6 p-6">
          {error ? (
            <div className="rounded-xl bg-red-50 p-4 text-sm font-medium text-red-600">
              {error}
            </div>
          ) : null}

          <div>
            <label className="mb-2 block text-sm font-semibold text-text">
              Image <span className="text-red-500">*</span>
            </label>
            {formData.src ? (
              <div className="relative aspect-[4/3] w-full max-w-sm overflow-hidden rounded-xl border border-border/70 bg-light-bg sm:aspect-[16/10]">
                <Image
                  src={formData.src}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, src: "" })}
                  className="absolute right-2 top-2 rounded-full bg-black/50 p-1.5 text-white backdrop-blur-md transition-colors hover:bg-black/70"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="relative flex aspect-[4/3] w-full max-w-sm cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 sm:aspect-[16/10]">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="absolute inset-0 cursor-pointer opacity-0"
                />
                {uploading ? (
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                ) : (
                  <>
                    <div className="rounded-full bg-light-bg p-3 text-text/40">
                      <ImageIcon className="h-6 w-6" />
                    </div>
                    <p className="mt-2 text-sm font-medium text-text/60">
                      Click or drag image to upload
                    </p>
                    <p className="mt-1 text-xs text-text/40">
                      Recommended: 1200x900px
                    </p>
                  </>
                )}
              </div>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-text">
              Label (Title) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.label}
              onChange={(e) =>
                setFormData({ ...formData, label: e.target.value })
              }
              required
              placeholder="e.g. Flex Printing"
              className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-text">
                Order
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) =>
                  setFormData({ ...formData, order: Number(e.target.value) })
                }
                className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-text">
                Status
              </label>
              <label className="relative flex cursor-pointer items-center gap-3 py-2.5">
                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) =>
                    setFormData({ ...formData, active: e.target.checked })
                  }
                  className="peer sr-only"
                />
                <div className="h-6 w-11 rounded-full bg-border transition-colors peer-checked:bg-brand-lime peer-focus:ring-2 peer-focus:ring-brand-lime/30">
                  <div
                    className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                      formData.active ? "translate-x-5" : ""
                    }`}
                  />
                </div>
                <span className="text-sm font-medium text-text">
                  {formData.active ? "Active" : "Hidden"}
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-xl px-5 py-2.5 text-sm font-semibold text-text/70 transition-colors hover:bg-light-bg hover:text-text"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading || uploading}
          className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-[#0f3d0f] to-[#138808] px-6 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-95 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Saving...
            </>
          ) : (
            "Save Image"
          )}
        </button>
      </div>
    </form>
  );
}
