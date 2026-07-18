"use client";

import { Clock, MapPin, Phone } from "lucide-react";
import Container from "./Container";

export default function TopBar() {
  return (
    <div className="topbar-tricolor-bg relative overflow-hidden border-b border-black/20">
      <Container className="relative flex h-9 items-center justify-between gap-4 text-xs sm:text-sm">
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="tel:+917821013457"
            className="topbar-tricolor-item shrink-0 transition-colors"
          >
            <Phone className="h-3 w-3" strokeWidth={2.5} />
            <span className="hidden sm:inline">+91-7821013457</span>
            <span className="sm:hidden">Call Us</span>
          </a>
          <span className="topbar-tricolor-item hidden md:flex">
            <MapPin className="h-3.5 w-3.5" strokeWidth={2.25} />
            Vidhyadhar Nagar, Jaipur
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="topbar-tricolor-item hidden text-[10px] font-bold uppercase tracking-wider sm:inline-flex sm:text-xs">
            Since 1980
          </span>
          <span className="topbar-tricolor-item font-medium">
            <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.25} />
            <span className="hidden sm:inline">24/7 Available</span>
            <span className="sm:hidden">24/7</span>
          </span>
        </div>
      </Container>
    </div>
  );
}
