export const categoryCoverImages = {
  offset: "/categories/offset-printing.jpg",
  flex: "/categories/flex-printing.jpg",
  digital: "/categories/digital-printing.jpg",
  signage: "/categories/led-sign-boards.jpg",
  binding: "/content/printing-binding.png",
  "customized-gifts": "/categories/promotional-desk.jpg",
  "mobile-van": "/categories/mobile-van-advertising.jpg",
  unipole: "/categories/outdoor-advertising.jpg",
} as const;

export type CatalogCategoryId = keyof typeof categoryCoverImages;

const img = {
  offsetCover: "/categories/offset-printing.jpg",
  flexCover: "/categories/flex-printing.jpg",
  digitalCover: "/categories/digital-printing.jpg",
  signageCover: "/categories/led-sign-boards.jpg",
  giftsCover: "/categories/promotional-desk.jpg",
  vanCover: "/categories/mobile-van-advertising.jpg",
  unipoleCover: "/categories/outdoor-advertising.jpg",
  pamphlet: "/products/05-pamphlet-print.jpg",
  brochure: "/testimonials/brochure.jpg",
  printing: "/gallery/01-printing-solution.jpg",
  magazine: "/services/magazine-advertisement.jpg",
  poster: "/gallery/06-outdoor-banner.jpg",
  stationery: "/services/printing-publishing.jpg",
  flexBoard: "/products/02-flex-board.jpg",
  bannerStand: "/products/01-banner-stand.jpg",
  ledBoard: "/products/03-led-board.jpg",
  flexPrint: "/gallery/07-flex-printing.jpg",
  indoorBrand: "/products/06-indoor-branding.jpg",
  shopBrand: "/gallery/02-shop-branding.jpg",
  corporate: "/gallery/09-corporate-branding.jpg",
  digitalPrint: "/services/advertising-printing.jpg",
  neon: "/hero/neon-signboard.jpg",
  ledGallery: "/gallery/08-led-board.jpg",
  storefront: "/gallery/03-storefront-signage.jpg",
  jewellery: "/gallery/04-jewellery-store.jpg",
  hotelSign: "/gallery/05-hotel-signboard.jpg",
  fabrication: "/services/alu-fabricators.jpg",
  cladding: "/services/fabrication-cladding.jpg",
  promoCanopy: "/products/04-promotional-canopy.jpg",
  promoDesk: "/categories/promotional-desk.jpg",
  hoarding: "/services/hoarding-advertising.jpg",
  outdoorAdv: "/services/outdoor-advertising.jpg",
  outdoorBrand: "/categories/outdoor-branding.jpg",
  billboard: "/hero/billboard-advertising.jpg",
  outdoorBanner: "/gallery/06-outdoor-banner.jpg",
  indoorCat: "/categories/indoor-branding.jpg",
} as const;

export const productImagesById: Record<string, string> = {
  // Offset Printing
  "business-card": img.pamphlet,
  letterhead: img.stationery,
  envelope: img.pamphlet,
  "pamphlet-flyer": img.pamphlet,
  "brochure-catalogue": img.brochure,
  "opd-doctor-file": img.stationery,
  "book-magazine": img.magazine,
  "dairy-calendars": img.brochure,
  poster: img.poster,
  "bill-book-office-stationery": img.printing,

  // Flex Printing
  "banners-hoardings": img.flexBoard,
  "event-displays": img.bannerStand,
  "glowsign-boards": img.ledBoard,
  "roll-up-standees": img.bannerStand,
  "one-way-vision": img.flexPrint,
  "frosted-vinyl": img.indoorBrand,
  "indoor-outdoor-branding": img.shopBrand,
  "canvas-frames": img.corporate,
  "wall-graphics": img.indoorCat,

  // Digital Printing
  certificates: img.printing,
  "visiting-cards": img.pamphlet,
  "flyers-posters": img.poster,
  "personalized-prints": img.digitalPrint,
  "customized-catalogue": img.brochure,
  "customized-brochure": img.brochure,
  "custom-invitations": img.pamphlet,
  "stickers-labels": img.digitalPrint,
  "menu-cards": img.pamphlet,

  // Signage
  "acrylic-led-signage": img.ledGallery,
  "neon-sign-board": img.neon,
  "acrylic-photo-frames": img.jewellery,
  "acrylic-letters": img.storefront,
  "stainless-steel-letters": img.hotelSign,
  "name-plates": img.storefront,
  "laser-cnc": img.fabrication,
  "cut-vinyl-glowing-board": img.ledBoard,
  "bothside-led-lollipop": img.ledGallery,
  "road-direction-sign-board": img.outdoorBanner,

  "perfect-binding": img.brochure,
  "spiral-binding": img.brochure,
  "wire-o-binding": img.brochure,
  "hard-binding": img.magazine,
  "document-finishing": img.printing,

  // Customized Gifts
  "corporate-gifts": img.corporate,
  "promotional-merchandise": img.promoCanopy,
  "employee-welcome-kits": img.promoDesk,
  "photo-gifts": img.jewellery,
  "personalized-accessories": img.promoDesk,
  "event-wedding-gifts": img.promoCanopy,
  "school-college-merchandise": img.corporate,
  "festival-gift-hampers": img.promoCanopy,

  // Mobile Van
  "vehicle-branding": img.hoarding,
  "pole-kiosk-sign-board": img.outdoorBanner,
  "promotional-van-rental-service": img.billboard,
  "promotional-road-show-van-rental-service": img.outdoorAdv,
  "promotional-van-with-running-video-screen": img.vanCover,

  // Unipole
  "highway-unipole-advertising": img.unipoleCover,
  "commercial-area-branding": img.outdoorBrand,
  "custom-size-unipole-designs": img.outdoorAdv,
  "led-glow-sign-integration": img.billboard,
  "creative-design-solutions": img.flexPrint,
  "backlit-frontlit-flex-printing": img.flexBoard,
  "installation-mounting-support": img.outdoorAdv,
  "eco-solvent-high-resolution-printing": img.flexPrint,
  "political-event-campaign-branding": img.billboard,
  "real-estate-corporate-promotions": img.outdoorBrand,
};

export function getProductImage(productId: string, categoryId: CatalogCategoryId): string {
  return productImagesById[productId] ?? categoryCoverImages[categoryId];
}
