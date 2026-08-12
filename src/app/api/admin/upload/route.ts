import dns from "node:dns";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { adminGuard } from "@/lib/api-utils";
import { saveMediaFile } from "@/lib/db/media";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

function sanitizeFilename(name: string) {
  return name.replace(/[^a-zA-Z0-9.-]/g, "-").toLowerCase();
}

function uploadErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return "Upload failed";
}

export async function POST(request: Request) {
  const denied = await adminGuard();
  if (denied) return denied;

  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);

    const formData = await request.formData();
    const file = formData.get("file");
    const folder = String(formData.get("folder") ?? "products");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: "Only JPG, PNG, WEBP, or GIF images are allowed." },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "Image must be 5 MB or smaller." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}-${sanitizeFilename(file.name || "image.jpg")}`;
    const path = `${folder}/${filename}`;
    const isVercel = process.env.VERCEL === "1";

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const blob = await put(path, buffer, {
          access: "public",
          contentType: file.type,
        });
        return NextResponse.json({ url: blob.url });
      } catch (error) {
        return NextResponse.json(
          { error: `Blob upload failed: ${uploadErrorMessage(error)}` },
          { status: 500 },
        );
      }
    }

    if (isVercel) {
      const mediaId = await saveMediaFile(buffer, path, file.type);
      return NextResponse.json({ url: `/api/media/${mediaId}` });
    }

    const uploadDir = join(process.cwd(), "public", "uploads", folder);
    await mkdir(uploadDir, { recursive: true });
    await writeFile(join(uploadDir, filename), buffer);

    return NextResponse.json({ url: `/uploads/${folder}/${filename}` });
  } catch (error) {
    return NextResponse.json(
      { error: uploadErrorMessage(error) },
      { status: 500 },
    );
  }
}
