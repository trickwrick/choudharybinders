import type { Collection } from "mongodb";
import type { GalleryImageDoc } from "@/lib/types/cms";
import { getDatabase } from "@/lib/mongodb";
import { COLLECTIONS } from "./collections";
import { galleryImages as staticGalleryImages } from "@/lib/site-images";

async function getGalleryCollection(): Promise<Collection<GalleryImageDoc>> {
  const db = await getDatabase();
  return db.collection<GalleryImageDoc>(COLLECTIONS.gallery || "gallery");
}

export async function listAllGalleryImages(): Promise<GalleryImageDoc[]> {
  const collection = await getGalleryCollection();
  return collection
    .find({})
    .sort({ order: 1, createdAt: -1 })
    .map((doc) => ({
      ...doc,
      _id: doc._id.toString(),
    }))
    .toArray();
}

export async function getActiveGalleryImagesForPublic(): Promise<{ src: string; label: string }[]> {
  const collection = await getGalleryCollection();
  const docs = await collection
    .find({ active: true })
    .sort({ order: 1, createdAt: -1 })
    .toArray();

  return docs.map((doc) => ({
    src: doc.src,
    label: doc.label,
  }));
}

export async function getGalleryImageById(id: string): Promise<GalleryImageDoc | null> {
  const collection = await getGalleryCollection();
  const { ObjectId } = await import("mongodb");
  const doc = await collection.findOne({ _id: new ObjectId(id) });
  if (!doc) return null;

  return { ...doc, _id: doc._id.toString() };
}

export async function seedGalleryImagesIfEmpty() {
  const collection = await getGalleryCollection();
  const count = await collection.countDocuments();

  if (count === 0) {
    const defaultImages = staticGalleryImages.map((img, index) => ({
      src: img.src,
      label: img.label,
      order: index,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await collection.insertMany(defaultImages);
    console.log("Seeded default gallery images");
  }
}

export async function createGalleryImage(data: Omit<GalleryImageDoc, "_id" | "createdAt" | "updatedAt">) {
  const collection = await getGalleryCollection();
  const doc = {
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const result = await collection.insertOne(doc);
  return { ...doc, _id: result.insertedId.toString() };
}

export async function updateGalleryImage(id: string, data: Partial<Omit<GalleryImageDoc, "_id" | "createdAt">>) {
  const collection = await getGalleryCollection();
  const { ObjectId } = await import("mongodb");
  const updateDoc = {
    ...data,
    updatedAt: new Date(),
  };
  await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateDoc });
}

export async function deleteGalleryImage(id: string) {
  const collection = await getGalleryCollection();
  const { ObjectId } = await import("mongodb");
  await collection.deleteOne({ _id: new ObjectId(id) });
}
