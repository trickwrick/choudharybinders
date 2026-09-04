import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { COLLECTIONS } from "@/lib/db/collections";

export async function GET() {
  try {
    const db = await getDatabase();
    const collection = db.collection(COLLECTIONS.products);
    
    const offsetUpdate = await collection.updateMany(
      { categoryId: "offset" },
      { $set: { unit: "PCS" } }
    );
    
    const digitalUpdate = await collection.updateMany(
      { categoryId: "digital" },
      { $set: { unit: "PCS" } }
    );
    
    const flexUpdate = await collection.updateMany(
      { categoryId: "flex" },
      { $set: { unit: "Sq.ft" } }
    );
    
    return NextResponse.json({
      success: true,
      offsetModified: offsetUpdate.modifiedCount,
      digitalModified: digitalUpdate.modifiedCount,
      flexModified: flexUpdate.modifiedCount,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
