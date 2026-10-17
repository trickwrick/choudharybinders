"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ImageIcon, Loader2, X } from "lucide-react";
import type { TestimonialDoc } from "@/lib/types/cms";

export default function TestimonialForm({
  initialTestimonial,
  defaultOrder = 0,
}: {
  initialTestimonial?: TestimonialDoc;
  defaultOrder?: number;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const isEditing = !!initialTestimonial;

  const [formData, setFormData] = useState({
    name: initialTestimonial?.name ?? "",
    role: initialTestimonial?.role ?? "",
    organization: initialTestimonial?.organization ?? "",
    text: initialTestimonial?.text ?? "",
    image: initialTestimonial?.image ?? "",
    order: initialTestimonial?.order ?? defaultOrder,
    active: initialTestimonial?.active ?? true,
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const data = new FormData();
    data.append("file", file);
    data.append("folder", "testimonials");

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        throw new Error("Failed to upload image");
      }

      const json = await res.json();
      setFormData((prev) => ({ ...prev, image: json.url }));
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

    if (!formData.name.trim()) {
      setError("Name is required.");
      setLoading(false);
      return;
    }

    if (!formData.text.trim()) {
      setError("Review / feedback text is required.");
      setLoading(false);
      return;
    }

    try {
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch("/api/admin/testimonials", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isEditing ? { ...formData, _id: initialTestimonial._id } : formData,
        ),
      });

      if (!res.ok) {
        throw new Error("Failed to save testimonial");
      }

      router.push("/admin/testimonials");
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
            {isEditing ? "Edit Testimonial (Hall of Fame)" : "Add Testimonial (Hall of Fame)"}
          </h2>
        </div>

        <div className="space-y-6 p-6">
          {error ? (
            <div className="rounded-xl bg-red-50 p-4 text-sm font-medium text-red-600">
              {error}
            </div>
          ) : null}

          {/* Photo upload */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-text">
              Client Photo
            </label>
            {formData.image ? (
              <div className="relative aspect-square w-28 overflow-hidden rounded-full border-2 border-border/70 bg-white flex items-center justify-center">
                <Image
                  src={formData.image}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, image: "" })}
                  className="absolute right-0 top-0 rounded-full bg-black/60 p-1 text-white backdrop-blur-md transition-colors hover:bg-black/80"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="relative flex h-28 w-28 cursor-pointer flex-col items-center justify-center rounded-full border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5">
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
                    <div className="rounded-full bg-light-bg p-2 text-text/40">
                      <ImageIcon className="h-5 w-5" />
                    </div>
                    <span className="mt-1 text-[11px] font-medium text-text/60">
                      Upload
                    </span>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-text">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                placeholder="e.g. Stuti Singh"
                className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-text">
                Designation / Role
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                placeholder="e.g. Marketing Manager"
                className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-text">
              Company / City / Organization
            </label>
            <input
              type="text"
              value={formData.organization}
              onChange={(e) =>
                setFormData({ ...formData, organization: e.target.value })
              }
              placeholder="e.g. Corporate Client, Jaipur"
              className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-text">
              Feedback / Review Message <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              value={formData.text}
              onChange={(e) =>
                setFormData({ ...formData, text: e.target.value })
              }
              required
              placeholder="What did the client say about your service?"
              className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-text">
                Display Order
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) =>
                  setFormData({ ...formData, order: Number(e.target.value) })
                }
                className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors"
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
                <div className="h-6 w-11 rounded-full bg-border transition-colors peer-focus:ring-2 peer-focus:ring-primary/30">
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
            "Save Testimonial"
          )}
        </button>
      </div>
    </form>
  );
}
