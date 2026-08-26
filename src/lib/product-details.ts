import type { CategoryId } from "@/lib/categories";
import type { CategoryProduct } from "@/lib/category-products";
import { categoryProducts } from "@/lib/category-products";
import { galleryImages, productImages } from "@/lib/site-images";

export type ProductSpecification = {
  label: string;
  value: string;
};

export type ProductDetail = CategoryProduct & {
  images: string[];
  specifications: ProductSpecification[];
  description: string;
};

type DetailOverride = Partial<
  Pick<
    ProductDetail,
    "title" | "images" | "specifications" | "description" | "price" | "unit"
  >
>;

const detailOverrides: Record<string, DetailOverride> = {
  "neon-sign-board": {
    title: "Neon Sign Board",
    price: 1250,
    unit: "Sq.ft",
    images: [
      galleryImages[7].src,
      galleryImages[3].src,
      productImages[2],
      galleryImages[4].src,
      galleryImages[1].src,
    ],
    specifications: [
      { label: "Material", value: "High-Grade Acrylic and ACP (Aluminum Composite Panel)" },
      { label: "Color", value: "Warm Yellow / Golden Glow" },
      { label: "Finish", value: "Glossy Black" },
      { label: "Size", value: "Customized" },
      {
        label: "Power Consumption",
        value: "Energy Efficient 12V DC Internal Drivers",
      },
      { label: "Input Voltage", value: "220-240V AC" },
      { label: "Light Source", value: "LED / Neon" },
    ],
    description:
      "Premium neon and LED sign boards for shops, showrooms, hotels, and commercial fronts. Custom sizes, bright illumination, and durable outdoor performance.",
  },
  "glowsign-boards": {
    images: [
      galleryImages[6].src,
      galleryImages[5].src,
      productImages[1],
      galleryImages[2].src,
    ],
    specifications: [
      { label: "Material", value: "Sunboard with Premium Vinyl Print" },
      { label: "Print Quality", value: "High Resolution Eco-Solvent" },
      { label: "Finish", value: "Matte / Gloss (as required)" },
      { label: "Size", value: "Customized" },
      { label: "Usage", value: "Indoor & Outdoor Branding" },
      { label: "Durability", value: "UV Resistant & Weather Proof" },
    ],
    description:
      "Glowsign boards for shop fronts, promotions, and campaign displays. Sharp colours, clean finishing, and durable outdoor performance.",
  },
  "acrylic-led-signage": {
    images: [
      galleryImages[3].src,
      galleryImages[7].src,
      productImages[2],
      galleryImages[1].src,
    ],
    specifications: [
      { label: "Material", value: "Acrylic Sandwich Panel with LED" },
      { label: "Thickness", value: "Custom (3mm to 10mm)" },
      { label: "Finish", value: "Glossy / Matte" },
      { label: "Size", value: "Customized" },
      { label: "Application", value: "Indoor Branding & Signage" },
    ],
    description:
      "Acrylic LED signage delivers a premium look for name boards, retail signage, and indoor branding. Lightweight, elegant, and available in custom sizes.",
  },
};

const defaultSpecsByCategory: Record<CategoryId, ProductSpecification[]> = {
  offset: [
    { label: "Print Type", value: "Offset Printing" },
    { label: "Paper Quality", value: "Premium Art / Matte Paper" },
    { label: "Colour", value: "Full Colour (CMYK)" },
    { label: "Finishing", value: "Cutting, Folding, Binding (optional)" },
    { label: "Size", value: "Customized" },
  ],
  signage: [
    { label: "Material", value: "Acrylic / SS / ACP with LED Modules" },
    { label: "Light Source", value: "LED / Neon" },
    { label: "Input Voltage", value: "220-240V AC" },
    { label: "Finish", value: "Glossy / Matte" },
    { label: "Size", value: "Customized" },
  ],
  binding: [
    { label: "Binding Type", value: "Perfect / Spiral / Wire-O / Hard Cover" },
    { label: "Paper", value: "Premium Art / Gloss / Matte" },
    { label: "Finishing", value: "Lamination & Document Finishing" },
    { label: "Use Case", value: "Books, Reports, Catalogues, Thesis" },
    { label: "Quantity", value: "Custom Order" },
  ],
  "customized-gifts": [
    { label: "Product Type", value: "Corporate & Promotional Gifts" },
    { label: "Customization", value: "Logo, Name & Design Printing" },
    { label: "Packaging", value: "Gift Box / Bulk Packing" },
    { label: "MOQ", value: "As per product" },
    { label: "Delivery", value: "Pan India (on request)" },
  ],
  digital: [
    { label: "Print Type", value: "Digital Printing" },
    { label: "Resolution", value: "High DPI" },
    { label: "Material", value: "Paper / Vinyl / Sticker Media" },
    { label: "Colour", value: "Full Colour" },
    { label: "Size", value: "Customized" },
  ],
  flex: [
    { label: "Material", value: "Flex / Vinyl Media" },
    { label: "Print Quality", value: "Large Format Eco-Solvent" },
    { label: "Usage", value: "Indoor & Outdoor" },
    { label: "Finish", value: "Matte / Gloss" },
    { label: "Size", value: "Customized" },
  ],
  "mobile-van": [
    { label: "Material", value: "Premium Vinyl Wrap" },
    { label: "Coverage", value: "Partial / Full Vehicle Wrap" },
    { label: "Print Quality", value: "High Resolution" },
    { label: "Durability", value: "Weather & UV Resistant" },
    { label: "Size", value: "Vehicle Specific" },
  ],
  unipole: [
    { label: "Material", value: "Flex / ACP / Steel Structure" },
    { label: "Usage", value: "Highway & Commercial Unipole Advertising" },
    { label: "Print Quality", value: "Eco-Solvent High Resolution" },
    { label: "Installation", value: "On-site Mounting Support" },
    { label: "Size", value: "Customized" },
  ],
  "outdoor-advertisement": [
    { label: "Material", value: "Flex / Vinyl / ACP / Sunboard" },
    { label: "Usage", value: "Outdoor Advertising & Hoardings" },
    { label: "Durability", value: "Weather & UV Resistant" },
    { label: "Installation", value: "On-site (optional)" },
    { label: "Size", value: "Customized" },
  ],
  "led-sign-board": [
    { label: "Material", value: "Acrylic / ACP with LED Modules" },
    { label: "Light Source", value: "LED / Neon" },
    { label: "Input Voltage", value: "220-240V AC" },
    { label: "Finish", value: "Glossy / Matte" },
    { label: "Size", value: "Customized" },
  ],
};

function defaultDescription(title: string, categoryTitle: string): string {
  return `${title} from Choudhary Binders & Printers is crafted for businesses that need reliable quality and professional finishing. As a trusted ${categoryTitle.toLowerCase()} provider in Jaipur since 1980, we offer customized sizes, durable materials, and end-to-end support from design to installation. Contact us for bulk orders and the best price.`;
}

function getGalleryImages(product: CategoryProduct, categoryId: CategoryId): string[] {
  const related = categoryProducts[categoryId]
    .filter((item) => item.id !== product.id)
    .map((item) => item.image);

  const extras = galleryImages
    .map((item) => item.src)
    .filter((src) => src !== product.image && !related.includes(src))
    .slice(0, 3);

  return [product.image, ...related, ...extras].slice(0, 5);
}

export function getProductDetail(
  categoryId: CategoryId,
  productId: string,
  categoryTitle: string,
): ProductDetail | undefined {
  const product = categoryProducts[categoryId]?.find((item) => item.id === productId);
  if (!product) return undefined;

  const override = detailOverrides[productId];

  return {
    ...product,
    ...(override?.title ? { title: override.title } : {}),
    ...(override?.price != null ? { price: override.price } : {}),
    ...(override?.unit ? { unit: override.unit } : {}),
    images: override?.images ?? getGalleryImages(product, categoryId),
    specifications: override?.specifications ?? defaultSpecsByCategory[categoryId],
    description: override?.description ?? defaultDescription(product.title, categoryTitle),
  };
}

export function getAllProductParams(): { slug: CategoryId; productId: string }[] {
  return (Object.entries(categoryProducts) as [CategoryId, CategoryProduct[]][]).flatMap(
    ([slug, products]) => products.map((product) => ({ slug, productId: product.id })),
  );
}

export function formatProductPrice(price: number, unit?: string): string {
  const formatted = new Intl.NumberFormat("en-IN").format(price);
  return unit ? `₹ ${formatted} / ${unit}` : `₹ ${formatted}`;
}
