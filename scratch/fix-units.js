
const { MongoClient } = require('mongodb');

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("No MONGODB_URI");
  
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection('products');
    
    const offsetUpdate = await collection.updateMany(
      { categoryId: "offset" },
      { $set: { unit: "PCS" } }
    );
    console.log("Offset:", offsetUpdate.modifiedCount);
    
    const digitalUpdate = await collection.updateMany(
      { categoryId: "digital" },
      { $set: { unit: "PCS" } }
    );
    console.log("Digital:", digitalUpdate.modifiedCount);
    
    const flexUpdate = await collection.updateMany(
      { categoryId: "flex" },
      { $set: { unit: "Sq.ft" } }
    );
    console.log("Flex:", flexUpdate.modifiedCount);
  } finally {
    await client.close();
  }
}
main().catch(console.error);
