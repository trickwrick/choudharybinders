import crypto from "node:crypto";
import { cookies } from "next/headers";
import { verifyPassword } from "@/lib/password-utils";
import {
  getEnvAdminCredentials,
  getStoredAdminCredentials,
  saveAdminCredentials,
} from "@/lib/db/admin-settings";

const COOKIE_NAME = "admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

function getSessionSecret() {
  return (
    process.env.ADMIN_SESSION_SECRET ??
    process.env.ADMIN_PASSWORD ??
    "dev-admin-secret-change-me"
  );
}

function signPayload(payload: string) {
  return crypto
    .createHmac("sha256", getSessionSecret())
    .update(payload)
    .digest("hex");
}

export async function getAdminUsername() {
  const stored = await getStoredAdminCredentials();
  if (stored?.username) return stored.username;
  return getEnvAdminCredentials().username;
}

export async function verifyAdminCredentials(username: string, password: string) {
  const stored = await getStoredAdminCredentials();

  if (stored) {
    return (
      username === stored.username && verifyPassword(password, stored.passwordHash)
    );
  }

  const envCredentials = getEnvAdminCredentials();
  return (
    username === envCredentials.username && password === envCredentials.password
  );
}

export async function changeAdminPassword(
  currentPassword: string,
  newPassword: string,
) {
  const username = await getAdminUsername();
  const valid = await verifyAdminCredentials(username, currentPassword);

  if (!valid) {
    throw new Error("Current password is incorrect.");
  }

  if (newPassword.length < 6) {
    throw new Error("New password must be at least 6 characters.");
  }

  await saveAdminCredentials(username, newPassword);
}

export async function createAdminSession() {
  const expires = Date.now() + SESSION_MAX_AGE * 1000;
  const payload = JSON.stringify({ admin: true, exp: expires });
  const token = `${Buffer.from(payload).toString("base64url")}.${signPayload(payload)}`;

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function verifyAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;

  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return false;

  const payload = Buffer.from(encodedPayload, "base64url").toString("utf8");
  if (signPayload(payload) !== signature) return false;

  try {
    const data = JSON.parse(payload) as { admin?: boolean; exp?: number };
    return data.admin === true && typeof data.exp === "number" && data.exp > Date.now();
  } catch {
    return false;
  }
}

export async function requireAdminSession() {
  const isAuthed = await verifyAdminSession();
  if (!isAuthed) {
    throw new Error("Unauthorized");
  }
}
