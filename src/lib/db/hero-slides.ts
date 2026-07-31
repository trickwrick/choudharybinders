import type { Collection } from "mongodb";
import { heroSlides as defaultSlides } from "@/lib/site-images";
import type { HeroSlide, HeroSlideDoc } from "@/lib/types/cms";
import { COLLECTIONS } from "@/lib/db/collections";
import { getDatabase } from "@/lib/mongodb";

async function getCollection(): Promise<Collection<HeroSlideDoc>> {
  const db = await getDatabase();
  return db.collection<HeroSlideDoc>(COLLECTIONS.heroSlides);
}

export async function getHeroSlidesFromDb(): Promise<HeroSlide[]> {
  try {
    const collection = await getCollection();
    const slides = await collection
      .find({ active: { $ne: false } })
      .sort({ order: 1 })
      .toArray();

    if (slides.length === 0) return [...defaultSlides];

    return slides.map((slide) => ({
      src: slide.src,
      alt: slide.alt,
      title: slide.title,
      subtitle: slide.subtitle,
    }));
  } catch {
    return [...defaultSlides];
  }
}

export async function listAllHeroSlides(): Promise<HeroSlideDoc[]> {
  const collection = await getCollection();
  return collection.find({}).sort({ order: 1 }).toArray();
}

export async function createHeroSlide(
  data: Omit<HeroSlideDoc, "_id" | "createdAt" | "updatedAt">,
) {
  const collection = await getCollection();
  const now = new Date();
  const doc: HeroSlideDoc = { ...data, createdAt: now, updatedAt: now };
  const result = await collection.insertOne(doc);
  return { ...doc, _id: result.insertedId.toString() };
}

export async function updateHeroSlide(id: string, data: Partial<HeroSlideDoc>) {
  const collection = await getCollection();
  const { ObjectId } = await import("mongodb");
  await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...data, updatedAt: new Date() } },
  );
}

export async function deleteHeroSlide(id: string) {
  const collection = await getCollection();
  const { ObjectId } = await import("mongodb");
  await collection.deleteOne({ _id: new ObjectId(id) });
}

export async function seedHeroSlidesIfEmpty() {
  const collection = await getCollection();
  const count = await collection.countDocuments();
  if (count > 0) return;

  const now = new Date();
  await collection.insertMany(
    defaultSlides.map((slide, index) => ({
      ...slide,
      order: index,
      active: true,
      createdAt: now,
      updatedAt: now,
    })),
  );
}
