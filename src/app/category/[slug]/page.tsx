import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import CategoryProductsPage from "@/components/CategoryProductsPage";
import CategorySubcategoriesPage from "@/components/CategorySubcategoriesPage";
import FloatingActions from "@/components/FloatingActions";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
  categories,
  resolveCategorySlug,
  type CategoryId,
  type CategorySummary,
} from "@/lib/categories";
import { getCategoryForPublic, getActiveCategoriesForPublic } from "@/lib/db/categories";
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

  const categorySummary: CategorySummary = {
    id: category.id as CategoryId,
    title: category.title,
    description: category.description,
    image: category.image,
    tag: category.tag,
    subcategories: category.subcategories as CategoryId[] | undefined,
  };

  if (category.subcategories && category.subcategories.length > 0) {
    const allCategories = await getActiveCategoriesForPublic();
    const subcats = category.subcategories
      .map((subId) => allCategories.find((c) => c.id === subId))
      .filter((c): c is NonNullable<typeof c> => Boolean(c));

    return (
      <>
        <Navbar />
        <main className="pt-29">
          <CategorySubcategoriesPage
            category={categorySummary}
            subcategories={subcats}
          />
        </main>
        <Footer />
        <FloatingActions />
      </>
    );
  }

  const products = await getProductsForCategory(category.id as CategoryId);

  return (
    <>
      <Navbar />
      <main className="pt-29">
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
