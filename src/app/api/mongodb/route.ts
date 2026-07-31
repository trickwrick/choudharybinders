import dns from "node:dns";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);

    const { connectToMongoDB, getDatabase } = await import("@/lib/mongodb");
    const client = await connectToMongoDB();
    const db = await getDatabase();

    await db.command({ ping: 1 });

    return NextResponse.json({
      ok: true,
      message: "MongoDB connected successfully!",
      database: db.databaseName,
      cluster: client.options.hosts?.map((host) => host.toString()) ?? [],
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown connection error";

    return NextResponse.json(
      {
        ok: false,
        message: "MongoDB connection failed",
        error: message,
      },
      { status: 500 },
    );
  }
}
