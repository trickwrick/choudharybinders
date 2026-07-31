import type { Collection } from "mongodb";
import type { InquiryDoc, InquiryStatus } from "@/lib/types/cms";
import { COLLECTIONS } from "@/lib/db/collections";
import { getDatabase } from "@/lib/mongodb";

async function getCollection(): Promise<Collection<InquiryDoc>> {
  const db = await getDatabase();
  return db.collection<InquiryDoc>(COLLECTIONS.inquiries);
}

export type CreateInquiryInput = {
  name: string;
  email: string;
  phone: string;
  message: string;
  productId?: string;
  productTitle?: string;
  categoryId?: string;
  quantity?: number;
  unit?: string;
  source?: InquiryDoc["source"];
};

export async function createInquiry(input: CreateInquiryInput) {
  const collection = await getCollection();
  const doc: InquiryDoc = {
    ...input,
    source: input.source ?? "contact",
    status: "new",
    createdAt: new Date(),
  };
  const result = await collection.insertOne(doc);
  return { ...doc, _id: result.insertedId.toString() };
}

export async function listInquiries(status?: InquiryStatus) {
  const collection = await getCollection();
  const filter = status ? { status } : {};
  return collection.find(filter).sort({ createdAt: -1 }).toArray();
}

export async function countInquiries(status?: InquiryStatus) {
  const collection = await getCollection();
  const filter = status ? { status } : {};
  return collection.countDocuments(filter);
}

export async function updateInquiryStatus(id: string, status: InquiryStatus) {
  const collection = await getCollection();
  const { ObjectId } = await import("mongodb");
  await collection.updateOne({ _id: new ObjectId(id) }, { $set: { status } });
}

export async function deleteInquiry(id: string) {
  const collection = await getCollection();
  const { ObjectId } = await import("mongodb");
  await collection.deleteOne({ _id: new ObjectId(id) });
}
