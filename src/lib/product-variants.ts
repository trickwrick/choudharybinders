import type { CategoryId } from "@/lib/categories";

export type ProductVariant = {
  id: string;
  code: string;
  label: string;
  description: string;
  options?: string;
  productionTime: string;
};

export type ProductVariantGroup = {
  categoryId: CategoryId;
  productId: string;
  title: string;
  minQty: string;
  variants: ProductVariant[];
};

const businessCardVariants: ProductVariant[] = [
  {
    id: "matt-lamination-uv",
    code: "14",
    label: "MATT LAMINATION + UV",
    description: "Matt Lamination (Premium Thermal Quality)",
    options: "UV Option: Available",
    productionTime: "2 days",
  },
  {
    id: "matt-lamination",
    code: "15",
    label: "MATT LAMINATION",
    description: "Matt Lamination (Premium Thermal Quality)",
    productionTime: "2 days",
  },
  {
    id: "matt-lamination-texture",
    code: "16",
    label: "MATT LAMINATION + TEXTURE",
    description: "Matt Lamination (Premium Thermal Quality)",
    options: "Texture Option: Available (8 Types)",
    productionTime: "3 days",
  },
  {
    id: "gloss-coated-texture",
    code: "17",
    label: "GLOSS COATED + TEXTURE",
    description: "Gloss UV Coating",
    options: "Texture Option: Available (8 Types)",
    productionTime: "3 days",
  },
  {
    id: "gloss-lamination",
    code: "18",
    label: "GLOSS LAMINATION",
    description: "Gloss Lamination (Premium Thermal Quality)",
    productionTime: "1 day",
  },
  {
    id: "gloss-coated",
    code: "19",
    label: "GLOSS COATED",
    description: "Gloss UV Coating",
    productionTime: "12 hours",
  },
  {
    id: "without-lamination",
    code: "20",
    label: "WITHOUT LAMINATION",
    description: "Without Lamination Card",
    productionTime: "2 day",
  },
  {
    id: "gloss-coated-small",
    code: "21",
    label: "GLOSS COATED (SMALL)",
    description: "Small Size, Gloss UV Coating",
    productionTime: "1 day",
  },
  {
    id: "without-lamination-small",
    code: "22",
    label: "WITHOUT LAMINATION (SMALL)",
    description: "Small Size, Without Lamination Card",
    productionTime: "2 day",
  },
];

const variantGroups: ProductVariantGroup[] = [
  {
    categoryId: "offset",
    productId: "business-card",
    title: "Regular Visiting Cards",
    minQty: "1000 Cards",
    variants: businessCardVariants,
  },
];

function variantKey(categoryId: CategoryId, productId: string) {
  return `${categoryId}:${productId}`;
}

export function getProductVariantGroup(
  categoryId: CategoryId,
  productId: string,
): ProductVariantGroup | undefined {
  return variantGroups.find(
    (group) =>
      group.categoryId === categoryId && group.productId === productId,
  );
}

export function hasProductVariants(
  categoryId: CategoryId,
  productId: string,
): boolean {
  return Boolean(getProductVariantGroup(categoryId, productId));
}

export function getProductVariant(
  categoryId: CategoryId,
  productId: string,
  variantId: string,
): { group: ProductVariantGroup; variant: ProductVariant } | undefined {
  const group = getProductVariantGroup(categoryId, productId);
  if (!group) return undefined;

  const variant = group.variants.find((item) => item.id === variantId);
  if (!variant) return undefined;

  return { group, variant };
}

export function getAllVariantStaticParams() {
  return variantGroups.flatMap((group) =>
    group.variants.map((variant) => ({
      slug: group.categoryId,
      productId: group.productId,
      variantId: variant.id,
    })),
  );
}
