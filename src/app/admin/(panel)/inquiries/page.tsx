"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  Copy,
  Mail,
  MessageSquare,
  Package,
  Phone,
  Search,
  Trash2,
} from "lucide-react";
import type { InquiryDoc, InquiryStatus } from "@/lib/types/cms";

const statusStyles: Record<InquiryStatus, string> = {
  new: "bg-accent/15 text-accent ring-accent/20",
  read: "bg-blue-100 text-blue-700 ring-blue-200",
  replied: "bg-primary/15 text-primary ring-primary/20",
};

const statusLabels: Record<InquiryStatus, string> = {
  new: "New",
  read: "Read",
  replied: "Replied",
};

const sourceLabels: Record<InquiryDoc["source"], string> = {
  contact: "Contact Form",
  product: "Product Quote",
  quote: "Get Quote",
  order: "Card Order",
};

function formatWhen(date: Date | string) {
  const value = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - value.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffHours < 48) return "Yesterday";
  return value.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function toWhatsAppLink(phone: string) {
  const digits = phone.replace(/\D/g, "");
  const normalized = digits.startsWith("91") ? digits : `91${digits.replace(/^0+/, "")}`;
  return `https://wa.me/${normalized}`;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<InquiryDoc[]>([]);
  const [filter, setFilter] = useState<InquiryStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<InquiryDoc | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const loadInquiries = async () => {
    setLoading(true);
    const response = await fetch("/api/admin/inquiries");
    const data = await response.json();
    setInquiries(data.inquiries ?? []);
    setLoading(false);
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const stats = useMemo(
    () => ({
      total: inquiries.length,
      new: inquiries.filter((item) => item.status === "new").length,
      read: inquiries.filter((item) => item.status === "read").length,
      replied: inquiries.filter((item) => item.status === "replied").length,
    }),
    [inquiries],
  );

  const filteredInquiries = useMemo(() => {
    const query = search.trim().toLowerCase();

    return inquiries.filter((inquiry) => {
      const matchesFilter = filter === "all" || inquiry.status === filter;
      if (!matchesFilter) return false;
      if (!query) return true;

      const haystack = [
        inquiry.name,
        inquiry.email,
        inquiry.phone,
        inquiry.message,
        inquiry.productTitle,
        inquiry.source,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [filter, inquiries, search]);

  useEffect(() => {
    if (!selected) return;
    const fresh = inquiries.find((item) => String(item._id) === String(selected._id));
    if (fresh) setSelected(fresh);
  }, [inquiries, selected]);

  const updateStatus = async (id: string | undefined, status: InquiryStatus) => {
    if (!id) return;
    await fetch("/api/admin/inquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: id, status }),
    });
    loadInquiries();
  };

  const handleSelect = (inquiry: InquiryDoc) => {
    setSelected(inquiry);
    if (inquiry.status === "new") {
      updateStatus(String(inquiry._id), "read");
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id || !confirm("Delete this inquiry?")) return;
    await fetch(`/api/admin/inquiries?id=${id}`, { method: "DELETE" });
    setSelected(null);
    loadInquiries();
  };

  const copyText = async (label: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(label);
    window.setTimeout(() => setCopied(null), 1500);
  };

  const statCards = [
    { label: "Total", value: stats.total, tone: "from-[#0f172a] to-[#334155]" },
    { label: "New", value: stats.new, tone: "from-accent to-[#ff9933]" },
    { label: "Read", value: stats.read, tone: "from-blue-500 to-blue-600" },
    { label: "Replied", value: stats.replied, tone: "from-primary to-[#0ADB0A]" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text">Quote Inquiries</h2>
        <p className="mt-1 text-sm text-text/60">
          Track contact forms, product quotes, and get-quote requests in one place.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="overflow-hidden rounded-2xl border border-border/70 bg-white shadow-sm"
          >
            <div className={`bg-gradient-to-r ${card.tone} px-4 py-3`}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                {card.label}
              </p>
            </div>
            <div className="px-4 py-4">
              <p className="text-3xl font-bold text-text">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text/40" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search name, phone, email, product..."
            className="w-full rounded-xl border border-border bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {(["all", "new", "read", "replied"] as const).map((item) => {
            const count =
              item === "all"
                ? stats.total
                : stats[item as InquiryStatus];

            return (
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
                {item} ({count})
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="overflow-hidden rounded-2xl border border-border/70 bg-white shadow-sm">
          <div className="border-b border-border/60 px-4 py-3">
            <p className="text-sm font-semibold text-text">
              Inbox ({filteredInquiries.length})
            </p>
          </div>

          {loading ? (
            <p className="p-6 text-sm text-text/60">Loading inquiries...</p>
          ) : filteredInquiries.length === 0 ? (
            <div className="flex min-h-[320px] flex-col items-center justify-center px-6 py-10 text-center">
              <MessageSquare className="h-10 w-10 text-text/20" />
              <p className="mt-3 text-sm font-semibold text-text/70">No inquiries found</p>
              <p className="mt-1 text-sm text-text/50">
                New quote requests from the website will appear here.
              </p>
            </div>
          ) : (
            <div className="max-h-[720px] divide-y divide-border/60 overflow-y-auto">
              {filteredInquiries.map((inquiry) => {
                const isSelected = String(selected?._id) === String(inquiry._id);

                return (
                  <button
                    key={String(inquiry._id)}
                    type="button"
                    onClick={() => handleSelect(inquiry)}
                    className={`w-full px-4 py-4 text-left transition-colors hover:bg-light-bg ${
                      isSelected ? "bg-section-mint" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                        {getInitials(inquiry.name)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="truncate font-bold text-text">{inquiry.name}</p>
                            <p className="mt-0.5 truncate text-sm text-text/55">
                              {inquiry.phone}
                            </p>
                          </div>
                          <span
                            className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ring-1 ${statusStyles[inquiry.status]}`}
                          >
                            {statusLabels[inquiry.status]}
                          </span>
                        </div>

                        <p className="mt-2 line-clamp-2 text-sm text-text/70">
                          {inquiry.message}
                        </p>

                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-light-bg px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-text/55">
                            {sourceLabels[inquiry.source]}
                          </span>
                          {inquiry.productTitle ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary">
                              <Package className="h-3 w-3" />
                              {inquiry.productTitle}
                            </span>
                          ) : null}
                          <span className="inline-flex items-center gap-1 text-[11px] text-text/45">
                            <Clock3 className="h-3 w-3" />
                            {formatWhen(inquiry.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-border/70 bg-white shadow-sm">
          {selected ? (
            <div className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-base font-bold text-primary">
                    {getInitials(selected.name)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text">{selected.name}</h3>
                    <p className="mt-1 text-sm text-text/60">{selected.email}</p>
                    <span
                      className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ring-1 ${statusStyles[selected.status]}`}
                    >
                      {statusLabels[selected.status]}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(String(selected._id))}
                  className="rounded-lg border border-red-200 p-2 text-red-500 hover:bg-red-50"
                  aria-label="Delete inquiry"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-border/70 bg-light-bg p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-text/45">Phone</p>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <a
                      href={`tel:${selected.phone}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
                    >
                      <Phone className="h-4 w-4" />
                      {selected.phone}
                    </a>
                    <button
                      type="button"
                      onClick={() => copyText("phone", selected.phone)}
                      className="rounded-lg border border-border bg-white p-2 text-text/55 hover:text-primary"
                      aria-label="Copy phone"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div className="rounded-xl border border-border/70 bg-light-bg p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-text/45">Email</p>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <a
                      href={`mailto:${selected.email}`}
                      className="truncate text-sm font-semibold text-text/75 hover:text-primary"
                    >
                      {selected.email}
                    </a>
                    <button
                      type="button"
                      onClick={() => copyText("email", selected.email)}
                      className="rounded-lg border border-border bg-white p-2 text-text/55 hover:text-primary"
                      aria-label="Copy email"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {copied ? (
                <p className="mt-2 text-xs font-medium text-primary">
                  {copied === "phone" ? "Phone copied" : "Email copied"}
                </p>
              ) : null}

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-border/70 px-4 py-3">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-text/45">
                    Source
                  </p>
                  <p className="mt-1 text-sm font-semibold text-text">
                    {sourceLabels[selected.source]}
                  </p>
                </div>
                <div className="rounded-xl border border-border/70 px-4 py-3">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-text/45">
                    Received
                  </p>
                  <p className="mt-1 text-sm font-semibold text-text">
                    {new Date(selected.createdAt).toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="rounded-xl border border-border/70 px-4 py-3">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-text/45">
                    Quantity
                  </p>
                  <p className="mt-1 text-sm font-semibold text-text">
                    {selected.quantity
                      ? `${selected.quantity} ${selected.unit ?? ""}`.trim()
                      : "Not specified"}
                  </p>
                </div>
              </div>

              {selected.orderDetails ? (
                <div className="mt-4 rounded-xl border border-[#2563eb]/15 bg-[#2563eb]/5 px-4 py-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-[#2563eb]">
                    Order Details
                  </p>
                  <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                    {selected.orderDetails.sectionTitle ? (
                      <p>
                        <span className="font-semibold text-text/55">Section:</span>{" "}
                        {selected.orderDetails.sectionTitle}
                      </p>
                    ) : null}
                    {selected.orderDetails.variantCode ? (
                      <p>
                        <span className="font-semibold text-text/55">Code:</span>{" "}
                        {selected.orderDetails.variantCode}
                      </p>
                    ) : null}
                    {selected.orderDetails.printing ? (
                      <p>
                        <span className="font-semibold text-text/55">Printing:</span>{" "}
                        {selected.orderDetails.printing}
                      </p>
                    ) : null}
                    {selected.orderDetails.privacyPacking ? (
                      <p>
                        <span className="font-semibold text-text/55">Privacy Packing:</span>{" "}
                        {selected.orderDetails.privacyPacking === "required"
                          ? "Required"
                          : "Not Required"}
                      </p>
                    ) : null}
                    {selected.orderDetails.fileOption ? (
                      <p>
                        <span className="font-semibold text-text/55">File Option:</span>{" "}
                        {selected.orderDetails.fileOption === "attach-online"
                          ? "Attach File Online"
                          : "Send via Email"}
                      </p>
                    ) : null}
                    {selected.orderDetails.attachedFileName ? (
                      <p className="sm:col-span-2">
                        <span className="font-semibold text-text/55">File:</span>{" "}
                        {selected.orderDetails.attachedFileName}
                      </p>
                    ) : null}
                    {selected.orderDetails.freeDeliveryEligible ? (
                      <p className="sm:col-span-2 font-medium text-primary">
                        Eligible for free delivery
                      </p>
                    ) : null}
                  </div>
                  {selected.orderDetails.specialRemark ? (
                    <p className="mt-3 text-sm text-text/75">
                      <span className="font-semibold text-text/55">Remark:</span>{" "}
                      {selected.orderDetails.specialRemark}
                    </p>
                  ) : null}
                </div>
              ) : null}

              {selected.productTitle ? (
                <div className="mt-4 rounded-xl border border-primary/15 bg-primary/5 px-4 py-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-primary">
                    Product Interest
                  </p>
                  <p className="mt-1 text-sm font-semibold text-text">{selected.productTitle}</p>
                  {selected.categoryId ? (
                    <p className="mt-1 text-xs text-text/55">Category: {selected.categoryId}</p>
                  ) : null}
                </div>
              ) : null}

              <div className="mt-5">
                <p className="text-xs font-bold uppercase tracking-wide text-text/50">Message</p>
                <div className="mt-2 rounded-xl border border-border/70 bg-light-bg px-4 py-4">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-text/75">
                    {selected.message}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {(["new", "read", "replied"] as InquiryStatus[]).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => updateStatus(String(selected._id), status)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${
                      selected.status === status
                        ? "bg-[#0f172a] text-white"
                        : "border border-border text-text/70 hover:border-primary/30 hover:text-primary"
                    }`}
                  >
                    {statusLabels[status]}
                  </button>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <a
                  href={`mailto:${selected.email}?subject=Re: Your inquiry at Choudhary Binders`}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white"
                >
                  <Mail className="h-4 w-4" />
                  Reply via Email
                </a>
                <a
                  href={toWhatsAppLink(selected.phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#25D366]/30 bg-[#25D366]/10 px-4 py-2.5 text-sm font-bold text-[#128C7E]"
                >
                  <MessageSquare className="h-4 w-4" />
                  WhatsApp
                </a>
                {selected.status !== "replied" ? (
                  <button
                    type="button"
                    onClick={() => updateStatus(String(selected._id), "replied")}
                    className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-semibold text-text/70 hover:border-primary/30 hover:text-primary"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Mark Replied
                  </button>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="flex min-h-[420px] flex-col items-center justify-center px-6 py-10 text-center">
              <Mail className="h-10 w-10 text-text/20" />
              <p className="mt-3 text-sm font-semibold text-text/70">
                Select an inquiry to view details
              </p>
              <p className="mt-1 max-w-xs text-sm text-text/50">
                Click any request from the inbox to see contact info, product details, and quick
                reply actions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
