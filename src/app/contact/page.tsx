import type { Metadata } from "next";
import ContactSectionWrapper from "@/components/ContactSectionWrapper";
import FloatingActions from "@/components/FloatingActions";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";

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
        <PageHeader title="Contact Us" tag="GET IN TOUCH" />

        <ContactSectionWrapper hideHeader />
        
        {/* Google Maps Embed */}
        <div className="w-full h-75 md:h-87.5">
          <iframe
            title="Choudhary Binders & Printers Location"
            src="https://maps.google.com/maps?q=B-59%2C%20Unnati%20Tower%2C%20Central%20Spine%2C%20Vidhyadhar%20Nagar%2C%20Jaipur&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full grayscale-20 contrast-[1.1] hue-rotate-180 invert-5 sm:grayscale-0 sm:contrast-100 sm:hue-rotate-0 sm:invert-0"
          />
        </div>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
