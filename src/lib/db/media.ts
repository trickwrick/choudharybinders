import { GridFSBucket } from "mongodb";
import { COLLECTIONS } from "@/lib/db/collections";
import { getDatabase } from "@/lib/mongodb";

function getBucket() {
  return getDatabase().then(
    (db) => new GridFSBucket(db, { bucketName: COLLECTIONS.media }),
  );
}

export async function saveMediaFile(
  buffer: Buffer,
  filename: string,
  contentType: string,
) {
  const bucket = await getBucket();

  return new Promise<string>((resolve, reject) => {
    const uploadStream = bucket.openUploadStream(filename, {
      metadata: { contentType },
    });

    uploadStream.on("error", reject);
    uploadStream.on("finish", () => {
      resolve(uploadStream.id.toString());
    });
    uploadStream.end(buffer);
  });
}

export async function openMediaDownload(id: string) {
  const { ObjectId } = await import("mongodb");
  const bucket = await getBucket();
  const objectId = new ObjectId(id);

  const files = await bucket.find({ _id: objectId }).toArray();
  if (files.length === 0) return null;

  const file = files[0];
  const metadataContentType = file.metadata?.contentType;
  const contentType =
    typeof metadataContentType === "string"
      ? metadataContentType
      : "application/octet-stream";

  return {
    stream: bucket.openDownloadStream(objectId),
    contentType,
  };
}
