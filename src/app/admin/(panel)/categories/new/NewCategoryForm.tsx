"use client";

import { useSearchParams } from "next/navigation";
import CategoryForm from "@/components/admin/CategoryForm";

export default function NewCategoryForm() {
  const searchParams = useSearchParams();
  const defaultOrder = Number(searchParams.get("order") ?? 0);

  return (
    <CategoryForm defaultOrder={Number.isFinite(defaultOrder) ? defaultOrder : 0} />
  );
}
