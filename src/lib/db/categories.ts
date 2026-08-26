import type { Collection } from "mongodb";
import {
  categories as defaultCategories,
  CATEGORY_SLUG_ALIASES,
  getCategoryById,
  resolveCategorySlug,
  toCategorySummary,
} from "@/lib/categories";
import { resolveCategoryIconKey } from "@/lib/category-icons";
import type { CategoryDoc } from "@/lib/types/cms";
import { COLLECTIONS } from "@/lib/db/collections";
import { getDatabase } from "@/lib/mongodb";

import type { PublicCategory } from "@/lib/types/public-catalog";

export type { PublicCategory };

const deprecatedCategoryIds = new Set(Object.keys(CATEGORY_SLUG_ALIASES));

function mergeWithStaticCatalog(category: PublicCategory): PublicCategory {
  const staticCategory = getCategoryById(category.id);
  if (!staticCategory) return category;

  return {
    ...category,
    title: staticCategory.title,
    description: staticCategory.description,
    image: staticCategory.image,
    tag: staticCategory.tag,
    iconKey: resolveCategoryIconKey(staticCategory.icon),
    subcategories: staticCategory.subcategories,
  };
}

function docToPublicCategory(doc: CategoryDoc): PublicCategory {
  return {
    id: doc.id,
    title: doc.title,
    description: doc.description,
    image: doc.image,
    tag: doc.tag,
    iconKey: doc.icon ?? "Sparkles",
    subcategories: doc.subcategories,
  };
}

function staticToPublicCategory(
  category: (typeof defaultCategories)[number],
): PublicCategory {
  return {
    ...toCategorySummary(category),
    iconKey: resolveCategoryIconKey(category.icon),
  };
}

export async function getActiveCategoriesForPublic(): Promise<PublicCategory[]> {
  try {
    const collection = await getCollection();
    const docs = await collection
      .find({ active: { $ne: false } })
      .sort({ order: 1 })
      .toArray();

    if (docs.length > 0) {
      const seen = new Set<string>();
      return docs
        .map(docToPublicCategory)
        .filter((category) => {
          if (!category.id || seen.has(category.id)) return false;
          if (deprecatedCategoryIds.has(category.id)) return false;
          seen.add(category.id);
          return true;
        })
        .map(mergeWithStaticCatalog);
    }
  } catch {
    // fall back to static catalog
  }

  return defaultCategories.map(staticToPublicCategory);
}

export async function getCategoryForPublic(
  slug: string,
): Promise<PublicCategory | undefined> {
  const resolvedSlug = resolveCategorySlug(slug);

  try {
    const collection = await getCollection();
    const doc = await collection.findOne({
      id: resolvedSlug,
      active: { $ne: false },
    });
    if (doc) return mergeWithStaticCatalog(docToPublicCategory(doc));
  } catch {
    // fall back to static catalog
  }

  const staticCategory = getCategoryById(resolvedSlug);
  if (staticCategory) return staticToPublicCategory(staticCategory);

  return undefined;
}

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
    subcategories: category.subcategories,
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
  const staticIds = defaultCategories.map((category) => category.id);

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
          subcategories: category.subcategories,
          order: index,
          active: true,
          updatedAt: now,
        },
        $setOnInsert: {
          id: category.id,
          createdAt: now,
        },
      },
      { upsert: true },
    );
  }

  const deprecatedIds = Object.keys(CATEGORY_SLUG_ALIASES);
  const db = await getDatabase();

  for (const [deprecatedId, targetId] of Object.entries(CATEGORY_SLUG_ALIASES)) {
    await db.collection(COLLECTIONS.products).updateMany(
      { categoryId: deprecatedId },
      { $set: { categoryId: targetId, updatedAt: now } },
    );
  }

  if (deprecatedIds.length > 0) {
    await collection.deleteMany({ id: { $in: deprecatedIds } });
  }

  await collection.updateMany(
    { id: { $nin: staticIds } },
    { $set: { active: false, updatedAt: now } },
  );
}
