import type { Metadata } from "next";
import AboutSection from "@/components/AboutSection";
import ClientsSection from "@/components/ClientsSection";
import FloatingActions from "@/components/FloatingActions";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProcessSection from "@/components/ProcessSection";
import SolutionsSection from "@/components/SolutionsSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";

export const metadata: Metadata = {
  title: "About Us | Choudhary Binders & Printers",
  description:
    "Learn about Choudhary Binders & Printers — trusted printing, signage, and branding experts in Jaipur since 1980.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[7.25rem]">
        <AboutSection contactHref="/contact" />
        <SolutionsSection />
        <WhyChooseUsSection />
        <ProcessSection />
        <ClientsSection />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
