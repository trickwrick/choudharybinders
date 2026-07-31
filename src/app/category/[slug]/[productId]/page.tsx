import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FloatingActions from "@/components/FloatingActions";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductDetailPage from "@/components/ProductDetailPage";
import {
  getCategoryById,
  toCategorySummary,
  type CategoryId,
} from "@/lib/categories";
import {
  getProductDetailForPage,
  getProductsForCategory,
} from "@/lib/db/products";
import { seedDatabaseIfEmpty } from "@/lib/db/seed";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string; productId: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, productId } = await params;
  const category = getCategoryById(slug);

  if (!category) {
    return { title: "Product Not Found" };
  }

  const product = await getProductDetailForPage(
    category.id as CategoryId,
    productId,
    category.title,
  );

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${product.title} | ${category.title} | Choudhary Binders & Printers`,
    description: product.description,
  };
}

export default async function ProductDetailRoute({ params }: PageProps) {
  const { slug, productId } = await params;
  const category = getCategoryById(slug);

  if (!category) {
    notFound();
  }

  await seedDatabaseIfEmpty();

  const product = await getProductDetailForPage(
    category.id as CategoryId,
    productId,
    category.title,
  );

  if (!product) {
    notFound();
  }

  const relatedProducts = (await getProductsForCategory(category.id as CategoryId)).filter(
    (item) => item.id !== productId,
  );

  return (
    <>
      <Navbar />
      <main className="pt-[7.25rem]">
        <ProductDetailPage
          category={toCategorySummary(category)}
          categorySlug={slug}
          product={product}
          relatedProducts={relatedProducts}
        />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
