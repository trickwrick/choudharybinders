"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import type { ProductDoc } from "@/lib/types/cms";

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      const response = await fetch(`/api/admin/products?id=${params.id}`);
      if (!response.ok) {
        setError("Product not found.");
        setLoading(false);
        return;
      }
      const data = await response.json();
      setProduct(data.product);
      setLoading(false);
    };

    void loadProduct();
  }, [params.id]);

  if (loading) {
    return <p className="text-sm text-text/60">Loading product...</p>;
  }

  if (error || !product) {
    return <p className="text-sm text-red-600">{error || "Product not found."}</p>;
  }

  return <ProductForm initialProduct={product} />;
}
