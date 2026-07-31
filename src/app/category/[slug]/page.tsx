import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryProductsPage from "@/components/CategoryProductsPage";
import FloatingActions from "@/components/FloatingActions";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { categories, getCategoryById, toCategorySummary, type CategoryId } from "@/lib/categories";
import { getProductsForCategory } from "@/lib/db/products";
import { seedDatabaseIfEmpty } from "@/lib/db/seed";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryById(slug);

  if (!category) {
    return { title: "Category Not Found" };
  }

  return {
    title: `${category.title} | Choudhary Binders & Printers`,
    description: category.description,
  };
}

export default async function CategoryProductsRoute({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryById(slug);

  if (!category) {
    notFound();
  }

  await seedDatabaseIfEmpty();
  const products = await getProductsForCategory(category.id as CategoryId);

  return (
    <>
      <Navbar />
      <main className="pt-[7.25rem]">
        <CategoryProductsPage
          category={toCategorySummary(category)}
          products={products}
        />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
