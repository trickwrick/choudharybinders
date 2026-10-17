import type { Collection } from "mongodb";
import type { TestimonialDoc } from "@/lib/types/cms";
import { COLLECTIONS } from "@/lib/db/collections";
import { getDatabase } from "@/lib/mongodb";

export const defaultTestimonials: Omit<TestimonialDoc, "_id" | "createdAt" | "updatedAt">[] = [
  {
    name: "Stuti Singh",
    role: "Marketing Manager",
    organization: "Corporate Client, Jaipur",
    text: "We ordered the display stands along with banner for our company and absolutely loved the quality of the standee and banner. We would like to thank Choudhary Binders & Printers for the quick turnaround.",
    image: "/testimonials/stuti.jpg",
    order: 0,
    active: true,
  },
  {
    name: "Raunak Sharma",
    role: "Business Owner",
    organization: "Sharma Enterprises, Jaipur",
    text: "We have been using Choudhary Binders & Printers for our advertising services for a long time now. They are very professional and always ensure client satisfaction.",
    image: "/testimonials/raunak.jpg",
    order: 1,
    active: true,
  },
  {
    name: "Priya Mehta",
    role: "Showroom Owner",
    organization: "Mehta Jewellers, Jaipur",
    text: "Excellent flex printing and signage work for our showroom. The team understood our requirements perfectly and delivered on time with premium quality results.",
    image: "/testimonials/priya.jpg",
    order: 2,
    active: true,
  },
];

async function getCollection(): Promise<Collection<TestimonialDoc>> {
  const db = await getDatabase();
  return db.collection<TestimonialDoc>(COLLECTIONS.testimonials);
}

export async function getActiveTestimonialsForPublic(): Promise<TestimonialDoc[]> {
  try {
    const collection = await getCollection();
    const items = await collection
      .find({ active: { $ne: false } })
      .sort({ order: 1 })
      .toArray();

    if (items.length === 0) {
      await seedTestimonialsIfEmpty();
      return defaultTestimonials.map((t, idx) => ({ ...t, _id: `default-${idx}` }));
    }

    return items.map((item) => ({
      ...item,
      _id: item._id?.toString(),
    }));
  } catch {
    return defaultTestimonials.map((t, idx) => ({ ...t, _id: `default-${idx}` }));
  }
}

export async function listAllTestimonials(): Promise<TestimonialDoc[]> {
  const collection = await getCollection();
  const items = await collection.find({}).sort({ order: 1 }).toArray();
  return items.map((item) => ({
    ...item,
    _id: item._id?.toString(),
  }));
}

export async function getTestimonialById(id: string) {
  const collection = await getCollection();
  const { ObjectId } = await import("mongodb");
  return collection.findOne({ _id: new ObjectId(id) });
}

export async function createTestimonial(
  data: Omit<TestimonialDoc, "_id" | "createdAt" | "updatedAt">,
) {
  const collection = await getCollection();
  const now = new Date();
  const doc: TestimonialDoc = { ...data, createdAt: now, updatedAt: now };
  const result = await collection.insertOne(doc);
  return { ...doc, _id: result.insertedId.toString() };
}

export async function updateTestimonial(id: string, data: Partial<TestimonialDoc>) {
  const collection = await getCollection();
  const { ObjectId } = await import("mongodb");
  await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...data, updatedAt: new Date() } },
  );
}

export async function deleteTestimonial(id: string) {
  const collection = await getCollection();
  const { ObjectId } = await import("mongodb");
  await collection.deleteOne({ _id: new ObjectId(id) });
}

export async function seedTestimonialsIfEmpty() {
  const collection = await getCollection();
  const count = await collection.countDocuments();
  if (count > 0) return;

  const now = new Date();
  await collection.insertMany(
    defaultTestimonials.map((item, index) => ({
      ...item,
      order: index,
      active: true,
      createdAt: now,
      updatedAt: now,
    })),
  );
}
