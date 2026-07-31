"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Suspense, useEffect } from "react";
import ContactSection from "./ContactSection";

type QuoteModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function QuoteModal({ open, onClose }: QuoteModalProps) {
  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
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
            aria-labelledby="quote-modal-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed inset-x-3 top-[5vh] z-[61] mx-auto flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-2xl sm:inset-x-6"
          >
            <div className="brand-tricolor-bar h-1 shrink-0" />

            <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-3 sm:px-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  Get Quote
                </p>
                <h2 id="quote-modal-title" className="text-lg font-bold text-text sm:text-xl">
                  Contact Us
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-light-bg text-text transition-colors hover:border-primary/30 hover:text-primary"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-1 py-2 sm:px-2">
              <Suspense
                fallback={
                  <p className="px-4 py-8 text-center text-sm text-text/60">Loading form...</p>
                }
              >
                <ContactSection inModal />
              </Suspense>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
