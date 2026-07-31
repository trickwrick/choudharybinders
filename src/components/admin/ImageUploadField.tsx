"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ImagePlus, Link2, Loader2, Upload } from "lucide-react";

type ImageUploadFieldProps = {
  label?: string;
  value: string;
  folder?: string;
  onChange: (url: string) => void;
};

export default function ImageUploadField({
  label = "Product Image",
  value,
  folder = "products",
  onChange,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);

  const handleUpload = async (file: File) => {
    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Upload failed");
      }

      onChange(data.url);
      setShowUrlInput(false);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error ? uploadError.message : "Upload failed",
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-border/70 bg-light-bg/60 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-text">{label}</span>
        <button
          type="button"
          onClick={() => setShowUrlInput((current) => !current)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
        >
          <Link2 className="h-3.5 w-3.5" />
          {showUrlInput ? "Hide URL" : "Use URL instead"}
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-[180px_minmax(0,1fr)]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-dashed border-border bg-white">
          {value ? (
            <Image
              src={value}
              alt="Preview"
              fill
              unoptimized
              className="object-cover"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-center text-text/45">
              <ImagePlus className="h-8 w-8" />
              <p className="mt-2 px-3 text-xs">No image selected</p>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void handleUpload(file);
              event.target.value = "";
            }}
          />

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
          >
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            {uploading ? "Uploading..." : "Upload Image"}
          </button>

          <p className="text-xs leading-relaxed text-text/55">
            JPG, PNG, WEBP, or GIF up to 5 MB. Uploaded images are saved for
            your website product listing.
          </p>

          {showUrlInput ? (
            <label className="block">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-text/50">
                Image URL
              </span>
              <input
                type="text"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder="/products/example.jpg"
                className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-primary"
              />
            </label>
          ) : null}

          {error ? (
            <p className="rounded-xl bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
              {error}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
