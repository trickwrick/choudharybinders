"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { type FormEvent, useEffect, useState } from "react";
import Button from "./Button";
import Container from "./Container";
import Reveal from "./motion/Reveal";

function ContactForm({
  handleSubmit,
  message,
  setMessage,
  error,
  loading,
  submitted,
}: {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  message: string;
  setMessage: (value: string) => void;
  error: string;
  loading: boolean;
  submitted: boolean;
}) {
  if (submitted) {
    return (
      <div className="py-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-primary" />
        <p className="mt-3 text-lg font-bold text-text">Thank you!</p>
        <p className="mt-1 text-sm text-text/60">We&apos;ll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-text">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className="w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-text">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="your@email.com"
            className="w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="mb-1 block text-sm font-medium text-text">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          placeholder="+91 98290 13457"
          className="w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-text">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="What do you need printed?"
          className="w-full resize-none rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <Button type="submit" size="lg" disabled={loading} className="w-full sm:w-auto">
        {loading ? "Sending..." : "Send Enquiry"}
        {!loading ? <ArrowRight className="h-4 w-4" /> : null}
      </Button>
    </form>
  );
}

export default function ContactSection({ inModal = false }: { inModal?: boolean }) {
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const productTitle = searchParams.get("product");
  const productId = searchParams.get("productId");
  const categoryId = searchParams.get("category");

  useEffect(() => {
    if (productTitle) {
      const qty = searchParams.get("qty");
      const unit = searchParams.get("unit");
      const qtyText = qty ? ` Quantity: ${qty}${unit ? ` ${unit}` : ""}.` : "";
      setMessage(
        `I am interested in ${productTitle}.${qtyText} Please share the best price and delivery timeline.`,
      );
    }
  }, [productTitle, searchParams]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          message: formData.get("message"),
          productId: productId ?? undefined,
          productTitle: productTitle ?? undefined,
          categoryId: categoryId ?? undefined,
          quantity: searchParams.get("qty") ? Number(searchParams.get("qty")) : undefined,
          unit: searchParams.get("unit") ?? undefined,
          source: productTitle ? "quote" : "contact",
        }),
      });

      if (!response.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const form = (
    <ContactForm
      handleSubmit={handleSubmit}
      message={message}
      setMessage={setMessage}
      error={error}
      loading={loading}
      submitted={submitted}
    />
  );

  if (inModal) {
    return (
      <section className="py-4">
        {productTitle ? (
          <p className="mb-4 text-center text-sm font-semibold text-primary">
            Quote: {productTitle}
          </p>
        ) : null}
        {form}
      </section>
    );
  }

  return (
    <section id="contact" className="bg-white py-12 sm:py-16">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Ready to Print?
          </p>
          <h2 className="mt-2 text-2xl font-bold text-text sm:text-3xl">
            Get a Free Quote
          </h2>
          <p className="mt-2 text-sm text-text/60 sm:text-base">
            Tell us what you need — we&apos;ll reply with price and delivery details.
          </p>
        </Reveal>

        {productTitle ? (
          <p className="mx-auto mt-6 max-w-3xl text-center text-sm font-medium text-primary">
            Enquiring about: {productTitle}
          </p>
        ) : null}

        <Reveal delay={0.1} className="mx-auto mt-8 max-w-3xl rounded-xl border border-border bg-white p-6 shadow-sm sm:p-10">
          {form}
        </Reveal>
      </Container>
    </section>
  );
}
