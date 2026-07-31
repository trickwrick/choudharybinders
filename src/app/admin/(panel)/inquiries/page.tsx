"use client";

import { useEffect, useState } from "react";
import { Mail, Phone, Trash2 } from "lucide-react";
import type { InquiryDoc, InquiryStatus } from "@/lib/types/cms";

const statusStyles: Record<InquiryStatus, string> = {
  new: "bg-accent/15 text-accent",
  read: "bg-blue-100 text-blue-700",
  replied: "bg-primary/15 text-primary",
};

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<InquiryDoc[]>([]);
  const [filter, setFilter] = useState<InquiryStatus | "all">("all");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<InquiryDoc | null>(null);

  const loadInquiries = async () => {
    setLoading(true);
    const url =
      filter === "all"
        ? "/api/admin/inquiries"
        : `/api/admin/inquiries?status=${filter}`;
    const response = await fetch(url);
    const data = await response.json();
    setInquiries(data.inquiries ?? []);
    setLoading(false);
  };

  useEffect(() => {
    loadInquiries();
  }, [filter]);

  const updateStatus = async (id: string | undefined, status: InquiryStatus) => {
    if (!id) return;
    await fetch("/api/admin/inquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: id, status }),
    });
    loadInquiries();
    if (selected?._id === id) {
      setSelected({ ...selected, status });
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id || !confirm("Delete this inquiry?")) return;
    await fetch(`/api/admin/inquiries?id=${id}`, { method: "DELETE" });
    setSelected(null);
    loadInquiries();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text">Quote Inquiries</h2>
        <p className="mt-1 text-sm text-text/60">
          All contact form and get-quote submissions appear here.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {(["all", "new", "read", "replied"] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${
              filter === item
                ? "bg-primary text-white"
                : "border border-border bg-white text-text/70"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-hidden rounded-2xl border border-border/70 bg-white shadow-sm">
          {loading ? (
            <p className="p-6 text-sm text-text/60">Loading inquiries...</p>
          ) : inquiries.length === 0 ? (
            <p className="p-6 text-sm text-text/60">No inquiries yet.</p>
          ) : (
            <div className="divide-y divide-border/60">
              {inquiries.map((inquiry) => (
                <button
                  key={String(inquiry._id)}
                  type="button"
                  onClick={() => {
                    setSelected(inquiry);
                    if (inquiry.status === "new") {
                      updateStatus(String(inquiry._id), "read");
                    }
                  }}
                  className={`w-full px-4 py-4 text-left transition-colors hover:bg-light-bg ${
                    String(selected?._id) === String(inquiry._id) ? "bg-section-mint" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold text-text">{inquiry.name}</p>
                      <p className="mt-0.5 text-sm text-text/60">{inquiry.email}</p>
                      <p className="mt-2 line-clamp-2 text-sm text-text/70">
                        {inquiry.message}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${statusStyles[inquiry.status]}`}
                    >
                      {inquiry.status}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-text/45">
                    {new Date(inquiry.createdAt).toLocaleString("en-IN")} · {inquiry.source}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-border/70 bg-white p-6 shadow-sm">
          {selected ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-bold text-text">{selected.name}</h3>
                  <p className="mt-1 text-sm text-text/60">{selected.email}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(String(selected._id))}
                  className="rounded-lg border border-red-200 p-2 text-red-500 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <a
                href={`tel:${selected.phone}`}
                className="flex items-center gap-2 text-sm font-semibold text-primary"
              >
                <Phone className="h-4 w-4" />
                {selected.phone}
              </a>

              {selected.productTitle ? (
                <div className="rounded-xl bg-light-bg px-4 py-3 text-sm">
                  <p className="font-semibold text-text">Product Interest</p>
                  <p className="mt-1 text-text/70">{selected.productTitle}</p>
                  {selected.quantity ? (
                    <p className="mt-1 text-text/55">
                      Qty: {selected.quantity} {selected.unit ?? ""}
                    </p>
                  ) : null}
                </div>
              ) : null}

              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-text/50">
                  Message
                </p>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-text/75">
                  {selected.message}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {(["new", "read", "replied"] as InquiryStatus[]).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => updateStatus(String(selected._id), status)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${
                      selected.status === status
                        ? "bg-[#0f172a] text-white"
                        : "border border-border text-text/70"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              <a
                href={`mailto:${selected.email}`}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white"
              >
                <Mail className="h-4 w-4" />
                Reply via Email
              </a>
            </div>
          ) : (
            <div className="flex h-full min-h-[280px] items-center justify-center text-center">
              <div>
                <Mail className="mx-auto h-10 w-10 text-text/20" />
                <p className="mt-3 text-sm font-medium text-text/60">
                  Select an inquiry to view details
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
