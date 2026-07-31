"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import ImageUploadField from "@/components/admin/ImageUploadField";
import type { HeroSlideDoc } from "@/lib/types/cms";

const emptySlide: Partial<HeroSlideDoc> = {
  src: "",
  alt: "",
  title: "",
  subtitle: "",
  order: 0,
  active: true,
};

export default function SlideForm({
  initialSlide,
  defaultOrder = 0,
}: {
  initialSlide?: Partial<HeroSlideDoc>;
  defaultOrder?: number;
}) {
  const router = useRouter();
  const isEdit = Boolean(initialSlide?._id);
  const [slide, setSlide] = useState<Partial<HeroSlideDoc>>(
    initialSlide ?? { ...emptySlide, order: defaultOrder },
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!slide.title || !slide.src) {
      setError("Title and image are required.");
      return;
    }

    setSaving(true);
    setError("");

    const method = isEdit ? "PUT" : "POST";
    const response = await fetch("/api/admin/hero-slides", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(slide),
    });

    setSaving(false);

    if (!response.ok) {
      setError("Failed to save slide. Please try again.");
      return;
    }

    router.push("/admin/slider");
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/slider"
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Slider
        </Link>
        <h2 className="mt-2 text-2xl font-bold text-text">
          {isEdit ? "Edit Slide" : "Add Slide"}
        </h2>
        <p className="mt-1 text-sm text-text/60">
          Manage homepage hero banner image, title, and subtitle.
        </p>
      </div>

      <div className="rounded-2xl border border-border/70 bg-white p-5 shadow-sm sm:p-6">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="space-y-4">
            <ImageUploadField
              label="Slide Image"
              folder="slider"
              value={slide.src ?? ""}
              onChange={(url) => setSlide({ ...slide, src: url })}
            />

            {[
              ["Alt Text", "alt"],
              ["Title", "title"],
              ["Subtitle", "subtitle"],
            ].map(([label, key]) => (
              <label key={key} className="block">
                <span className="mb-1 block text-sm font-semibold text-text">{label}</span>
                <input
                  type="text"
                  value={String(slide[key as keyof HeroSlideDoc] ?? "")}
                  onChange={(event) =>
                    setSlide({ ...slide, [key]: event.target.value })
                  }
                  className="w-full rounded-xl border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
                />
              </label>
            ))}

            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-text">Order</span>
              <input
                type="number"
                value={slide.order ?? 0}
                onChange={(event) =>
                  setSlide({ ...slide, order: Number(event.target.value) })
                }
                className="w-full rounded-xl border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
              />
            </label>

            <label className="flex items-center gap-2 text-sm font-medium text-text">
              <input
                type="checkbox"
                checked={slide.active !== false}
                onChange={(event) =>
                  setSlide({ ...slide, active: event.target.checked })
                }
              />
              Show on homepage
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
                {saving ? "Saving..." : isEdit ? "Update Slide" : "Save Slide"}
              </button>
              <Link
                href="/admin/slider"
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
