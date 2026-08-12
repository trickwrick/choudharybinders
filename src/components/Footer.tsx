"use client";

import { motion } from "framer-motion";
import { ArrowUp, Clock, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { categories } from "@/lib/categories";
import { companyContent } from "@/lib/site-content";
import { businessInfo } from "@/lib/site-business";
import Container from "./Container";
import Logo from "./Logo";

const quickLinks = [
  { label: "Home", href: "/#home" },
  { label: "Category", href: "/category" },
  { label: "Services", href: "/#services" },
  { label: "About Us", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com",
    color: "text-[#1877F2]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com",
    color: "text-[#FF0000]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com",
    color: "text-[#E4405F]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com",
    color: "text-[#0A66C2]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.062 2.062 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

const workingHours = [
  { day: "Monday – Saturday", time: "9:00 AM – 7:00 PM" },
  { day: "Sunday", time: "Closed" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="relative bg-[#138808] text-white">
      <div className="brand-tricolor-bar h-1 w-full" />

      <Container className="py-12 lg:py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo size="lg" onDark />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/80">
              {companyContent.about}
            </p>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-lime">
              Since 1980 · {companyContent.tagline}
            </p>
            <div className="mt-5 flex gap-2.5">
              {socialLinks.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm transition-transform ${item.color}`}
                >
                  {item.icon}
                </motion.a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-brand-lime">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/75 transition-colors hover:text-white hover:underline underline-offset-4"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-brand-lime">
              Our Services
            </h3>
            <ul className="space-y-2.5">
              {categories.slice(0, 8).map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/category/${category.id}`}
                    className="text-sm text-white/75 transition-colors hover:text-white hover:underline underline-offset-4"
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-brand-lime">
              Contact Information
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-lime" />
                <span className="text-sm text-white/80">{businessInfo.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand-lime" />
                <div className="space-y-1 text-sm">
                  {businessInfo.phones.map((phone) => (
                    <a
                      key={phone.tel}
                      href={phone.tel}
                      className="block text-white/80 transition-colors hover:text-white"
                    >
                      {phone.display}
                    </a>
                  ))}
                  <a
                    href={businessInfo.landline.tel}
                    className="block text-white/80 transition-colors hover:text-white"
                  >
                    {businessInfo.landline.display}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand-lime" />
                <div className="space-y-1 text-sm">
                  {businessInfo.emails.map((email) => (
                    <a
                      key={email}
                      href={`mailto:${email}`}
                      className="block text-white/80 transition-colors hover:text-white"
                    >
                      {email}
                    </a>
                  ))}
                </div>
              </li>
            </ul>

            <div className="mt-5 rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
              <div className="mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4 text-brand-lime" />
                <span className="text-sm font-semibold">Working Hours</span>
              </div>
              <ul className="space-y-1.5">
                {workingHours.map((schedule) => (
                  <li
                    key={schedule.day}
                    className="flex justify-between gap-4 text-sm text-white/70"
                  >
                    <span>{schedule.day}</span>
                    <span className="text-white/90">{schedule.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/15 bg-[#0f6b06]">
        <Container className="flex flex-col items-center justify-between gap-4 py-4 sm:flex-row">
          <div className="text-center text-xs text-white/75 sm:text-left sm:text-sm">
            <p>
              Copyright &copy; {year}{" "}
              <span className="font-semibold text-white">Choudhary Binders & Printers</span>.
              All Rights Reserved.
            </p>
            <p className="mt-1">
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
              <span className="mx-2 text-white/40">|</span>
              <a href="#" className="hover:underline">
                Terms &amp; Conditions
              </a>
            </p>
          </div>
          <motion.button
            type="button"
            onClick={scrollToTop}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4" />
            Back to Top
          </motion.button>
        </Container>
      </div>
    </footer>
  );
}
