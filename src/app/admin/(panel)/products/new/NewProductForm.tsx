"use client";

import { useSearchParams } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { categories, type CategoryId } from "@/lib/categories";

export default function NewProductForm() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const defaultCategory = categories.some((item) => item.id === categoryParam)
    ? (categoryParam as CategoryId)
    : "offset";

  return <ProductForm defaultCategory={defaultCategory} />;
}
