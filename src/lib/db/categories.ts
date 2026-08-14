import type { Collection } from "mongodb";
import { categories as defaultCategories } from "@/lib/categories";
import { resolveCategoryIconKey } from "@/lib/category-icons";
import type { CategoryDoc } from "@/lib/types/cms";
import { COLLECTIONS } from "@/lib/db/collections";
import { getDatabase } from "@/lib/mongodb";

async function getCollection(): Promise<Collection<CategoryDoc>> {
  const db = await getDatabase();
  return db.collection<CategoryDoc>(COLLECTIONS.categories);
}

function toCategorySeedDoc(
  category: (typeof defaultCategories)[number],
  order: number,
  now: Date,
): CategoryDoc {
  return {
    id: category.id,
    title: category.title,
    description: category.description,
    image: category.image,
    tag: category.tag,
    icon: resolveCategoryIconKey(category.icon),
    order,
    active: true,
    createdAt: now,
    updatedAt: now,
  };
}

export async function listAllCategories(): Promise<CategoryDoc[]> {
  const collection = await getCollection();
  return collection.find({}).sort({ order: 1 }).toArray();
}

export async function getCategoryDocById(id: string) {
  const collection = await getCollection();
  const { ObjectId } = await import("mongodb");
  return collection.findOne({ _id: new ObjectId(id) });
}

export async function getCategoryDocBySlug(slug: string) {
  const collection = await getCollection();
  return collection.findOne({ id: slug });
}

export async function createCategory(
  data: Omit<CategoryDoc, "_id" | "createdAt" | "updatedAt">,
) {
  const collection = await getCollection();
  const now = new Date();
  const doc: CategoryDoc = { ...data, createdAt: now, updatedAt: now };
  const result = await collection.insertOne(doc);
  return { ...doc, _id: result.insertedId.toString() };
}

export async function updateCategory(id: string, data: Partial<CategoryDoc>) {
  const collection = await getCollection();
  const { ObjectId } = await import("mongodb");
  await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...data, updatedAt: new Date() } },
  );
}

export async function deleteCategory(id: string) {
  const collection = await getCollection();
  const { ObjectId } = await import("mongodb");
  await collection.deleteOne({ _id: new ObjectId(id) });
}

export async function seedCategoriesIfEmpty() {
  const collection = await getCollection();
  const count = await collection.countDocuments();
  if (count > 0) return;

  const now = new Date();
  await collection.insertMany(
    defaultCategories.map((category, index) =>
      toCategorySeedDoc(category, index, now),
    ),
  );
}

export async function syncCategoriesFromStatic() {
  const collection = await getCollection();
  const now = new Date();

  for (const [index, category] of defaultCategories.entries()) {
    await collection.updateOne(
      { id: category.id },
      {
        $set: {
          title: category.title,
          description: category.description,
          image: category.image,
          tag: category.tag,
          icon: resolveCategoryIconKey(category.icon),
          order: index,
          updatedAt: now,
        },
        $setOnInsert: {
          id: category.id,
          active: true,
          createdAt: now,
        },
      },
      { upsert: true },
    );
  }
}
