"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { type FormEvent, useEffect, useState } from "react";

export type ProductQuoteInfo = {
  productId: string;
  productTitle: string;
  categoryId: string;
  image?: string;
  quantity?: number;
  unit?: string;
  minQty?: string;
};

type ProductQuoteModalProps = {
  open: boolean;
  onClose: () => void;
  product: ProductQuoteInfo | null;
};

export default function ProductQuoteModal({
  open,
  onClose,
  product,
}: ProductQuoteModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open || !product) return;

    const qtyText =
      product.quantity != null
        ? ` Quantity: ${product.quantity}${product.unit ? ` ${product.unit}` : ""}.`
        : product.minQty
          ? ` Min. Qty: ${product.minQty}.`
          : "";

    setMessage(
      `I am interested in ${product.productTitle}.${qtyText} Please share the best price and delivery timeline.`,
    );
    setSubmitted(false);
    setError("");
    setName("");
    setEmail("");
    setPhone("");
  }, [open, product]);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!product) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          message: message.trim(),
          productId: product.productId,
          productTitle: product.productTitle,
          categoryId: product.categoryId,
          quantity: product.quantity,
          unit: product.unit,
          source: "quote",
        }),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && product ? (
        <>
          <motion.button
            type="button"
            aria-label="Close quote form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-text/40 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-quote-title"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed inset-x-3 top-1/2 z-[61] mx-auto w-full max-w-md -translate-y-1/2 overflow-hidden rounded-2xl border border-border bg-white shadow-2xl sm:inset-x-6"
          >
            <div className="brand-tricolor-bar h-1" />

            <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                  Get Quote
                </p>
                <h2
                  id="product-quote-title"
                  className="text-base font-bold text-text"
                >
                  Request Price
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-light-bg text-text transition-colors hover:border-primary/30 hover:text-primary"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="px-4 py-3">
              <div className="mb-3 flex items-center gap-2.5 rounded-xl border border-primary/15 bg-section-mint px-2.5 py-2">
                {product.image ? (
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-white">
                    <Image
                      src={product.image}
                      alt={product.productTitle}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-text">
                    {product.productTitle}
                  </p>
                  {product.quantity != null ? (
                    <p className="text-xs text-text/60">
                      Qty: {product.quantity}
                      {product.unit ? ` ${product.unit}` : ""}
                    </p>
                  ) : product.minQty ? (
                    <p className="text-xs text-text/60">
                      Min. Qty: {product.minQty}
                    </p>
                  ) : null}
                </div>
              </div>

              {submitted ? (
                <div className="rounded-xl border border-primary/20 bg-section-mint px-4 py-6 text-center">
                  <p className="text-base font-bold text-primary">
                    Quote request sent!
                  </p>
                  <p className="mt-1.5 text-sm text-text/65">
                    We received your details for{" "}
                    <strong className="text-text">{product.productTitle}</strong>.
                    Our team will contact you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-4 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-2">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Your Name *"
                    className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary"
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="Phone No. *"
                      className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary"
                    />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="Email ID *"
                      className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary"
                    />
                  </div>

                  <textarea
                    required
                    rows={2}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Message *"
                    className="w-full resize-none rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary"
                  />

                  {error ? (
                    <p className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600">
                      {error}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white disabled:opacity-60"
                  >
                    {loading ? "Sending..." : "Submit Quote Request"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
