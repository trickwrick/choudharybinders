export const categoryCoverImages = {
  printing: "/categories/offset-printing-v2.jpg",
  offset: "/categories/offset-printing-v2.jpg",
  flex: "/categories/flex-printing-v2.jpg",
  digital: "/categories/digital-printing-v2.jpg",
  signage: "/categories/acrylic-ss-acp-v3.jpg",
  binding: "/gallery/01-printing-solution.jpg",
  "customized-gifts": "/categories/customized-gifts-v3.jpg",
  "mobile-van": "/categories/mobile-van-advertising-v2.jpg",
  unipole: "/categories/unipole-advertising-v2.jpg",
  "outdoor-advertisement": "/categories/outdoor-branding.jpg",
  "led-sign-board": "/categories/led-sign-board-v3.jpg",
} as const;

export type CatalogCategoryId = keyof typeof categoryCoverImages;

const img = {
  offsetCover: "/categories/offset-printing-v2.jpg",
  flexCover: "/categories/flex-printing-v2.jpg",
  digitalCover: "/categories/digital-printing-v2.jpg",
  signageCover: "/categories/acrylic-ss-acp-v3.jpg",
  giftsCover: "/categories/customized-gifts-v3.jpg",
  vanCover: "/categories/mobile-van-advertising-v2.jpg",
  unipoleCover: "/categories/unipole-advertising-v2.jpg",
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

  // Corporate & Customized Gifts
  "corporate-gifts": img.corporate,
  "promotional-merchandise": img.promoCanopy,
  "employee-welcome-kits": img.promoDesk,
  "photo-gifts": img.jewellery,
  "personalized-accessories": img.promoDesk,
  "event-wedding-gifts": img.promoCanopy,
  "school-college-merchandise": img.corporate,
  "festival-gift-hampers": img.promoCanopy,
  "corporate-gift-hampers": img.promoCanopy,
  "branded-corporate-gifts": img.corporate,
  "executive-gift-set": img.promoDesk,
  "client-appreciation-gifts": img.corporate,
  "team-celebration-gifts": img.promoDesk,

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

  // Outdoor Advertisement
  "billboard-advertising": img.billboard,
  "hoarding-print": img.flexBoard,
  "unipole-board": img.unipoleCover,
  "shop-signage-board": img.storefront,
  "pole-kiosk-board": img.outdoorBanner,
  "highway-branding": img.outdoorAdv,

  // LED Sign Board
  "acrylic-led-board": img.ledGallery,
  "glow-sign-board": img.ledBoard,
  "led-name-board": img.neon,
  "led-lollipop-sign": img.ledGallery,
  "backlit-sign-board": img.ledBoard,
  "shop-front-led-board": img.hotelSign,
};

export function getProductImage(productId: string, categoryId: CatalogCategoryId): string {
  return productImagesById[productId] ?? categoryCoverImages[categoryId];
}
