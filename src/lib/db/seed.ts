import { seedHeroSlidesIfEmpty } from "@/lib/db/hero-slides";
import { seedCategoriesIfEmpty, syncCategoriesFromStatic } from "@/lib/db/categories";
import { seedProductsIfEmpty } from "@/lib/db/products";
import { seedGalleryImagesIfEmpty } from "@/lib/db/gallery";

export async function seedDatabaseIfEmpty() {
  try {
    await seedHeroSlidesIfEmpty();
    await seedCategoriesIfEmpty();
    await syncCategoriesFromStatic();
    await seedProductsIfEmpty();
    await seedGalleryImagesIfEmpty();
  } catch (error) {
    console.error("Database seed skipped:", error);
  }
}
