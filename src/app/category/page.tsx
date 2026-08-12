import type { Metadata } from "next";
import CategoryPageContent from "@/components/CategoryPageContent";
import FloatingActions from "@/components/FloatingActions";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Category | Choudhary Binders & Printers",
  description:
    "Browse all printing and branding categories — offset, flex, digital, signage, binding, gifting, outdoor advertising and more in Jaipur.",
};

export default function CategoryPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[7.25rem]">
        <CategoryPageContent />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
