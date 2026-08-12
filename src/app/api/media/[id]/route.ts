import { Readable } from "node:stream";
import { NextResponse } from "next/server";
import { openMediaDownload } from "@/lib/db/media";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const media = await openMediaDownload(id);

    if (!media) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    return new NextResponse(Readable.toWeb(media.stream) as ReadableStream, {
      headers: {
        "Content-Type": media.contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to load image" }, { status: 500 });
  }
}
