import type { Metadata } from "next";
import FloatingActions from "@/components/FloatingActions";
import Footer from "@/components/Footer";
import GalleryPageContent from "@/components/GalleryPageContent";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Gallery | Choudhary Binders & Printers",
  description:
    "Browse our complete gallery of printing, branding, signage, flex boards, LED signs, and outdoor advertising work in Jaipur.",
};

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[7.25rem]">
        <GalleryPageContent />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
