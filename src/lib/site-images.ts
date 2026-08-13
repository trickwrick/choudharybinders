import { categoryCoverImages } from "@/lib/catalog-images";

export const heroSlides = [
  {
    src: "/hero/billboard-advertising.jpg",
    alt: "Outdoor billboard and hoarding advertising at night",
    title: "Outdoor Branding & Hoardings",
    subtitle: "Billboards, flex banners & large-format outdoor advertising across Jaipur",
  },
  {
    src: "/hero/large-format-printing.jpg",
    alt: "Professional large format printing and design studio",
    title: "Premium Printing Solutions",
    subtitle: "Offset, digital & flex printing with high-resolution output",
  },
  {
    src: "/hero/neon-signboard.jpg",
    alt: "Illuminated neon sign board and shop branding",
    title: "LED & Sign Board Branding",
    subtitle: "Custom sign boards, LED displays & storefront branding",
  },
] as const;

export const categoryImages = categoryCoverImages;

export const serviceImages = [
  "/services/alu-fabricators.jpg",
  "/services/advertising-pr.jpg",
  "/services/advertising-printing.jpg",
  "/services/fabrication-cladding.jpg",
  "/services/printing-publishing.jpg",
  "/services/hoarding-advertising.jpg",
  "/services/outdoor-advertising.jpg",
  "/services/newspaper-advertising.jpg",
  "/services/magazine-advertisement.jpg",
  "/services/media-planning.jpg",
] as const;

export const galleryImages = [
  { label: "Complete Printing Solution", src: "/gallery/01-printing-solution.jpg" },
  { label: "Shop Branding", src: "/gallery/02-shop-branding.jpg" },
  { label: "Storefront Signage", src: "/gallery/03-storefront-signage.jpg" },
  { label: "Jewellery Store Front", src: "/gallery/04-jewellery-store.jpg" },
  { label: "Hotel Sign Board", src: "/gallery/05-hotel-signboard.jpg" },
  { label: "Outdoor Banner", src: "/gallery/06-outdoor-banner.jpg" },
  { label: "Flex Printing", src: "/gallery/07-flex-printing.jpg" },
  { label: "LED Board", src: "/gallery/08-led-board.jpg" },
  { label: "Corporate Branding", src: "/gallery/09-corporate-branding.jpg" },
] as const;

export const videoThumbnails = [
  {
    title: "Standee Advertising Boards",
    duration: "2:45",
    src: "/products/01-banner-stand.jpg",
  },
  {
    title: "Advertising & Branding",
    duration: "1:58",
    src: "/gallery/02-shop-branding.jpg",
  },
  {
    title: "LED Sign Board Installation",
    duration: "3:12",
    src: "/gallery/08-led-board.jpg",
  },
] as const;

export const productImages = [
  "/products/01-banner-stand.jpg",
  "/products/02-flex-board.jpg",
  "/products/03-led-board.jpg",
  "/products/04-promotional-canopy.jpg",
  "/products/05-pamphlet-print.jpg",
  "/products/06-indoor-branding.jpg",
] as const;

export const sectionImages = {
  centerBanner: "/content/center-banner-v2.png",
  about: "/about.jpg",
  testimonialBrochure: "/testimonials/brochure.jpg",
} as const;
