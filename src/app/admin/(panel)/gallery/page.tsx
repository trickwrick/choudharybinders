"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import type { GalleryImageDoc } from "@/lib/types/cms";

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImageDoc[]>([]);
  const [loading, setLoading] = useState(true);

  const loadImages = async () => {
    setLoading(true);
    const response = await fetch("/api/admin/gallery");
    const data = await response.json();
    setImages(data.images ?? []);
    setLoading(false);
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleDelete = async (id?: string) => {
    if (!id || !confirm("Delete this gallery image?")) return;
    await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
    loadImages();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-text">Gallery</h2>
          <p className="mt-1 text-sm text-text/60">
            Manage gallery images and their order.
          </p>
        </div>
        <Link
          href={`/admin/gallery/new?order=${images.length}`}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-primary-dark"
        >
          <Plus className="h-4 w-4" />
          Add Image
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-text/60">Loading gallery...</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {images.map((image) => (
            <article
              key={String(image._id)}
              className="overflow-hidden rounded-2xl border border-border/70 bg-white shadow-sm"
            >
              <div className="relative aspect-4/3 w-full bg-light-bg">
                {image.src ? (
                  <Image src={image.src} alt={image.label} fill className="object-cover" />
                ) : null}
                {!image.active ? (
                  <span className="absolute left-3 top-3 rounded-full bg-black/70 px-2 py-1 text-[10px] font-bold uppercase text-white">
                    Hidden
                  </span>
                ) : null}
              </div>
              <div className="p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                    Order {image.order}
                  </p>
                  <span className="rounded bg-light-bg px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-text/60">
                    {image.row === "bottom" ? "Bottom Row" : "Top Row"}
                  </span>
                </div>
                <h3 className="mt-1 truncate text-base font-bold text-text">{image.label}</h3>
                <div className="mt-4 flex gap-2">
                  <Link
                    href={`/admin/gallery/${image._id}`}
                    className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-text/70 hover:border-primary/30 hover:text-primary"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(String(image._id))}
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
