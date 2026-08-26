import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import CategoryProductsPage from "@/components/CategoryProductsPage";
import FloatingActions from "@/components/FloatingActions";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
  categories,
  resolveCategorySlug,
  type CategoryId,
  type CategorySummary,
} from "@/lib/categories";
import { getCategoryForPublic } from "@/lib/db/categories";
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
  const category = await getCategoryForPublic(resolveCategorySlug(slug));

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
  const resolvedSlug = resolveCategorySlug(slug);

  if (resolvedSlug !== slug) {
    redirect(`/category/${resolvedSlug}`);
  }

  await seedDatabaseIfEmpty();
  const category = await getCategoryForPublic(resolvedSlug);

  if (!category) {
    notFound();
  }

  const products = await getProductsForCategory(category.id as CategoryId);
  const categorySummary: CategorySummary = {
    id: category.id as CategoryId,
    title: category.title,
    description: category.description,
    image: category.image,
    tag: category.tag,
  };

  return (
    <>
      <Navbar />
      <main className="pt-[7.25rem]">
        <CategoryProductsPage
          category={categorySummary}
          products={products}
        />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
