"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import {
  ChevronRight,
  CloudUpload,
  Layers3,
  Lock,
  LockOpen,
  Mail,
  Printer,
} from "lucide-react";
import type { CategorySummary } from "@/lib/categories";
import type { OrderDetails } from "@/lib/types/cms";
import type {
  ProductVariant,
  ProductVariantGroup,
  ProductVariantSection,
} from "@/lib/product-variants";
import Container from "./Container";

const PRINTING_OPTIONS = ["1 Side", "2 Side"];
const MIN_QTY = 1000;
const MAX_QTY = 72000;

function parseMinQty(minQtyLabel: string) {
  const match = minQtyLabel.match(/\d+/);
  return match ? Number(match[0]) : MIN_QTY;
}

function FormSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-b border-border/70 py-4 last:border-b-0">
      <h2 className="text-sm font-bold uppercase tracking-wide text-text">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

function RadioOption({
  name,
  value,
  checked,
  onChange,
  label,
  icon,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  label: string;
  icon: ReactNode;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border/70 px-3 py-2.5 transition-colors hover:border-[#2563eb]/30 hover:bg-[#2563eb]/5">
      <span className="text-[#2563eb]">{icon}</span>
      <span className="flex-1 text-sm font-medium text-text">{label}</span>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="h-4 w-4 accent-[#2563eb]"
      />
    </label>
  );
}

export default function ProductVariantDetailPage({
  categorySlug,
  productTitle,
  variantGroup,
  variant,
  section,
}: {
  category: CategorySummary;
  categorySlug: string;
  productTitle: string;
  variantGroup: ProductVariantGroup;
  variant: ProductVariant;
  section: ProductVariantSection;
}) {
  const defaultQty = parseMinQty(variantGroup.minQty);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState(defaultQty);
  const [printing, setPrinting] = useState(PRINTING_OPTIONS[0]);
  const [privacyPacking, setPrivacyPacking] = useState<"required" | "not-required">("required");
  const [fileOption, setFileOption] = useState<"attach-online" | "send-email">("attach-online");
  const [attachedFileName, setAttachedFileName] = useState("");
  const [specialRemark, setSpecialRemark] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const freeDeliveryEligible = quantity >= MIN_QTY;

  const buildOrderMessage = (order: OrderDetails) =>
    [
      `Card Order: ${variant.name} (Code ${variant.code})`,
      `Section: ${section.title}`,
      `Product: ${productTitle}`,
      `Printing: ${order.printing}`,
      `Privacy Packing: ${order.privacyPacking === "required" ? "Required" : "Not Required"}`,
      `File Option: ${order.fileOption === "attach-online" ? "Attach File Online" : "Send via Email"}`,
      order.attachedFileName ? `Attached File: ${order.attachedFileName}` : null,
      order.specialRemark ? `Special Remark: ${order.specialRemark}` : null,
    ]
      .filter(Boolean)
      .join("\n");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError("Please enter your name, email, and phone number.");
      return;
    }

    if (quantity < MIN_QTY || quantity > MAX_QTY) {
      setError(`Quantity must be between ${MIN_QTY} and ${MAX_QTY}.`);
      return;
    }

    const orderDetails: OrderDetails = {
      variantId: variant.id,
      variantCode: variant.code,
      variantLabel: variant.label,
      variantName: variant.name,
      sectionTitle: section.title,
      printing,
      privacyPacking,
      fileOption,
      attachedFileName: attachedFileName || undefined,
      specialRemark: specialRemark.trim() || undefined,
      freeDeliveryEligible,
    };

    setSubmitting(true);

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          message: buildOrderMessage(orderDetails),
          productId: variant.id,
          productTitle: `${variant.name} (Code ${variant.code})`,
          categoryId: categorySlug,
          quantity,
          unit: "Cards",
          orderDetails,
          source: "order",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to submit order.");
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Failed to submit order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-section-warm pb-12 pt-6 sm:pb-16 sm:pt-8">
      <Container>
        <nav
          aria-label="Breadcrumb"
          className="mb-6 text-xs text-text/55 sm:text-sm"
        >
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="transition-colors hover:text-primary">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li>
              <Link
                href={`/category/${categorySlug}/${variantGroup.productId}`}
                className="transition-colors hover:text-primary"
              >
                {productTitle}
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li className="line-clamp-1 font-medium text-text">{variant.name}</li>
          </ol>
        </nav>

        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="space-y-4">
            <div className="overflow-hidden rounded-2xl border border-border/70 bg-white shadow-sm">
              <div
                className={`variant-detail-banner ${section.tone} flex min-h-[100px] items-center justify-center px-4 py-6`}
              >
                <div className="absolute inset-[8px] rounded-lg border border-white/45" />
                <p className="relative z-[1] text-center text-sm font-bold uppercase leading-tight tracking-wide">
                  {variant.label}
                </p>
              </div>
              <div className="space-y-2 p-4 text-sm">
                <p className="font-bold text-[#1d4ed8]">{variant.name}</p>
                <p className="text-text/70">Product Code: {variant.code}</p>
                <p className="text-text/70">{section.title}</p>
                <p className="text-text/60">{variant.productionTime}</p>
              </div>
            </div>
          </aside>

          <div className="overflow-hidden rounded-2xl border border-border/70 bg-white shadow-sm">
            {submitted ? (
              <div className="px-6 py-12 text-center sm:px-8">
                <p className="text-xl font-bold text-[#138808]">Order Submitted!</p>
                <p className="mt-2 text-sm text-text/65">
                  Your order details have been sent. Our team will contact you shortly with pricing
                  and confirmation.
                </p>
                <Link
                  href={`/category/${categorySlug}/${variantGroup.productId}`}
                  className="mt-6 inline-flex rounded-xl bg-[#2563eb] px-5 py-2.5 text-sm font-bold text-white"
                >
                  Back to All Options
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="px-4 sm:px-6">
                <FormSection title="Your Details">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Your Name *"
                      className="h-11 rounded-xl border border-border px-3 text-sm outline-none focus:border-[#2563eb]"
                      required
                    />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="Phone Number *"
                      className="h-11 rounded-xl border border-border px-3 text-sm outline-none focus:border-[#2563eb]"
                      required
                    />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Email Address *"
                    className="h-11 w-full rounded-xl border border-border px-3 text-sm outline-none focus:border-[#2563eb]"
                    required
                  />
                </FormSection>

                <FormSection title="Select Detail">
                  <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border/70 px-3 py-3">
                    <Layers3 className="h-5 w-5 shrink-0 text-[#2563eb]" />
                    <span className="text-sm font-semibold text-text">Quantity</span>
                    <input
                      type="number"
                      min={MIN_QTY}
                      max={MAX_QTY}
                      value={quantity}
                      onChange={(event) =>
                        setQuantity(
                          Math.min(
                            MAX_QTY,
                            Math.max(MIN_QTY, Number(event.target.value) || MIN_QTY),
                          ),
                        )
                      }
                      className="ml-auto h-10 w-24 rounded-lg border border-border px-3 text-sm outline-none focus:border-[#2563eb]"
                    />
                  </div>
                  <p className="text-xs text-[#2563eb]">
                    (Min Qty.: {MIN_QTY}, Max Qty.: {MAX_QTY})
                  </p>

                  <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border/70 px-3 py-3">
                    <Printer className="h-5 w-5 shrink-0 text-[#2563eb]" />
                    <span className="text-sm font-semibold text-text">Printing</span>
                    <select
                      value={printing}
                      onChange={(event) => setPrinting(event.target.value)}
                      className="ml-auto h-10 rounded-lg border border-border px-3 text-sm outline-none focus:border-[#2563eb]"
                    >
                      {PRINTING_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </FormSection>

                <FormSection title="Privacy Packing">
                  <div className="grid gap-2 sm:grid-cols-2">
                    <RadioOption
                      name="privacy"
                      value="required"
                      checked={privacyPacking === "required"}
                      onChange={(value) =>
                        setPrivacyPacking(value as "required" | "not-required")
                      }
                      label="Required"
                      icon={<Lock className="h-5 w-5" />}
                    />
                    <RadioOption
                      name="privacy"
                      value="not-required"
                      checked={privacyPacking === "not-required"}
                      onChange={(value) =>
                        setPrivacyPacking(value as "required" | "not-required")
                      }
                      label="Not Required"
                      icon={<LockOpen className="h-5 w-5" />}
                    />
                  </div>
                </FormSection>

                {freeDeliveryEligible ? (
                  <p className="py-3 text-center text-xs font-bold uppercase tracking-wide text-text sm:text-sm">
                    Congratulations! Order&apos;s eligible for free delivery
                  </p>
                ) : null}

                <FormSection title="Select File Option">
                  <div className="grid gap-2 sm:grid-cols-2">
                    <RadioOption
                      name="fileOption"
                      value="attach-online"
                      checked={fileOption === "attach-online"}
                      onChange={(value) =>
                        setFileOption(value as "attach-online" | "send-email")
                      }
                      label="Attach File Online"
                      icon={<CloudUpload className="h-5 w-5" />}
                    />
                    <RadioOption
                      name="fileOption"
                      value="send-email"
                      checked={fileOption === "send-email"}
                      onChange={(value) =>
                        setFileOption(value as "attach-online" | "send-email")
                      }
                      label="Send via Email"
                      icon={<Mail className="h-5 w-5" />}
                    />
                  </div>
                  {fileOption === "attach-online" ? (
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,.ai,.psd,.cdr"
                      onChange={(event) =>
                        setAttachedFileName(event.target.files?.[0]?.name ?? "")
                      }
                      className="w-full rounded-xl border border-dashed border-border px-3 py-2 text-sm text-text/70 file:mr-3 file:rounded-lg file:border-0 file:bg-[#2563eb]/10 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-[#2563eb]"
                    />
                  ) : null}
                </FormSection>

                <div className="py-4">
                  <label className="text-sm font-semibold text-text">
                    Special Remark (Optional)
                  </label>
                  <textarea
                    value={specialRemark}
                    onChange={(event) => setSpecialRemark(event.target.value)}
                    rows={3}
                    placeholder="Remarks for order processing team..."
                    className="mt-2 w-full rounded-xl border border-border px-3 py-2.5 text-sm outline-none focus:border-[#2563eb]"
                  />
                </div>

                {error ? (
                  <p className="pb-3 text-sm font-medium text-red-600">{error}</p>
                ) : null}

                <button
                  type="submit"
                  disabled={submitting}
                  className="mb-6 w-full rounded-xl bg-[#2563eb] py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#1d4ed8] disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Add Order (Request Quote)"}
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
