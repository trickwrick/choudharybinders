import dns from "node:dns";
import { execSync } from "node:child_process";
import { resolveSrv, resolveTxt } from "node:dns/promises";

const DNS_SERVERS = ["8.8.8.8", "8.8.4.4", "1.1.1.1"];

dns.setServers(DNS_SERVERS);

type MongoModule = typeof import("mongodb");
type MongoClient = import("mongodb").MongoClient;
type Db = import("mongodb").Db;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let cachedClientPromise: Promise<MongoClient> | undefined;

function getMongoUri() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('Missing environment variable: "MONGODB_URI"');
  }
  return uri;
}

function getDbName() {
  return process.env.MONGODB_DB_NAME ?? "choudharybinders";
}

function ensureGoogleDns() {
  dns.setServers(DNS_SERVERS);
}

function resolveSrvViaNslookup(host: string) {
  const output = execSync(`nslookup -type=SRV _mongodb._tcp.${host} 8.8.8.8`, {
    encoding: "utf8",
  });
  const hosts: string[] = [];
  for (const line of output.split("\n")) {
    const match = line.match(/svr hostname\s*=\s*(\S+)/i);
    if (match) hosts.push(`${match[1]}:27017`);
  }
  return hosts;
}

function resolveTxtViaNslookup(host: string) {
  try {
    const output = execSync(`nslookup -type=TXT ${host} 8.8.8.8`, {
      encoding: "utf8",
    });
    const match = output.match(/"([^"]+)"/);
    return match?.[1] ?? "";
  } catch {
    return "";
  }
}

async function resolveMongoSrv(host: string) {
  ensureGoogleDns();
  try {
    const srvRecords = await resolveSrv(`_mongodb._tcp.${host}`);
    return srvRecords.map((record) => `${record.name}:${record.port}`);
  } catch {
    return resolveSrvViaNslookup(host);
  }
}

async function resolveMongoTxt(host: string) {
  ensureGoogleDns();
  try {
    const txtRecords = await resolveTxt(host);
    return txtRecords.flat().join("&");
  } catch {
    return resolveTxtViaNslookup(host);
  }
}

/**
 * Convert mongodb+srv:// to mongodb:// by resolving SRV/TXT ourselves.
 * Avoids Windows/Next.js "querySrv ECONNREFUSED" when the driver uses a broken local DNS.
 */
async function toDirectMongoUri(uri: string): Promise<string> {
  const directUri = process.env.MONGODB_URI_DIRECT?.trim();
  if (directUri) {
    return directUri;
  }

  if (!uri.startsWith("mongodb+srv://")) {
    return uri;
  }

  ensureGoogleDns();

  const withoutProtocol = uri.slice("mongodb+srv://".length);
  const atIndex = withoutProtocol.lastIndexOf("@");
  if (atIndex < 0) {
    throw new Error("Invalid MONGODB_URI: missing credentials");
  }

  const credentials = withoutProtocol.slice(0, atIndex);
  const hostAndRest = withoutProtocol.slice(atIndex + 1);
  const slashIndex = hostAndRest.indexOf("/");
  const host =
    slashIndex >= 0 ? hostAndRest.slice(0, slashIndex) : hostAndRest.split("?")[0];
  const pathAndQuery = slashIndex >= 0 ? hostAndRest.slice(slashIndex) : "/";
  const [pathPart, existingQuery = ""] = pathAndQuery.split("?");

  const [hosts, txt] = await Promise.all([
    resolveMongoSrv(host),
    resolveMongoTxt(host),
  ]);

  if (!hosts.length) {
    throw new Error(`No SRV records found for ${host}`);
  }

  const params = new URLSearchParams(existingQuery);
  for (const pair of txt.split("&")) {
    const [key, value] = pair.split("=");
    if (key && value && !params.has(key)) {
      params.set(key, value);
    }
  }
  params.set("tls", "true");

  return `mongodb://${credentials}@${hosts.join(",")}${pathPart || "/"}?${params.toString()}`;
}

async function loadMongoModule(): Promise<MongoModule> {
  return import("mongodb");
}

async function createClientPromise(): Promise<MongoClient> {
  ensureGoogleDns();

  const { MongoClient } = await loadMongoModule();
  const uri = await toDirectMongoUri(getMongoUri());
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 10_000,
  });

  try {
    await client.connect();
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "MongoDB connection failed";

    if (message.includes("unable to verify the first certificate")) {
      throw new Error(
        `${message} Run "npm run dev" (uses Node --use-system-ca) or start Node with NODE_OPTIONS=--use-system-ca.`,
      );
    }

    throw error;
  }

  return client;
}

function getClientPromise(): Promise<MongoClient> {
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = createClientPromise().catch((error) => {
        global._mongoClientPromise = undefined;
        throw error;
      });
    }
    return global._mongoClientPromise;
  }

  if (!cachedClientPromise) {
    cachedClientPromise = createClientPromise().catch((error) => {
      cachedClientPromise = undefined;
      throw error;
    });
  }

  return cachedClientPromise;
}

export async function connectToMongoDB(): Promise<MongoClient> {
  return getClientPromise();
}

export async function getDatabase(name?: string): Promise<Db> {
  const client = await connectToMongoDB();
  return client.db(name ?? getDbName());
}

export async function disconnectFromMongoDB(): Promise<void> {
  const client = await getClientPromise();
  await client.close();
  global._mongoClientPromise = undefined;
  cachedClientPromise = undefined;
}
