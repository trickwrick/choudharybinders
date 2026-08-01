import { seedHeroSlidesIfEmpty } from "@/lib/db/hero-slides";
import { seedProductsIfEmpty } from "@/lib/db/products";

export async function seedDatabaseIfEmpty() {
  try {
    await seedHeroSlidesIfEmpty();
    await seedProductsIfEmpty();
  } catch (error) {
    console.error("Database seed skipped:", error);
  }
}
