import type { Collection } from "mongodb";
import type { ClientLogoDoc } from "@/lib/types/cms";
import { COLLECTIONS } from "@/lib/db/collections";
import { getDatabase } from "@/lib/mongodb";
import { trustedClientLogos } from "@/lib/trusted-client-logos";

async function getCollection(): Promise<Collection<ClientLogoDoc>> {
  const db = await getDatabase();
  return db.collection<ClientLogoDoc>(COLLECTIONS.clients);
}

export async function getActiveClientsForPublic(): Promise<{ src: string; name: string }[]> {
  try {
    const collection = await getCollection();
    const clients = await collection
      .find({ active: { $ne: false } })
      .sort({ order: 1 })
      .toArray();

    if (clients.length === 0) return [...trustedClientLogos];

    return clients.map((client) => ({
      src: client.src,
      name: client.name,
    }));
  } catch {
    return [...trustedClientLogos];
  }
}

export async function listAllClients(): Promise<ClientLogoDoc[]> {
  const collection = await getCollection();
  return collection.find({}).sort({ order: 1 }).toArray();
}

export async function getClientById(id: string) {
  const collection = await getCollection();
  const { ObjectId } = await import("mongodb");
  return collection.findOne({ _id: new ObjectId(id) });
}

export async function createClient(
  data: Omit<ClientLogoDoc, "_id" | "createdAt" | "updatedAt">,
) {
  const collection = await getCollection();
  const now = new Date();
  const doc: ClientLogoDoc = { ...data, createdAt: now, updatedAt: now };
  const result = await collection.insertOne(doc);
  return { ...doc, _id: result.insertedId.toString() };
}

export async function updateClient(id: string, data: Partial<ClientLogoDoc>) {
  const collection = await getCollection();
  const { ObjectId } = await import("mongodb");
  await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...data, updatedAt: new Date() } },
  );
}

export async function deleteClient(id: string) {
  const collection = await getCollection();
  const { ObjectId } = await import("mongodb");
  await collection.deleteOne({ _id: new ObjectId(id) });
}

export async function seedClientsIfEmpty() {
  const collection = await getCollection();
  const count = await collection.countDocuments();
  if (count > 0) return;

  const now = new Date();
  await collection.insertMany(
    trustedClientLogos.map((client, index) => ({
      ...client,
      order: index,
      active: true,
      createdAt: now,
      updatedAt: now,
    })),
  );
}
