import type { CategoryId } from "@/lib/categories";
import { galleryImages, productImages } from "@/lib/site-images";

export type CategoryProduct = {
  id: string;
  title: string;
  image: string;
  minQty: string;
  price?: number;
  unit?: string;
};

export const categoryProducts: Record<CategoryId, CategoryProduct[]> = {
  offset: [
    {
      id: "business-brochure",
      title: "Business Brochure",
      image: productImages[4],
      minQty: "500 Pieces",
    },
    {
      id: "catalogue-print",
      title: "Catalogue Printing",
      image: galleryImages[0].src,
      minQty: "200 Pieces",
      price: 8,
      unit: "Piece",
    },
    {
      id: "letterhead-stationery",
      title: "Letterhead & Stationery",
      image: productImages[5],
      minQty: "1000 Sheets",
      price: 3,
      unit: "Sheet",
    },
  ],
  led: [
    {
      id: "acrylic-sandwich",
      title: "Acrylic Sandwich",
      image: galleryImages[3].src,
      minQty: "10 Square Feet",
    },
    {
      id: "glow-sign-board",
      title: "Glow Sign Board",
      image: productImages[2],
      minQty: "10 Square Feet",
      price: 450,
      unit: "Sq.ft",
    },
    {
      id: "led-name-board",
      title: "LED Name Board",
      image: galleryImages[7].src,
      minQty: "8 Square Feet",
      price: 650,
      unit: "Sq.ft",
    },
  ],
  digital: [
    {
      id: "poster-print",
      title: "Poster Printing",
      image: productImages[1],
      minQty: "50 Pieces",
      price: 25,
      unit: "Piece",
    },
    {
      id: "visiting-card",
      title: "Visiting Cards",
      image: productImages[4],
      minQty: "500 Pieces",
      price: 2,
      unit: "Piece",
    },
    {
      id: "sticker-print",
      title: "Sticker Printing",
      image: galleryImages[8].src,
      minQty: "100 Pieces",
      price: 5,
      unit: "Piece",
    },
  ],
  flex: [
    {
      id: "flex-banner",
      title: "Flex Banner",
      image: productImages[1],
      minQty: "10 Square Feet",
      price: 35,
      unit: "Sq.ft",
    },
    {
      id: "vinyl-sunboard",
      title: "Vinyl Sunboard Branding",
      image: galleryImages[6].src,
      minQty: "10 Square Feet",
      price: 100,
      unit: "Sq.ft",
    },
    {
      id: "hoarding-flex",
      title: "Hoarding Flex Print",
      image: galleryImages[5].src,
      minQty: "50 Square Feet",
      price: 28,
      unit: "Sq.ft",
    },
  ],
  "mobile-van": [
    {
      id: "van-wrap-full",
      title: "Full Van Wrap",
      image: productImages[3],
      minQty: "1 Vehicle",
    },
    {
      id: "van-side-panel",
      title: "Side Panel Branding",
      image: galleryImages[5].src,
      minQty: "2 Panels",
      price: 3500,
      unit: "Panel",
    },
    {
      id: "mobile-campaign",
      title: "Mobile Campaign Kit",
      image: productImages[0],
      minQty: "1 Set",
      price: 8000,
      unit: "Set",
    },
  ],
  acp: [
    {
      id: "acp-cladding",
      title: "ACP Cladding",
      image: galleryImages[2].src,
      minQty: "50 Square Feet",
      price: 180,
      unit: "Sq.ft",
    },
    {
      id: "facade-panel",
      title: "Façade Panel",
      image: galleryImages[4].src,
      minQty: "30 Square Feet",
      price: 220,
      unit: "Sq.ft",
    },
    {
      id: "shop-front-acp",
      title: "Shop Front ACP",
      image: galleryImages[1].src,
      minQty: "20 Square Feet",
      price: 250,
      unit: "Sq.ft",
    },
  ],
  outdoor: [
    {
      id: "standee",
      title: "Standee",
      image: productImages[0],
      minQty: "10 Square Feet",
    },
    {
      id: "billboard",
      title: "Billboard Advertising",
      image: galleryImages[5].src,
      minQty: "100 Square Feet",
      price: 45,
      unit: "Sq.ft",
    },
    {
      id: "shop-signage",
      title: "Shop Signage Board",
      image: galleryImages[2].src,
      minQty: "15 Square Feet",
      price: 120,
      unit: "Sq.ft",
    },
  ],
};

export function getProductsByCategory(categoryId: CategoryId): CategoryProduct[] {
  return categoryProducts[categoryId] ?? [];
}
