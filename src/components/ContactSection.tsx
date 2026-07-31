"use client";

import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { type FormEvent, useEffect, useState } from "react";
import { fadeUp, slideFromLeft, slideFromRight, staggerContainer } from "@/lib/animations";
import Container from "./Container";
import SectionHeading from "./SectionHeading";

const contactBlocks = [
  {
    icon: MapPin,
    title: "Our Office Address",
    content: (
      <p className="pl-7 text-sm leading-relaxed text-text/70">
        B-25, Basement, Unnati Tower, Central Spine, Vidhyadhar Nagar,
        Jaipur, Rajasthan — 302039
      </p>
    ),
  },
  {
    icon: Mail,
    title: "General Enquiries",
    content: (
      <a
        href="mailto:choudharybinders@gmail.com"
        className="pl-7 text-sm text-text/70 transition-colors hover:text-primary"
      >
        choudharybinders@gmail.com
      </a>
    ),
  },
  {
    icon: Phone,
    title: "Call Us",
    content: (
      <ul className="space-y-1 pl-7 text-sm text-text/70">
        <li>
          <a href="tel:01414107270" className="hover:text-primary">
            0141-4107270
          </a>
        </li>
        <li>
          <a href="tel:+917220015427" className="hover:text-primary">
            +91-7220015427
          </a>
        </li>
        <li>
          <a href="tel:+919829015427" className="hover:text-primary">
            +91-9829015427
          </a>
        </li>
      </ul>
    ),
  },
  {
    icon: Clock,
    title: "Our Timing",
    content: (
      <p className="pl-7 text-sm text-text/70">24/7 Services Available</p>
    ),
  },
];

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
          quantity: searchParams.get("qty")
            ? Number(searchParams.get("qty"))
            : undefined,
          unit: searchParams.get("unit") ?? undefined,
          source: productTitle ? "quote" : "contact",
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
    <section
      id={inModal ? undefined : "contact"}
      className={inModal ? "bg-white py-4 sm:py-6" : "bg-white py-12 sm:py-16"}
    >
      <Container>
        {!inModal ? <SectionHeading spaced>Contact Us</SectionHeading> : null}

        {productTitle ? (
          <div className="mx-auto mb-8 max-w-2xl rounded-2xl border border-primary/15 bg-section-mint px-5 py-4 text-center">
            <p className="text-sm font-semibold text-primary">Quote Request</p>
            <p className="mt-1 text-base font-bold text-text">{productTitle}</p>
          </div>
        ) : null}

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {contactBlocks.map((block) => (
              <motion.div key={block.title} variants={slideFromLeft}>
                <div className="mb-2 flex items-center gap-2">
                  <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
                    <block.icon className="h-5 w-5 text-primary/60" />
                  </motion.div>
                  <h3 className="text-sm font-bold uppercase text-text">
                    {block.title}
                  </h3>
                </div>
                {block.content}
              </motion.div>
            ))}
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {[
              { type: "text", name: "name", placeholder: "YOUR NAME" },
              { type: "email", name: "email", placeholder: "YOUR EMAIL" },
              { type: "tel", name: "phone", placeholder: "YOUR CONTACT NO" },
            ].map((field) => (
              <motion.div key={field.name} variants={slideFromRight}>
                <motion.input
                  whileFocus={{ scale: 1.01, borderColor: "var(--primary)" }}
                  type={field.type}
                  name={field.name}
                  required
                  placeholder={field.placeholder}
                  className="w-full rounded-md border border-border bg-white px-4 py-3 text-sm uppercase tracking-wide text-text placeholder:text-text/40 transition-shadow focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </motion.div>
            ))}
            <motion.div variants={slideFromRight}>
              <motion.textarea
                whileFocus={{ scale: 1.01 }}
                name="message"
                required
                rows={5}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="YOUR MESSAGE"
                className="w-full resize-none rounded-md border border-border bg-white px-4 py-3 text-sm uppercase tracking-wide text-text placeholder:text-text/40 transition-shadow focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </motion.div>
            {error ? (
              <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
            ) : null}
            <motion.div variants={fadeUp}>
              <motion.button
                type="submit"
                disabled={loading || submitted}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-brand-cta uppercase tracking-wide disabled:opacity-70"
              >
                {submitted ? "Message Sent!" : loading ? "Sending..." : "Submit"}
              </motion.button>
            </motion.div>
          </motion.form>
        </div>
      </Container>
    </section>
  );
}
