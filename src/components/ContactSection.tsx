"use client";

import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { type FormEvent, useState } from "react";
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

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="bg-white py-12 sm:py-16">
      <Container>
        <SectionHeading spaced>Contact Us</SectionHeading>

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
                placeholder="YOUR MESSAGE"
                className="w-full resize-none rounded-md border border-border bg-white px-4 py-3 text-sm uppercase tracking-wide text-text placeholder:text-text/40 transition-shadow focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </motion.div>
            <motion.div variants={fadeUp}>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-brand-cta uppercase tracking-wide"
              >
                {submitted ? "Message Sent!" : "Submit"}
              </motion.button>
            </motion.div>
          </motion.form>
        </div>
      </Container>
    </section>
  );
}
