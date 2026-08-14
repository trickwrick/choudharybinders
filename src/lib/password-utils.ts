import crypto from "node:crypto";

const KEY_LENGTH = 64;

export function hashPassword(password: string, salt?: string) {
  const value = salt ?? crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, value, KEY_LENGTH).toString("hex");
  return `${value}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string) {
  const [salt, hash] = storedHash.split(":");
  if (!salt || !hash) return false;

  const derived = crypto.scryptSync(password, salt, KEY_LENGTH);
  const expected = Buffer.from(hash, "hex");

  if (derived.length !== expected.length) return false;
  return crypto.timingSafeEqual(derived, expected);
}
