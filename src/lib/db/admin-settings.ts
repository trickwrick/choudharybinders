import type { Collection } from "mongodb";
import { hashPassword } from "@/lib/password-utils";
import { COLLECTIONS } from "@/lib/db/collections";
import { getDatabase } from "@/lib/mongodb";

const CREDENTIALS_KEY = "admin_credentials";

export type AdminCredentialsDoc = {
  key: typeof CREDENTIALS_KEY;
  username: string;
  passwordHash: string;
  updatedAt: Date;
};

async function getCollection(): Promise<Collection<AdminCredentialsDoc>> {
  const db = await getDatabase();
  return db.collection<AdminCredentialsDoc>(COLLECTIONS.adminSettings);
}

export async function getStoredAdminCredentials() {
  try {
    const collection = await getCollection();
    return collection.findOne({ key: CREDENTIALS_KEY });
  } catch {
    return null;
  }
}

export async function saveAdminCredentials(username: string, password: string) {
  const collection = await getCollection();
  const doc: AdminCredentialsDoc = {
    key: CREDENTIALS_KEY,
    username: username.trim(),
    passwordHash: hashPassword(password),
    updatedAt: new Date(),
  };

  await collection.updateOne(
    { key: CREDENTIALS_KEY },
    { $set: doc },
    { upsert: true },
  );

  return doc;
}

export function getEnvAdminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME ?? "admin",
    password: process.env.ADMIN_PASSWORD ?? "admin123",
  };
}
