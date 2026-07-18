"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";
import Container from "./Container";
import SectionHeading from "./SectionHeading";

const faqs = [
  {
    question: "What printing services do you offer?",
    answer:
      "We offer offset printing, flex & banner printing, LED sign boards, shop branding, outdoor hoardings, promotional materials, ACP fabrication, newspaper & magazine advertising, and complete visual identity solutions.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Standard orders are typically completed within 2–5 business days depending on quantity and complexity. Urgent orders can be accommodated — contact us with your deadline and we'll confirm feasibility.",
  },
  {
    question: "Do you provide design services?",
    answer:
      "Yes. Our in-house team can create artwork from scratch or refine your existing designs. Design support is included or available at nominal charges depending on the project scope.",
  },
  {
    question: "Do you deliver outside Jaipur?",
    answer:
      "Absolutely. We serve clients across Rajasthan and pan-India. Delivery charges and timelines vary by location and order size — we'll provide a clear quote upfront.",
  },
  {
    question: "What is the minimum order quantity?",
    answer:
      "Minimum order varies by product — single banner stands to bulk offset print runs. Share your requirement and we'll advise the most cost-effective option for your needs.",
  },
  {
    question: "Do you offer installation for sign boards?",
    answer:
      "Yes. We provide professional on-site installation for LED boards, shop front signage, hoardings, and outdoor branding across Jaipur and nearby areas.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-12 sm:py-16 lg:py-20">
      <Container>
        <SectionHeading spaced className="!mb-4 sm:!mb-5">
          FAQ
        </SectionHeading>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mb-10 max-w-2xl text-center text-sm text-text/60 sm:mb-12 sm:text-base"
        >
          Common questions about our printing &amp; branding services
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          className="mx-auto max-w-3xl space-y-3"
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={faq.question}
                variants={staggerItem}
                className={`overflow-hidden rounded-xl border transition-colors duration-300 ${
                  isOpen
                    ? "border-primary/30 bg-light-bg/80 shadow-sm"
                    : "border-border/70 bg-white hover:border-primary/20"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold text-text sm:text-base">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="border-t border-border/60 px-5 pb-5 pt-3 text-sm leading-relaxed text-text/65 sm:px-6 sm:pb-6">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
