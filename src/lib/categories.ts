import {
  Lamp,
  Layers,
  LayoutGrid,
  MonitorDot,
  Sparkles,
  Sun,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { categoryImages } from "@/lib/site-images";

export type CategoryId =
  | "offset"
  | "led"
  | "digital"
  | "flex"
  | "mobile-van"
  | "acp"
  | "outdoor";

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
    image: categoryImages.offset,
    description:
      "Brochures, catalogues, publications & high-volume marketing print.",
  },
  {
    id: "led",
    title: "LED SignBoards",
    tag: "Illuminated",
    icon: Lamp,
    image: categoryImages.led,
    description:
      "Bright LED boards & glow signs for shops, hotels & commercial fronts.",
  },
  {
    id: "digital",
    title: "Digital Printers",
    tag: "Digital",
    icon: MonitorDot,
    image: categoryImages.digital,
    description:
      "Fast digital printing for banners, posters, labels & short-run jobs.",
  },
  {
    id: "flex",
    title: "Flex Printing Services",
    tag: "Large Format",
    icon: LayoutGrid,
    image: categoryImages.flex,
    description:
      "Flex banners, hoardings & large-format prints for indoor & outdoor use.",
  },
  {
    id: "mobile-van",
    title: "Mobile Van Advertising",
    tag: "On-the-Go",
    icon: Truck,
    image: categoryImages.mobileVan,
    description:
      "Branded van wraps & mobile campaigns that reach customers across the city.",
  },
  {
    id: "acp",
    title: "ACP Sheet Cladding Service",
    tag: "Fabrication",
    icon: Layers,
    image: categoryImages.acp,
    description:
      "ACP cladding, façade panels & durable exterior branding for buildings.",
  },
  {
    id: "outdoor",
    title: "Outdoor Advertising",
    tag: "Outdoor",
    icon: Sun,
    image: categoryImages.outdoor,
    description:
      "Billboards, building signage & outdoor campaigns across Jaipur.",
  },
];

export type CategorySummary = Pick<
  Category,
  "id" | "title" | "description" | "image" | "tag"
>;

export function getCategoryById(id: string): Category | undefined {
  return categories.find((category) => category.id === id);
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
