import type { CategoryId } from "@/lib/categories";
import { getProductImage } from "@/lib/catalog-images";

export type CategoryProduct = {
  id: string;
  title: string;
  image: string;
  minQty: string;
  price?: number;
  unit?: string;
};

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function item(
  categoryId: CategoryId,
  title: string,
  minQty = "Custom Order",
): CategoryProduct {
  const id = slugify(title);
  return {
    id,
    title,
    image: getProductImage(id, categoryId),
    minQty,
  };
}

export const categoryProducts: Record<CategoryId, CategoryProduct[]> = {
  offset: [
    item("offset", "Business Card", "500 Pieces"),
    item("offset", "Letterhead", "1000 Sheets"),
    item("offset", "Envelope", "500 Pieces"),
    item("offset", "Pamphlet & Flyer", "500 Pieces"),
    item("offset", "Brochure & Catalogue", "200 Pieces"),
    item("offset", "OPD / Doctor File", "100 Pieces"),
    item("offset", "Book & Magazine", "100 Pieces"),
    item("offset", "Dairy & Calendars", "100 Pieces"),
    item("offset", "Poster", "50 Pieces"),
    item("offset", "Bill Book & Office Stationery", "100 Pieces"),
  ],
  flex: [
    item("flex", "Banners & Hoardings", "50 Square Feet"),
    item("flex", "Event Displays", "1 Set"),
    item("flex", "Glowsign Boards", "10 Square Feet"),
    item("flex", "Roll-Up Standees", "1 Piece"),
    item("flex", "One-Way Vision", "20 Square Feet"),
    item("flex", "Frosted Vinyl", "10 Square Feet"),
    item("flex", "Indoor & Outdoor Branding", "Custom Order"),
    item("flex", "Canvas Frames", "1 Piece"),
    item("flex", "Wall Graphics", "10 Square Feet"),
  ],
  digital: [
    item("digital", "Certificates", "50 Pieces"),
    item("digital", "Visiting Cards", "500 Pieces"),
    item("digital", "Flyers & Posters", "100 Pieces"),
    item("digital", "Personalized Prints", "Custom Order"),
    item("digital", "Customized Catalogue", "100 Pieces"),
    item("digital", "Customized Brochure", "200 Pieces"),
    item("digital", "Custom Invitations", "100 Pieces"),
    item("digital", "Stickers & Labels", "500 Pieces"),
    item("digital", "Menu Cards", "100 Pieces"),
  ],
  signage: [
    item("signage", "Acrylic Led Signage", "10 Square Feet"),
    item("signage", "Neon Sign Board", "10 Square Feet"),
    item("signage", "Acrylic Photo Frames", "1 Piece"),
    item("signage", "Acrylic Letters", "Custom Order"),
    item("signage", "Stainless Steel Letters", "Custom Order"),
    item("signage", "Name Plates", "10 Pieces"),
    item("signage", "Laser & CNC", "Custom Order"),
    item("signage", "Cut Vinyl Glowing Board", "10 Square Feet"),
    item("signage", "Bothside Led Lollipop", "1 Piece"),
    item("signage", "Road Direction Sign Board", "1 Piece"),
  ],
  binding: [
    item("binding", "Perfect Binding", "50 Copies"),
    item("binding", "Spiral Binding", "25 Copies"),
    item("binding", "Wire-O Binding", "25 Copies"),
    item("binding", "Hard Binding", "10 Copies"),
    item("binding", "Document Finishing", "Custom Order"),
  ],
  "customized-gifts": [
    item("customized-gifts", "Corporate Gifts", "50 Pieces"),
    item("customized-gifts", "Promotional Merchandise", "100 Pieces"),
    item("customized-gifts", "Employee Welcome Kits", "25 Sets"),
    item("customized-gifts", "Photo Gifts", "Custom Order"),
    item("customized-gifts", "Personalized Accessories", "Custom Order"),
    item("customized-gifts", "Event & Wedding Gifts", "Custom Order"),
    item("customized-gifts", "School & College Merchandise", "100 Pieces"),
    item("customized-gifts", "Festival Gift Hampers", "25 Sets"),
  ],
  "mobile-van": [
    item("mobile-van", "Vehicle Branding", "1 Vehicle"),
    item("mobile-van", "Pole Kiosk Sign Board", "1 Piece"),
    item("mobile-van", "Promotional Van Rental Service", "1 Day"),
    item("mobile-van", "Promotional Road Show Van Rental Service", "1 Day"),
    item("mobile-van", "Promotional Van with Running Video Screen", "1 Day"),
  ],
  unipole: [
    item("unipole", "Highway Unipole Advertising", "1 Unit"),
    item("unipole", "Commercial Area Branding", "Custom Order"),
    item("unipole", "Custom Size Unipole Designs", "1 Unit"),
    item("unipole", "LED & Glow Sign Integration", "1 Unit"),
    item("unipole", "Creative Design Solutions", "Custom Order"),
    item("unipole", "Backlit & Frontlit Flex Printing", "50 Square Feet"),
    item("unipole", "Installation & Mounting Support", "1 Site"),
    item("unipole", "Eco Solvent High-Resolution Printing", "50 Square Feet"),
    item("unipole", "Political & Event Campaign Branding", "Custom Order"),
    item("unipole", "Real Estate & Corporate Promotions", "Custom Order"),
  ],
  "outdoor-advertisement": [
    item("outdoor-advertisement", "Billboard Advertising", "100 Square Feet"),
    item("outdoor-advertisement", "Hoarding Print", "50 Square Feet"),
    item("outdoor-advertisement", "Unipole Board", "1 Unit"),
    item("outdoor-advertisement", "Shop Signage Board", "15 Square Feet"),
    item("outdoor-advertisement", "Pole Kiosk Board", "1 Piece"),
    item("outdoor-advertisement", "Highway Branding", "Custom Order"),
  ],
  "led-sign-board": [
    item("led-sign-board", "Acrylic LED Board", "10 Square Feet"),
    item("led-sign-board", "Neon Sign Board", "10 Square Feet"),
    item("led-sign-board", "Glow Sign Board", "10 Square Feet"),
    item("led-sign-board", "LED Name Board", "8 Square Feet"),
    item("led-sign-board", "LED Lollipop Sign", "1 Piece"),
    item("led-sign-board", "Backlit Sign Board", "10 Square Feet"),
    item("led-sign-board", "Shop Front LED Board", "Custom Order"),
  ],
  "corporate-gifting": [
    item("corporate-gifting", "Corporate Gift Hampers", "25 Sets"),
    item("corporate-gifting", "Branded Corporate Gifts", "50 Pieces"),
    item("corporate-gifting", "Promotional Merchandise", "100 Pieces"),
    item("corporate-gifting", "Employee Welcome Kit", "25 Sets"),
    item("corporate-gifting", "Executive Gift Set", "Custom Order"),
    item("corporate-gifting", "Client Appreciation Gifts", "Custom Order"),
    item("corporate-gifting", "Team Celebration Gifts", "Custom Order"),
  ],
};

export function getProductsByCategory(categoryId: CategoryId): CategoryProduct[] {
  return categoryProducts[categoryId] ?? [];
}
