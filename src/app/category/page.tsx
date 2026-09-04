import type { Metadata } from "next";
import CategoryPageContent from "@/components/CategoryPageContent";
import FloatingActions from "@/components/FloatingActions";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getActiveCategoriesForPublic } from "@/lib/db/categories";
import { getProductsByCategoryMap } from "@/lib/db/products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Category | Choudhary Binders & Printers",
  description:
    "Browse all printing and branding categories — offset, flex, digital, signage, binding, gifting, outdoor advertising and more in Jaipur.",
};

export default async function CategoryPage() {
  const categories = await getActiveCategoriesForPublic();
  const productsByCategory = await getProductsByCategoryMap(
    categories.map((category) => category.id),
  );

  return (
    <>
      <Navbar />
      <main className="pt-29">
        <CategoryPageContent
          categories={categories}
          productsByCategory={productsByCategory}
        />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
