"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X, Menu } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Button from "./Button";
import Container from "./Container";
import Logo from "./Logo";
import QuoteModal from "./QuoteModal";
import TopBar from "./TopBar";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "All Products", href: "/category" },
  { label: "Gallery", href: "/gallery" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

function getSectionId(href: string): string | null {
  if (href.startsWith("/#")) return href.slice(2);
  if (href.startsWith("#")) return href.slice(1);
  return null;
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navLinks
      .map((link) => getSectionId(link.href))
      .filter(Boolean) as string[];
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

  const openQuoteModal = useCallback(() => {
    setIsMobileOpen(false);
    setIsQuoteOpen(true);
  }, []);

  const isLinkActive = useCallback(
    (href: string) => {
      if (href === "/about") return pathname === "/about";
      if (href === "/contact") return pathname === "/contact";
      if (href === "/gallery") return pathname === "/gallery";
      if (href === "/category") {
        return pathname === "/category" || pathname.startsWith("/category/");
      }
      if (href === "/#home" || href === "/") {
        return pathname === "/" && activeSection === "#home";
      }

      const sectionId = getSectionId(href);
      return sectionId
        ? pathname === "/" && activeSection === `#${sectionId}`
        : false;
    },
    [activeSection, pathname],
  );

  const isHome = pathname === "/";
  const isHeroOverlay = isHome && !isScrolled;

  const linkClass = (href: string, mobile = false) => {
    const active = isLinkActive(href);
    if (mobile) {
      return `flex items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium transition-all duration-200 ${
        active
          ? "bg-primary/15 text-primary font-semibold"
          : "text-text/75 hover:bg-accent/10 hover:text-accent"
      }`;
    }

    if (isHeroOverlay) {
      return `relative rounded-lg px-2.5 py-2 text-[13px] font-medium transition-all duration-200 xl:px-3 xl:text-sm ${
        active
          ? "text-white font-semibold underline decoration-white/80 decoration-2 underline-offset-[6px]"
          : "text-white/90 hover:text-white"
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
          <TopBar overlay={isHeroOverlay} />
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
            isHeroOverlay
              ? "border-none bg-transparent shadow-none"
              : isScrolled
                ? "border-b border-border/80 bg-white/95 backdrop-blur-lg"
                : "border-b border-border/50 bg-white/90 backdrop-blur-md"
          }`}
        >
          {!isHeroOverlay ? (
            <div className="brand-tricolor-bar absolute inset-x-0 bottom-0 h-[2px]" />
          ) : null}

          <Container
            as="nav"
            className={`flex items-center justify-between gap-4 transition-all duration-300 ${
              isScrolled ? "h-[5rem]" : "h-[5.5rem]"
            }`}
          >
            <Logo size="md" className="shrink-0" onDark={isHeroOverlay} />

            <ul className="hidden flex-1 items-center justify-center gap-0.5 lg:flex xl:gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={linkClass(link.href)}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="hidden shrink-0 items-center gap-3 lg:flex">
              <Button
                type="button"
                variant="accent"
                size="sm"
                className="btn-shiny-quote rounded-full px-5 shadow-md"
                onClick={openQuoteModal}
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
                  : isHeroOverlay
                    ? "border-white/40 bg-transparent text-white hover:border-white/60"
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
                  {navLinks.map((link, index) => (
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
              </div>

              <div className="border-t border-border p-4">
                <Button
                  type="button"
                  variant="accent"
                  className="w-full rounded-full"
                  onClick={openQuoteModal}
                >
                  Get Quote
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <QuoteModal open={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </>
  );
}
