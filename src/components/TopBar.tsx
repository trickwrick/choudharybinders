"use client";

import { Clock, MapPin, Phone } from "lucide-react";
import Container from "./Container";

export default function TopBar({ overlay = false }: { overlay?: boolean }) {
  return (
    <div
      className={
        overlay
          ? "relative overflow-hidden bg-transparent"
          : "topbar-tricolor-bg relative overflow-hidden border-b border-black/20"
      }
    >
      <Container className="relative flex h-9 items-center justify-between gap-4 text-xs sm:text-sm">
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="tel:+917821013457"
            className={`shrink-0 transition-colors ${overlay ? "topbar-overlay-item" : "topbar-tricolor-item"}`}
          >
            <Phone className="h-3 w-3" strokeWidth={2.5} />
            <span className="hidden sm:inline">+91-7821013457</span>
            <span className="sm:hidden">Call Us</span>
          </a>
          <span className={`hidden lg:flex whitespace-nowrap ${overlay ? "topbar-overlay-item" : "topbar-tricolor-item"}`}>
            <MapPin className="h-3.5 w-3.5" strokeWidth={2.25} />
            Vidhyadhar Nagar, Jaipur
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <span
            className={`hidden text-[10px] font-bold uppercase tracking-wider md:inline-flex sm:text-xs whitespace-nowrap ${
              overlay ? "topbar-overlay-item" : "topbar-tricolor-item !text-slate-800"
            }`}
          >
            Since 1957
          </span>
        </div>
      </Container>
    </div>
  );
}
