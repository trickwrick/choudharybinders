"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { fadeUp } from "@/lib/animations";
import Button from "./Button";
import Container from "./Container";

export default function CTABannerSection() {
  return (
    <section className="relative overflow-hidden py-12 sm:py-16">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-dark" />
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />
      <div className="brand-tricolor-bar absolute inset-x-0 top-0 h-1" />

      <Container className="relative">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white sm:text-sm">
            Ready to get started?
          </p>
          <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">
            Get Your Free Quote Today
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/95 sm:text-base">
            Premium printing, signage &amp; branding solutions — trusted since
            1980. Call us or send your requirement and we&apos;ll respond
            quickly.
          </p>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Button
              href="#contact"
              variant="accent"
              size="lg"
              className="!rounded-full !px-8 !shadow-lg"
            >
              Get Free Quote
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              href="https://wa.me/917821013457"
              size="lg"
              className="!rounded-full !border-0 !bg-[#25D366] !px-8 !text-white !shadow-lg hover:!brightness-105"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Us
            </Button>
            <Button
              href="tel:+917821013457"
              size="lg"
              className="!rounded-full !border-0 !bg-white !px-8 !font-bold !text-slate-900 !shadow-lg hover:!bg-white/95"
            >
              <Phone className="h-4 w-4" />
              +91-7821013457
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
