import {
  BookOpen,
  Gift,
  Lamp,
  LayoutGrid,
  Lightbulb,
  MonitorDot,
  Sparkles,
  Sun,
  Truck,
  type LucideIcon,
} from "lucide-react";

export const CATEGORY_ICON_OPTIONS = [
  { value: "Sparkles", label: "Sparkles" },
  { value: "LayoutGrid", label: "Layout Grid" },
  { value: "MonitorDot", label: "Monitor" },
  { value: "Lamp", label: "Lamp" },
  { value: "BookOpen", label: "Book" },
  { value: "Gift", label: "Gift" },
  { value: "Truck", label: "Truck" },
  { value: "Sun", label: "Sun" },
  { value: "Lightbulb", label: "Lightbulb" },
] as const;

export type CategoryIconKey = (typeof CATEGORY_ICON_OPTIONS)[number]["value"];

const categoryIconMap: Record<CategoryIconKey, LucideIcon> = {
  Sparkles,
  LayoutGrid,
  MonitorDot,
  Lamp,
  BookOpen,
  Gift,
  Truck,
  Sun,
  Lightbulb,
};

export function getCategoryIcon(iconKey?: string): LucideIcon {
  if (iconKey && iconKey in categoryIconMap) {
    return categoryIconMap[iconKey as CategoryIconKey];
  }
  return Sparkles;
}

export function resolveCategoryIconKey(icon: LucideIcon): CategoryIconKey {
  for (const [key, component] of Object.entries(categoryIconMap) as [
    CategoryIconKey,
    LucideIcon,
  ][]) {
    if (component === icon) return key;
  }
  return "Sparkles";
}
