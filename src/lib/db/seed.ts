import { seedHeroSlidesIfEmpty } from "@/lib/db/hero-slides";
import { seedCategoriesIfEmpty, syncCategoriesFromStatic } from "@/lib/db/categories";
import { seedProductsIfEmpty } from "@/lib/db/products";

export async function seedDatabaseIfEmpty() {
  try {
    await seedHeroSlidesIfEmpty();
    await seedCategoriesIfEmpty();
    await syncCategoriesFromStatic();
    await seedProductsIfEmpty();
  } catch (error) {
    console.error("Database seed skipped:", error);
  }
}
