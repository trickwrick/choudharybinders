import dns from "node:dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

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

async function loadMongoModule(): Promise<MongoModule> {
  return import("mongodb");
}

async function createClientPromise(): Promise<MongoClient> {
  const { MongoClient } = await loadMongoModule();
  const client = new MongoClient(getMongoUri());
  await client.connect();
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
