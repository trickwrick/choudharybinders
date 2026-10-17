"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MessageSquareQuote, Pencil, Plus, Trash2 } from "lucide-react";
import type { TestimonialDoc } from "@/lib/types/cms";

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<TestimonialDoc[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTestimonials = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/testimonials");
      const data = await response.json();
      setTestimonials(data.testimonials ?? []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const handleDelete = async (id?: string) => {
    if (!id || !confirm("Are you sure you want to delete this testimonial?")) return;
    await fetch(`/api/admin/testimonials?id=${id}`, { method: "DELETE" });
    loadTestimonials();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-text">Hall of Fame (Testimonials)</h2>
          <p className="mt-1 text-sm text-text/60">
            Manage client reviews and testimonials displayed on the homepage.
          </p>
        </div>
        <Link
          href={`/admin/testimonials/new?order=${testimonials.length}`}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-primary-dark transition-colors shadow-sm"
        >
          <Plus className="h-4 w-4" />
          Add Testimonial
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-text/60">Loading testimonials...</p>
      ) : testimonials.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-white p-12 text-center">
          <MessageSquareQuote className="mx-auto h-10 w-10 text-text/40" />
          <h3 className="mt-3 text-base font-bold text-text">No Testimonials Found</h3>
          <p className="mt-1 text-sm text-text/60">Get started by creating your first testimonial.</p>
          <Link
            href="/admin/testimonials/new"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary-dark"
          >
            <Plus className="h-4 w-4" /> Add Testimonial
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={String(item._id)}
              className="flex flex-col justify-between overflow-hidden rounded-2xl border border-border/70 bg-white shadow-sm transition-all hover:shadow-md"
            >
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                    Order {item.order}
                  </span>
                  {!item.active && (
                    <span className="rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                      Hidden
                    </span>
                  )}
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-border bg-light-bg flex items-center justify-center">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-sm font-bold text-text/50">
                        {item.name.slice(0, 1).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-base font-bold text-text">{item.name}</h3>
                    <p className="truncate text-xs font-medium text-text/70">{item.role}</p>
                    <p className="truncate text-xs text-text/50">{item.organization}</p>
                  </div>
                </div>

                <p className="mt-4 line-clamp-3 text-xs leading-relaxed text-text/75 italic">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              <div className="flex gap-2 border-t border-border/50 bg-light-bg/40 p-3">
                <Link
                  href={`/admin/testimonials/${item._id}`}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border bg-white py-1.5 text-xs font-semibold text-text/80 shadow-xs hover:border-primary/40 hover:text-primary transition-colors"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(String(item._id))}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-white py-1.5 text-xs font-semibold text-red-600 shadow-xs hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
