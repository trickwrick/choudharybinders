import type { CategoryId } from "@/lib/categories";

export type VariantSectionTone =
  | "variant-card-tone-amber"
  | "variant-card-tone-indigo"
  | "variant-card-tone-sky"
  | "variant-card-tone-rose"
  | "variant-card-tone-green"
  | "variant-card-tone-crimson";

export type ProductVariant = {
  id: string;
  code: string;
  label: string;
  name: string;
  description: string;
  options?: string;
  productionTime: string;
};

export type ProductVariantSection = {
  id: string;
  title: string;
  tone: VariantSectionTone;
  variants: ProductVariant[];
};

export type ProductVariantGroup = {
  categoryId: CategoryId;
  productId: string;
  title: string;
  minQty: string;
  sections: ProductVariantSection[];
  variants: ProductVariant[];
};

const businessCardSections: ProductVariantSection[] = [
  {
    id: "gsm-500",
    title: "500 GSM Cards",
    tone: "variant-card-tone-amber",
    variants: [
      {
        id: "500-gsm-velvet",
        code: "7",
        label: "500 GSM + VELVET",
        name: "500 GSM + Velvet",
        description: "500 GSM + Velvet",
        options: "Available with Foil, Spot UV & Die-Cut",
        productionTime: "Production Time: 3 days",
      },
      {
        id: "500-gsm-matt",
        code: "8",
        label: "500 GSM + MATT",
        name: "500 GSM + Matt",
        description: "500 GSM + Matt",
        options: "Available with Foil, Spot UV & Die-Cut",
        productionTime: "Production Time: 3 days",
      },
    ],
  },
  {
    id: "gsm-400",
    title: "400 GSM Cards",
    tone: "variant-card-tone-indigo",
    variants: [
      {
        id: "matt-lamination-uv",
        code: "14",
        label: "MATT LAMINATION + UV",
        name: "MATT + UV",
        description: "Matt Lamination (Premium Thermal Quality)",
        options: "Available with Spot UV",
        productionTime: "Production Time: 2 days",
      },
    ],
  },
  {
    id: "gsm-350",
    title: "350 GSM Cards",
    tone: "variant-card-tone-sky",
    variants: [
      {
        id: "matt-lamination",
        code: "15",
        label: "MATT LAMINATION",
        name: "MATT",
        description: "Premium Thermal Matt Lamination",
        productionTime: "Production Time: 2 days",
      },
      {
        id: "matt-lamination-texture",
        code: "16",
        label: "MATT LAMINATION + TEXTURE",
        name: "Matt + Texture",
        description: "Premium Thermal Matt Lamination",
        options: "Texture Option: Available (8 Types)",
        productionTime: "Production Time: 3 days",
      },
    ],
  },
  {
    id: "regular",
    title: "Regular Visiting Cards",
    tone: "variant-card-tone-rose",
    variants: [
      {
        id: "gloss-coated-texture",
        code: "17",
        label: "GLOSS COATED + TEXTURE",
        name: "Gloss Coated + Texture",
        description: "Gloss UV Coating",
        options: "Texture Option: Available (8 Types)",
        productionTime: "Production Time: 3 days",
      },
      {
        id: "gloss-lamination",
        code: "18",
        label: "GLOSS LAMINATION",
        name: "Gloss Lamination",
        description: "Gloss Lamination (Premium Thermal Quality)",
        productionTime: "Production Time: 1 day",
      },
      {
        id: "gloss-coated",
        code: "19",
        label: "GLOSS UV COATED",
        name: "Gloss UV Coated",
        description: "Gloss UV Coating",
        productionTime: "Production Time: 12 hours",
      },
      {
        id: "without-lamination",
        code: "20",
        label: "WITHOUT LAMINATION",
        name: "Without Lamination",
        description: "Without Lamination Card",
        productionTime: "Production Time: 2 days",
      },
      {
        id: "gloss-coated-small",
        code: "21",
        label: "GLOSS COATED (SMALL)",
        name: "Gloss Coated - Small",
        description: "Small Size, Gloss UV Coating",
        productionTime: "Production Time: 1 day",
      },
      {
        id: "without-lamination-small",
        code: "22",
        label: "WITHOUT LAMINATION (SMALL)",
        name: "Without Lamination - Small",
        description: "Small Size, Without Lamination Card",
        productionTime: "Production Time: 2 days",
      },
    ],
  },
  {
    id: "pvc",
    title: "NT / PVC Visiting Cards",
    tone: "variant-card-tone-green",
    variants: [
      {
        id: "800-micron-fusing",
        code: "10",
        label: "800 MICRON FUSING",
        name: "800 Micron Fusing",
        description: "NT / PVC Visiting Card",
        productionTime: "Production Time: 3 days",
      },
      {
        id: "180-micron",
        code: "12",
        label: "180 MICRON",
        name: "180 Micron",
        description: "NT / PVC Visiting Card",
        productionTime: "Production Time: 2 days",
      },
    ],
  },
  {
    id: "metal",
    title: "Metal Visiting Cards",
    tone: "variant-card-tone-crimson",
    variants: [
      {
        id: "metal-card",
        code: "1",
        label: "METAL CARDS",
        name: "Metal Card",
        description: "Premium Metal Visiting Card",
        options: "Sheet Color: 8 Types | Die Cut Option: Any Shape",
        productionTime: "Production Time: 3 days",
      },
    ],
  },
];

function flattenVariants(sections: ProductVariantSection[]): ProductVariant[] {
  return sections.flatMap((section) => section.variants);
}

const variantGroups: ProductVariantGroup[] = [
  {
    categoryId: "offset",
    productId: "business-card",
    title: "Visiting Card Options",
    minQty: "1000 Cards",
    sections: businessCardSections,
    variants: flattenVariants(businessCardSections),
  },
];

export function getProductVariantGroup(
  categoryId: CategoryId,
  productId: string,
): ProductVariantGroup | undefined {
  return variantGroups.find(
    (group) =>
      group.categoryId === categoryId && group.productId === productId,
  );
}

export function getVariantSection(
  group: ProductVariantGroup,
  variantId: string,
): ProductVariantSection | undefined {
  return group.sections.find((section) =>
    section.variants.some((variant) => variant.id === variantId),
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
): { group: ProductVariantGroup; variant: ProductVariant; section: ProductVariantSection } | undefined {
  const group = getProductVariantGroup(categoryId, productId);
  if (!group) return undefined;

  const section = getVariantSection(group, variantId);
  const variant = group.variants.find((item) => item.id === variantId);
  if (!section || !variant) return undefined;

  return { group, variant, section };
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
