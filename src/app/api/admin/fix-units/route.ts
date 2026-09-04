import { NextResponse } from "next/server";
import { getProductsCollection } from "@/lib/db/mongodb";

export async function GET() {
  try {
    const collection = await getProductsCollection();
    
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
