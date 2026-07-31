import { seedHeroSlidesIfEmpty } from "@/lib/db/hero-slides";
import { seedProductsIfEmpty } from "@/lib/db/products";

export async function seedDatabaseIfEmpty() {
  await seedHeroSlidesIfEmpty();
  await seedProductsIfEmpty();
}
