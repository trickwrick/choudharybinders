import { BookOpen, Gift, Lamp, LayoutGrid, Lightbulb, MonitorDot, Sparkles, Sun, Truck, type LucideIcon } from "lucide-react";
import { categoryCoverImages } from "@/lib/catalog-images";
import { bindingSolutions } from "@/lib/site-content";

export type CategoryId =
  | "offset"
  | "flex"
  | "digital"
  | "signage"
  | "binding"
  | "customized-gifts"
  | "mobile-van"
  | "unipole"
  | "outdoor-advertisement"
  | "led-sign-board";

export const CATEGORY_SLUG_ALIASES: Partial<Record<string, CategoryId>> = {
  "corporate-gifting": "customized-gifts",
};

export function resolveCategorySlug(slug: string): string {
  return CATEGORY_SLUG_ALIASES[slug] ?? slug;
}

export type Category = {
  id: CategoryId;
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
  tag: string;
};

export const categories: Category[] = [
  {
    id: "offset",
    title: "Offset Printing",
    tag: "Bulk Print",
    icon: Sparkles,
    image: categoryCoverImages.offset,
    description:
      "Ideal for bulk printing with superior color accuracy and consistency.",
  },
  {
    id: "flex",
    title: "Flex Printing & Eco Solvent Printing",
    tag: "Large Format",
    icon: LayoutGrid,
    image: categoryCoverImages.flex,
    description:
      "Banners, hoardings, event displays & large-format indoor and outdoor branding.",
  },
  {
    id: "digital",
    title: "Digital Printing",
    tag: "Digital",
    icon: MonitorDot,
    image: categoryCoverImages.digital,
    description:
      "Perfect for quick turnaround and short-run printing needs.",
  },
  {
    id: "signage",
    title: "Acrylic & SS Letters / ACP Cladding",
    tag: "Signage",
    icon: Lamp,
    image: categoryCoverImages.signage,
    description:
      "Acrylic LED signage, neon boards, SS letters, name plates & road direction boards.",
  },
  {
    id: "binding",
    title: "Binding & Finishing",
    tag: "Binding",
    icon: BookOpen,
    image: categoryCoverImages.binding,
    description: bindingSolutions.subtitle,
  },
  {
    id: "customized-gifts",
    title: "Corporate & Customized Gifts",
    tag: "Gifting",
    icon: Gift,
    image: categoryCoverImages["customized-gifts"],
    description:
      "Premium corporate gifts, personalized merchandise & branded hampers for clients, teams, and events.",
  },
  {
    id: "mobile-van",
    title: "Mobile Van Adv. Hoardings",
    tag: "On-the-Go",
    icon: Truck,
    image: categoryCoverImages["mobile-van"],
    description:
      "Connecting brands with people on the move through vehicle branding and promo vans.",
  },
  {
    id: "unipole",
    title: "Unipole Advertising",
    tag: "Outdoor",
    icon: Sun,
    image: categoryCoverImages.unipole,
    description:
      "Elevate your brand above the crowd with highway and commercial unipole branding.",
  },
  {
    id: "outdoor-advertisement",
    title: "Outdoor Advertisement",
    tag: "Outdoor",
    icon: Sun,
    image: categoryCoverImages["outdoor-advertisement"],
    description:
      "Billboards, hoardings, pole kiosks & outdoor branding for high-visibility campaigns.",
  },
  {
    id: "led-sign-board",
    title: "LED Sign Board",
    tag: "Illuminated",
    icon: Lightbulb,
    image: categoryCoverImages["led-sign-board"],
    description:
      "Bright LED boards, glow signs & illuminated shop fronts for day and night visibility.",
  },
];

export type CategorySummary = Pick<
  Category,
  "id" | "title" | "description" | "image" | "tag"
>;

export function getCategoryById(id: string): Category | undefined {
  const resolvedId = resolveCategorySlug(id);
  return categories.find((category) => category.id === resolvedId);
}

export function toCategorySummary(category: Category): CategorySummary {
  return {
    id: category.id,
    title: category.title,
    description: category.description,
    image: category.image,
    tag: category.tag,
  };
}
