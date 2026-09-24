import type { Metadata } from "next";
import ContactSectionWrapper from "@/components/ContactSectionWrapper";
import FloatingActions from "@/components/FloatingActions";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Contact Us | Choudhary Binders & Printers",
  description:
    "Get in touch with Choudhary Binders & Printers in Jaipur for printing, signage, flex boards, LED signs, and custom branding solutions.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-29">
        {/* Contact Us Page Header */}
        <div className="relative overflow-hidden bg-slate-50 py-10 sm:py-12 lg:py-14">
          {/* Decorative background elements */}
          <div className="absolute inset-0 z-0 opacity-40">
            {/* Left dots pattern */}
            <div className="absolute -left-10 bottom-0 h-40 w-40 bg-[radial-gradient(circle,#10b981_2px,transparent_2px)] bg-size-[16px_16px]" style={{ maskImage: 'radial-gradient(ellipse at bottom left, black 40%, transparent 70%)', WebkitMaskImage: 'radial-gradient(ellipse at bottom left, black 40%, transparent 70%)' }}></div>
            {/* Right waves */}
            <div className="absolute right-20 top-1/2 -translate-y-1/2 hidden md:block">
              <svg width="60" height="40" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 10C10 10 15 0 30 0C45 0 50 10 60 10" stroke="#10b981" strokeWidth="2" fill="none"/>
                <path d="M0 20C10 20 15 10 30 10C45 10 50 20 60 20" stroke="#10b981" strokeWidth="2" fill="none"/>
                <path d="M0 30C10 30 15 20 30 20C45 20 50 30 60 30" stroke="#10b981" strokeWidth="2" fill="none"/>
              </svg>
            </div>
            {/* Right dots pattern */}
            <div className="absolute -right-10 top-0 h-full w-20 bg-[radial-gradient(circle,#ef4444_2px,transparent_2px)] bg-size-[16px_16px]"></div>
          </div>
          
          <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-text sm:text-4xl lg:text-5xl">
              Contact Us
            </h1>
            <div className="mt-4 flex items-center gap-2 text-sm font-medium text-text/60">
              <a href="/" className="hover:text-primary transition-colors">Home</a>
              <span>/</span>
              <span className="text-primary">Contact us</span>
            </div>
          </div>
        </div>

        <ContactSectionWrapper />
        
        {/* Google Maps Embed */}
        <div className="w-full h-75 md:h-[350px]">
          <iframe
            title="Choudhary Binders & Printers Location"
            src="https://maps.google.com/maps?q=B-59%2C%20Unnati%20Tower%2C%20Central%20Spine%2C%20Vidhyadhar%20Nagar%2C%20Jaipur&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full grayscale-[20%] contrast-[1.1] hue-rotate-180 invert-[5%] sm:grayscale-0 sm:contrast-100 sm:hue-rotate-0 sm:invert-0"
          />
        </div>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
