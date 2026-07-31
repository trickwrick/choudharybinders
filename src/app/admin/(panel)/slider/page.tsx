"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import type { HeroSlideDoc } from "@/lib/types/cms";

const emptySlide = {
  src: "",
  alt: "",
  title: "",
  subtitle: "",
  order: 0,
  active: true,
};

export default function AdminSliderPage() {
  const [slides, setSlides] = useState<HeroSlideDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<HeroSlideDoc> | null>(null);
  const [saving, setSaving] = useState(false);

  const loadSlides = async () => {
    setLoading(true);
    const response = await fetch("/api/admin/hero-slides");
    const data = await response.json();
    setSlides(data.slides ?? []);
    setLoading(false);
  };

  useEffect(() => {
    loadSlides();
  }, []);

  const handleSave = async () => {
    if (!editing?.title || !editing.src) return;
    setSaving(true);

    const method = editing._id ? "PUT" : "POST";
    await fetch("/api/admin/hero-slides", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });

    setSaving(false);
    setEditing(null);
    loadSlides();
  };

  const handleDelete = async (id?: string) => {
    if (!id || !confirm("Delete this slide?")) return;
    await fetch(`/api/admin/hero-slides?id=${id}`, { method: "DELETE" });
    loadSlides();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-text">Hero Slider</h2>
          <p className="mt-1 text-sm text-text/60">
            Manage homepage banner slides — image, title, and subtitle.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setEditing({ ...emptySlide, order: slides.length })}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-primary-dark"
        >
          <Plus className="h-4 w-4" />
          Add Slide
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-text/60">Loading slides...</p>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {slides.map((slide) => (
            <article
              key={String(slide._id)}
              className="overflow-hidden rounded-2xl border border-border/70 bg-white shadow-sm"
            >
              <div className="relative h-44 bg-light-bg">
                {slide.src ? (
                  <Image src={slide.src} alt={slide.alt} fill className="object-cover" />
                ) : null}
                {!slide.active ? (
                  <span className="absolute left-3 top-3 rounded-full bg-black/70 px-2 py-1 text-[10px] font-bold uppercase text-white">
                    Hidden
                  </span>
                ) : null}
              </div>
              <div className="p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  Order {slide.order}
                </p>
                <h3 className="mt-1 text-lg font-bold text-text">{slide.title}</h3>
                <p className="mt-1 text-sm text-text/60">{slide.subtitle}</p>
                <p className="mt-2 truncate text-xs text-text/45">{slide.src}</p>
                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setEditing(slide)}
                    className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-text/70 hover:border-primary/30 hover:text-primary"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(String(slide._id))}
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

      {editing ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-text">
              {editing._id ? "Edit Slide" : "Add Slide"}
            </h3>
            <div className="mt-4 space-y-3">
              {[
                ["Image URL", "src", "text"],
                ["Alt Text", "alt", "text"],
                ["Title", "title", "text"],
                ["Subtitle", "subtitle", "text"],
                ["Order", "order", "number"],
              ].map(([label, key, type]) => (
                <label key={key} className="block">
                  <span className="mb-1 block text-sm font-semibold text-text">{label}</span>
                  <input
                    type={type}
                    value={String(editing[key as keyof typeof editing] ?? "")}
                    onChange={(event) =>
                      setEditing({
                        ...editing,
                        [key]: type === "number" ? Number(event.target.value) : event.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
                  />
                </label>
              ))}
              <label className="flex items-center gap-2 text-sm font-medium text-text">
                <input
                  type="checkbox"
                  checked={editing.active !== false}
                  onChange={(event) =>
                    setEditing({ ...editing, active: event.target.checked })
                  }
                />
                Show on homepage
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
                {saving ? "Saving..." : "Save Slide"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
