"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, X, Menu } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import Button from "./Button";
import Container from "./Container";
import Logo from "./Logo";
import TopBar from "./TopBar";

const primaryLinks = [
  { label: "Home", href: "#home" },
  { label: "Category", href: "#category" },
  { label: "Products", href: "#products" },
  { label: "Services", href: "#services" },
  { label: "About Us", href: "#about" },
  { label: "Contact Us", href: "#contact" },
];

const moreLinks = [
  { label: "Why Us", href: "#why-us" },
  { label: "Gallery", href: "#gallery" },
  { label: "Videos", href: "#videos" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

const allLinks = [...primaryLinks, ...moreLinks];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const moreRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = allLinks.map((link) => link.href.slice(1));
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveSection(`#${visible[0].target.id}`);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  useEffect(() => {
    const closeOnNavigate = () => setIsMobileOpen(false);
    window.addEventListener("hashchange", closeOnNavigate);
    return () => window.removeEventListener("hashchange", closeOnNavigate);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isLinkActive = useCallback(
    (href: string) => activeSection === href,
    [activeSection]
  );

  const isMoreActive = moreLinks.some((link) => isLinkActive(link.href));

  const linkClass = (href: string, mobile = false) => {
    const active = isLinkActive(href);
    if (mobile) {
      return `flex items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium transition-all duration-200 ${
        active
          ? "bg-primary/15 text-primary font-semibold"
          : "text-text/75 hover:bg-accent/10 hover:text-accent"
      }`;
    }
    return `relative rounded-lg px-2.5 py-2 text-[13px] font-medium transition-all duration-200 xl:px-3 xl:text-sm ${
      active
        ? "bg-primary/15 text-primary font-semibold"
        : "text-text/70 hover:bg-accent/10 hover:text-accent"
    }`;
  };

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50">
        <motion.div
          animate={{
            height: isScrolled ? 0 : 36,
            opacity: isScrolled ? 0 : 1,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <TopBar />
        </motion.div>

        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            boxShadow: isScrolled
              ? "0 8px 32px -8px rgba(17, 192, 17, 0.22)"
              : "0 0 0 rgba(0,0,0,0)",
          }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className={`relative transition-colors duration-500 ${
            isScrolled
              ? "border-b border-border/80 bg-white/95 backdrop-blur-lg"
              : "border-b border-border/50 bg-white/90 backdrop-blur-md"
          }`}
        >
          <div className="brand-tricolor-bar absolute inset-x-0 bottom-0 h-[2px]" />

          <Container
            as="nav"
            className={`flex items-center justify-between gap-4 transition-all duration-300 ${
              isScrolled ? "h-[4.25rem]" : "h-20"
            }`}
          >
            <Logo size="md" className="shrink-0" />

            <ul className="hidden flex-1 items-center justify-center gap-0.5 lg:flex xl:gap-1">
              {primaryLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={linkClass(link.href)}>
                    {link.label}
                  </a>
                </li>
              ))}

              <li ref={moreRef} className="relative">
                <button
                  type="button"
                  onClick={() => setIsMoreOpen((open) => !open)}
                  aria-expanded={isMoreOpen}
                  aria-haspopup="true"
                  className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-all duration-200 xl:px-3 xl:text-sm ${
                    isMoreActive || isMoreOpen
                      ? "bg-primary/15 text-primary font-semibold"
                      : "text-text/70 hover:bg-accent/10 hover:text-accent"
                  }`}
                >
                  More
                  <motion.span
                    animate={{ rotate: isMoreOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-3.5 w-3.5" />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {isMoreOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-1/2 top-full z-50 mt-2 w-48 -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-white py-1.5 shadow-xl shadow-black/10"
                    >
                      {moreLinks.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsMoreOpen(false)}
                          className={`block px-4 py-2.5 text-sm font-medium transition-colors ${
                            isLinkActive(link.href)
                              ? "bg-primary/15 text-primary font-semibold"
                              : "text-text/75 hover:bg-accent/10 hover:text-accent"
                          }`}
                        >
                          {link.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            </ul>

            <div className="hidden shrink-0 items-center gap-3 lg:flex">
              <Button
                href="#contact"
                variant="accent"
                size="sm"
                className="btn-shiny-quote rounded-full px-5 shadow-md"
              >
                Get Quote
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className={`relative z-50 flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 lg:hidden ${
                isMobileOpen
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-white text-text shadow-sm hover:border-primary/40 hover:text-primary"
              }`}
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </Container>
        </motion.header>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-text/25 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 z-40 flex w-full max-w-[320px] flex-col border-l border-border bg-white shadow-2xl lg:hidden"
            >
              <div className="brand-tricolor-bar absolute inset-y-0 left-0 w-1" />

              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <Logo size="md" />
                <button
                  type="button"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-light-bg text-text"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4">
                <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-text/40">
                  Menu
                </p>
                <nav className="flex flex-col gap-0.5">
                  {primaryLinks.map((link, index) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 }}
                      onClick={() => setIsMobileOpen(false)}
                      className={linkClass(link.href, true)}
                    >
                      {link.label}
                      {isLinkActive(link.href) && (
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      )}
                    </motion.a>
                  ))}
                </nav>

                <p className="mb-2 mt-6 px-2 text-[10px] font-bold uppercase tracking-widest text-text/40">
                  More
                </p>
                <nav className="flex flex-col gap-0.5">
                  {moreLinks.map((link, index) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.04 }}
                      onClick={() => setIsMobileOpen(false)}
                      className={linkClass(link.href, true)}
                    >
                      {link.label}
                      {isLinkActive(link.href) && (
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      )}
                    </motion.a>
                  ))}
                </nav>
              </div>

              <div className="border-t border-border p-4">
                <Button
                  href="#contact"
                  variant="accent"
                  className="w-full rounded-full"
                >
                  Get Quote
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
