import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import FloatingActions from "@/components/FloatingActions";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductVariantDetailPage from "@/components/ProductVariantDetailPage";
import {
  getCategoryById,
  resolveCategorySlug,
  toCategorySummary,
  type CategoryId,
} from "@/lib/categories";
import { categoryProducts } from "@/lib/category-products";
import { getProductsForCategory } from "@/lib/db/products";
import { getProductVariant } from "@/lib/product-variants";

type PageProps = {
  params: Promise<{ slug: string; productId: string; variantId: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, productId, variantId } = await params;
  const category = getCategoryById(resolveCategorySlug(slug));
  const result = category
    ? getProductVariant(category.id as CategoryId, productId, variantId)
    : undefined;

  if (!category || !result) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${result.variant.label} | ${category.title} | Choudhary Binders & Printers`,
    description: result.variant.description,
  };
}

export default async function ProductVariantDetailRoute({ params }: PageProps) {
  const { slug, productId, variantId } = await params;
  const resolvedSlug = resolveCategorySlug(slug);

  if (resolvedSlug !== slug) {
    redirect(`/category/${resolvedSlug}/${productId}/${variantId}`);
  }

  const category = getCategoryById(resolvedSlug);

  if (!category) {
    notFound();
  }

  const result = getProductVariant(
    category.id as CategoryId,
    productId,
    variantId,
  );

  if (!result) {
    notFound();
  }

  const product =
    (await getProductsForCategory(category.id as CategoryId)).find(
      (item) => item.id === productId,
    ) ??
    categoryProducts[category.id as CategoryId]?.find(
      (item) => item.id === productId,
    );

  if (!product) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="pt-[7.25rem]">
        <ProductVariantDetailPage
          category={toCategorySummary(category)}
          categorySlug={slug}
          productTitle={product.title}
          variantGroup={result.group}
          variant={result.variant}
          section={result.section}
        />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
