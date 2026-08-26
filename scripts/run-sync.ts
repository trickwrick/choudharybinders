import { syncProductsFromStatic, removeCatalogSeededProducts } from "../src/lib/db/products";

async function main() {
  console.log("Purging old catalog products...");
  await removeCatalogSeededProducts();
  console.log("Starting product sync...");
  try {
    await syncProductsFromStatic();
    console.log("Product sync complete!");
  } catch (error) {
    console.error("Error syncing products:", error);
  }
  process.exit(0);
}

main();
