"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CategoryForm from "@/components/admin/CategoryForm";
import type { CategoryDoc } from "@/lib/types/cms";

export default function EditCategoryPage() {
  const params = useParams<{ id: string }>();
  const [category, setCategory] = useState<CategoryDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCategory = async () => {
      setLoading(true);
      const response = await fetch(`/api/admin/categories?id=${params.id}`);
      if (!response.ok) {
        setError("Category not found.");
        setLoading(false);
        return;
      }
      const data = await response.json();
      setCategory(data.category);
      setLoading(false);
    };

    void loadCategory();
  }, [params.id]);

  if (loading) {
    return <p className="text-sm text-text/60">Loading category...</p>;
  }

  if (error || !category) {
    return <p className="text-sm text-red-600">{error || "Category not found."}</p>;
  }

  return <CategoryForm initialCategory={category} />;
}
