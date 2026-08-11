import dns from "node:dns";
import { execSync } from "node:child_process";
import { resolveSrv, resolveTxt } from "node:dns/promises";
import fs from "fs";
import path from "path";
import { MongoClient } from "mongodb";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

function resolveSrvViaNslookup(host) {
  const output = execSync(`nslookup -type=SRV _mongodb._tcp.${host} 8.8.8.8`, {
    encoding: "utf8",
  });
  const hosts = [];
  for (const line of output.split("\n")) {
    const match = line.match(/svr hostname\s*=\s*(\S+)/i);
    if (match) hosts.push(`${match[1]}:27017`);
  }
  return hosts;
}

function resolveTxtViaNslookup(host) {
  const output = execSync(`nslookup -type=TXT ${host} 8.8.8.8`, { encoding: "utf8" });
  const match = output.match(/"([^"]+)"/);
  return match?.[1] ?? "";
}

function loadEnv() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return {};
  const env = {};
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) env[match[1].trim()] = match[2].trim().replace(/^["']|["']$/g, "");
  }
  return env;
}

async function toDirectMongoUri(uri) {
  if (!uri.startsWith("mongodb+srv://")) return uri;

  const withoutProtocol = uri.slice("mongodb+srv://".length);
  const atIndex = withoutProtocol.lastIndexOf("@");
  const credentials = withoutProtocol.slice(0, atIndex);
  const hostAndRest = withoutProtocol.slice(atIndex + 1);
  const slashIndex = hostAndRest.indexOf("/");
  const host =
    slashIndex >= 0 ? hostAndRest.slice(0, slashIndex) : hostAndRest.split("?")[0];
  const pathAndQuery = slashIndex >= 0 ? hostAndRest.slice(slashIndex) : "/";
  const [pathPart, existingQuery = ""] = pathAndQuery.split("?");

  let hosts = [];
  try {
    const srvRecords = await resolveSrv(`_mongodb._tcp.${host}`);
    hosts = srvRecords.map((r) => `${r.name}:${r.port}`);
  } catch {
    hosts = resolveSrvViaNslookup(host);
  }

  if (!hosts.length) {
    throw new Error(`No SRV records found for ${host}`);
  }

  let txt = "";
  try {
    const txtRecords = await resolveTxt(host);
    txt = txtRecords.flat().join("&");
  } catch {
    txt = resolveTxtViaNslookup(host);
  }

  const params = new URLSearchParams(existingQuery);
  for (const pair of txt.split("&")) {
    const [key, value] = pair.split("=");
    if (key && value && !params.has(key)) params.set(key, value);
  }
  params.set("tls", "true");

  return `mongodb://${credentials}@${hosts.join(",")}${pathPart || "/"}?${params.toString()}`;
}

const slides = [
  {
    src: "/hero/billboard-advertising.jpg",
    alt: "Outdoor billboard and hoarding advertising at night",
    title: "Outdoor Branding & Hoardings",
    subtitle: "Billboards, flex banners & large-format outdoor advertising across Jaipur",
    order: 0,
    active: true,
  },
  {
    src: "/hero/large-format-printing.jpg",
    alt: "Professional large format printing and design studio",
    title: "Premium Printing Solutions",
    subtitle: "Offset, digital & flex printing with high-resolution output",
    order: 1,
    active: true,
  },
  {
    src: "/hero/neon-signboard.jpg",
    alt: "Illuminated neon sign board and shop branding",
    title: "LED & Sign Board Branding",
    subtitle: "Custom sign boards, LED displays & storefront branding",
    order: 2,
    active: true,
  },
];

const env = loadEnv();
const uri = env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI not found in .env.local");
  process.exit(1);
}

const directUri = await toDirectMongoUri(uri);
const client = new MongoClient(directUri, { serverSelectionTimeoutMS: 10_000 });
await client.connect();

const db = client.db(env.MONGODB_DB_NAME || "choudharybinders");
const collection = db.collection("hero_slides");
const now = new Date();

await collection.deleteMany({});
await collection.insertMany(
  slides.map((slide) => ({
    ...slide,
    createdAt: now,
    updatedAt: now,
  })),
);

console.log(`Synced ${slides.length} hero slides in MongoDB`);
await client.close();
