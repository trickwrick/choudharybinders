"use client";

import { CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { type FormEvent, useEffect, useState } from "react";
import Button from "./Button";
import Container from "./Container";
import Reveal from "./motion/Reveal";
import { contactDetails } from "@/lib/site-content";

function ModalContactForm({
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

      <Button type="submit" size="lg" disabled={loading} className="w-full">
        {loading ? "Sending..." : "Submit Enquiry"}
      </Button>
    </form>
  );
}

function PageContactForm({
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
      <div className="py-8 text-center border border-border rounded-xl p-8 bg-gray-50/50">
        <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
        <p className="mt-4 text-xl font-bold text-text">Thank you for getting in touch!</p>
        <p className="mt-2 text-text/70">We have received your enquiry and will contact you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text/90">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            name="companyName"
            type="text"
            required
            className="w-full rounded-md border border-border/80 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text/90">
            Person Name <span className="text-red-500">*</span>
          </label>
          <input
            name="name"
            type="text"
            required
            className="w-full rounded-md border border-border/80 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text/90">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-md border border-border/80 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text/90">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <input
            name="phone"
            type="tel"
            required
            className="w-full rounded-md border border-border/80 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text/90">
            Whatsapp Number <span className="text-red-500">*</span>
          </label>
          <input
            name="whatsapp"
            type="tel"
            required
            className="w-full rounded-md border border-border/80 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text/90">
            Contact Type <span className="text-red-500">*</span>
          </label>
          <select
            name="contactType"
            required
            className="w-full rounded-md border border-border/80 px-4 py-2.5 text-sm bg-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary appearance-none"
          >
            <option value="">Select Type</option>
            <option value="General Enquiry">General Enquiry</option>
            <option value="Quote Request">Quote Request</option>
            <option value="Support">Support</option>
          </select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text/90">
            City <span className="text-red-500">*</span>
          </label>
          <input
            name="city"
            type="text"
            required
            className="w-full rounded-md border border-border/80 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text/90">
            State <span className="text-red-500">*</span>
          </label>
          <input
            name="state"
            type="text"
            required
            className="w-full rounded-md border border-border/80 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text/90">
            Country <span className="text-red-500">*</span>
          </label>
          <input
            name="country"
            type="text"
            required
            className="w-full rounded-md border border-border/80 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-text/90">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          name="messageText"
          required
          rows={4}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="w-full resize-none rounded-md border border-border/80 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-primary px-8 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark disabled:opacity-70"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
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

    let finalMessage = formData.get("messageText") as string || formData.get("message") as string || "";

    if (!inModal) {
      const company = formData.get("companyName");
      const whatsapp = formData.get("whatsapp");
      const contactType = formData.get("contactType");
      const city = formData.get("city");
      const state = formData.get("state");
      const country = formData.get("country");
      
      finalMessage = `Company: ${company}\nWhatsApp: ${whatsapp}\nType: ${contactType}\nLocation: ${city}, ${state}, ${country}\n\nMessage:\n${finalMessage}`;
    }

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          message: finalMessage,
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

  if (inModal) {
    return (
      <section className="py-4">
        {productTitle ? (
          <p className="mb-4 text-center text-sm font-semibold text-primary">
            Quote: {productTitle}
          </p>
        ) : null}
        <ModalContactForm
          handleSubmit={handleSubmit}
          message={message}
          setMessage={setMessage}
          error={error}
          loading={loading}
          submitted={submitted}
        />
      </section>
    );
  }

  return (
    <section id="contact" className="bg-white py-12 sm:py-20">
      <Container>
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <p className="text-sm font-semibold tracking-wide text-primary mb-2">
                Contact Us
              </p>
              <h2 className="text-3xl font-bold text-text sm:text-4xl mb-4">
                Get In Touch With Us
              </h2>
              <p className="text-sm text-text/70 sm:text-base mb-8 max-w-2xl">
                If you have any questions or enquiries please feel free to contact us alternatively you can complete our online enquiry form located below and we will get back to you as soon as possible.
              </p>

              <PageContactForm
                handleSubmit={handleSubmit}
                message={message}
                setMessage={setMessage}
                error={error}
                loading={loading}
                submitted={submitted}
              />
            </div>

            {/* Sidebar Section */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 rounded-lg bg-gray-50 p-6 sm:p-8 h-fit">
                <h3 className="text-xl font-bold text-text mb-6">Contact Info</h3>
                
                <h4 className="font-semibold text-text mb-4">Choudhary Binders & Printers</h4>
                <p className="text-sm font-medium text-text/80 mb-2">Warehouse:</p>
                
                <div className="space-y-5 mt-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 shrink-0 text-text/60 mt-0.5" />
                    <p className="text-sm text-text/70 leading-relaxed">
                      {contactDetails.address}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 shrink-0 text-text/60" />
                    <a href={`mailto:${contactDetails.emails[0]}`} className="text-sm text-text/70 hover:text-primary transition-colors">
                      {contactDetails.emails[0]}
                    </a>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 shrink-0 text-text/60 mt-0.5" />
                    <div className="flex flex-col gap-1.5">
                      {contactDetails.phones.slice(0, 2).map((phone) => (
                        <a key={phone.tel} href={phone.tel} className="text-sm text-text/70 hover:text-primary transition-colors">
                          {phone.display}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
