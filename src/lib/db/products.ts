import type { Collection } from "mongodb";
import type { CategoryId } from "@/lib/categories";
import { categories } from "@/lib/categories";
import {
  categoryProducts as staticProducts,
  type CategoryProduct,
} from "@/lib/category-products";
import { getProductDetail } from "@/lib/product-details";
import type { ProductDoc } from "@/lib/types/cms";
import { COLLECTIONS } from "@/lib/db/collections";
import { getDatabase } from "@/lib/mongodb";

async function getCollection(): Promise<Collection<ProductDoc>> {
  const db = await getDatabase();
  return db.collection<ProductDoc>(COLLECTIONS.products);
}

function toCategoryProduct(doc: ProductDoc): CategoryProduct {
  return {
    id: doc.id,
    title: doc.title,
    image: doc.image,
    minQty: doc.minQty,
    price: doc.price,
    unit: doc.unit,
  };
}

export async function getProductsByCategoryFromDb(
  categoryId: CategoryId,
): Promise<CategoryProduct[] | null> {
  try {
    const collection = await getCollection();
    const products = await collection
      .find({ categoryId, active: { $ne: false } })
      .sort({ order: 1, title: 1 })
      .toArray();

    if (products.length === 0) return null;
    return products.map(toCategoryProduct);
  } catch {
    return null;
  }
}

export async function getProductsForCategory(
  categoryId: CategoryId,
): Promise<CategoryProduct[]> {
  const fromDb = await getProductsByCategoryFromDb(categoryId);
  if (fromDb) return fromDb;
  return staticProducts[categoryId] ?? [];
}

export async function getProductFromDb(categoryId: CategoryId, productId: string) {
  try {
    const collection = await getCollection();
    const product = await collection.findOne({ categoryId, id: productId, active: { $ne: false } });
    return product;
  } catch {
    return null;
  }
}

export async function listAllProducts(categoryId?: CategoryId) {
  const collection = await getCollection();
  const filter = categoryId ? { categoryId } : {};
  return collection.find(filter).sort({ categoryId: 1, order: 1 }).toArray();
}

export async function getProductByMongoId(id: string) {
  const collection = await getCollection();
  const { ObjectId } = await import("mongodb");
  return collection.findOne({ _id: new ObjectId(id) });
}

export async function createProduct(
  data: Omit<ProductDoc, "_id" | "createdAt" | "updatedAt">,
) {
  const collection = await getCollection();
  const now = new Date();
  const doc: ProductDoc = { ...data, createdAt: now, updatedAt: now };
  const result = await collection.insertOne(doc);
  return { ...doc, _id: result.insertedId.toString() };
}

export async function updateProduct(id: string, data: Partial<ProductDoc>) {
  const collection = await getCollection();
  const { ObjectId } = await import("mongodb");
  await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...data, updatedAt: new Date() } },
  );
}

export async function deleteProduct(id: string) {
  const collection = await getCollection();
  const { ObjectId } = await import("mongodb");
  await collection.deleteOne({ _id: new ObjectId(id) });
}

export async function getProductDetailForPage(
  categoryId: CategoryId,
  productId: string,
  categoryTitle: string,
) {
  const fromDb = await getProductFromDb(categoryId, productId);
  if (fromDb) {
    return {
      id: fromDb.id,
      title: fromDb.title,
      image: fromDb.image,
      minQty: fromDb.minQty,
      price: fromDb.price,
      unit: fromDb.unit,
      images: fromDb.images?.length ? fromDb.images : [fromDb.image],
      specifications: fromDb.specifications ?? [],
      description: fromDb.description ?? "",
    };
  }

  return getProductDetail(categoryId, productId, categoryTitle);
}

export async function seedProductsIfEmpty() {
  const collection = await getCollection();
  const count = await collection.countDocuments();
  if (count > 0) return;

  const now = new Date();
  const docs: ProductDoc[] = [];

  for (const category of categories) {
    const products = staticProducts[category.id] ?? [];
    products.forEach((product, index) => {
      const detail = getProductDetail(category.id, product.id, category.title);
      docs.push({
        id: product.id,
        categoryId: category.id,
        title: detail?.title ?? product.title,
        image: product.image,
        images: detail?.images ?? [product.image],
        minQty: product.minQty,
        price: product.price,
        unit: product.unit,
        specifications: detail?.specifications ?? [],
        description: detail?.description ?? "",
        active: true,
        order: index,
        createdAt: now,
        updatedAt: now,
      });
    });
  }

  if (docs.length > 0) {
    await collection.insertMany(docs);
  }
}
