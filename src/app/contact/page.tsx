import type { Metadata } from "next";
import ContactSectionWrapper from "@/components/ContactSectionWrapper";
import FloatingActions from "@/components/FloatingActions";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQSection from "@/components/FAQSection";

export const metadata: Metadata = {
  title: "Contact Us | Choudhary Binders & Printers",
  description:
    "Get in touch with Choudhary Binders & Printers in Jaipur for printing, signage, flex boards, LED signs, and custom branding solutions.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[7.25rem]">
        <ContactSectionWrapper />
        <FAQSection />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
