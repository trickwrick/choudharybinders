import { getDatabase } from "./src/lib/mongodb.ts";
import { COLLECTIONS } from "./src/lib/db/collections.ts";

async function run() {
  const db = await getDatabase();
  const clients = await db.collection(COLLECTIONS.clients).find().sort({ order: -1 }).limit(5).toArray();
  console.log(JSON.stringify(clients, null, 2));
  process.exit(0);
}

run().catch(console.error);
