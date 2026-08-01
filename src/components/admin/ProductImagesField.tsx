"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ImagePlus, Link2, Loader2, Star, Trash2, Upload } from "lucide-react";

type ProductImagesFieldProps = {
  mainImage: string;
  images: string[];
  folder?: string;
  onChange: (next: { mainImage: string; images: string[] }) => void;
};

function uniqueUrls(urls: string[]) {
  return [...new Set(urls.filter(Boolean))];
}

export default function ProductImagesField({
  mainImage,
  images,
  folder = "products",
  onChange,
}: ProductImagesFieldProps) {
  const mainInputRef = useRef<HTMLInputElement>(null);
  const extraInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState<"main" | "extra" | null>(null);
  const [error, setError] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlValue, setUrlValue] = useState("");

  const gallery = uniqueUrls([mainImage, ...images]);
  const extras = gallery.filter((url) => url !== mainImage);

  const emit = (nextMain: string, nextGallery: string[]) => {
    const cleaned = uniqueUrls([nextMain, ...nextGallery]);
    onChange({
      mainImage: nextMain,
      images: cleaned.length ? cleaned : nextMain ? [nextMain] : [],
    });
  };

  const uploadFile = async (file: File, target: "main" | "extra") => {
    setUploading(target);
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

      if (target === "main") {
        emit(data.url, gallery);
      } else {
        emit(mainImage || data.url, [...gallery, data.url]);
      }
    } catch (uploadError) {
      setError(
        uploadError instanceof Error ? uploadError.message : "Upload failed",
      );
    } finally {
      setUploading(null);
    }
  };

  const addByUrl = () => {
    const next = urlValue.trim();
    if (!next) return;
    if (!mainImage) {
      emit(next, [next]);
    } else {
      emit(mainImage, [...gallery, next]);
    }
    setUrlValue("");
    setShowUrlInput(false);
  };

  const setAsMain = (url: string) => {
    emit(url, gallery);
  };

  const removeImage = (url: string) => {
    const remaining = gallery.filter((item) => item !== url);
    if (url === mainImage) {
      emit(remaining[0] ?? "", remaining);
      return;
    }
    emit(mainImage, remaining);
  };

  return (
    <div className="space-y-4 rounded-2xl border border-border/70 bg-light-bg/60 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-sm font-semibold text-text">Product Images</span>
          <p className="mt-0.5 text-xs text-text/55">
            1 main image + optional extra gallery images. You can change the main
            image anytime.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowUrlInput((current) => !current)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
        >
          <Link2 className="h-3.5 w-3.5" />
          {showUrlInput ? "Hide URL" : "Add by URL"}
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-[220px_minmax(0,1fr)]">
        <div className="space-y-3">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-dashed border-border bg-white">
            {mainImage ? (
              <>
                <Image
                  src={mainImage}
                  alt="Main product"
                  fill
                  unoptimized
                  className="object-cover"
                />
                <span className="absolute left-2 top-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                  Main
                </span>
              </>
            ) : (
              <div className="flex h-full flex-col items-center justify-center text-center text-text/45">
                <ImagePlus className="h-8 w-8" />
                <p className="mt-2 px-3 text-xs">No main image</p>
              </div>
            )}
          </div>

          <input
            ref={mainInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void uploadFile(file, "main");
              event.target.value = "";
            }}
          />

          <button
            type="button"
            onClick={() => mainInputRef.current?.click()}
            disabled={uploading !== null}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
          >
            {uploading === "main" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            {uploading === "main"
              ? "Uploading..."
              : mainImage
                ? "Change Main Image"
                : "Upload Main Image"}
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-text">Extra Images</p>
            <input
              ref={extraInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void uploadFile(file, "extra");
                event.target.value = "";
              }}
            />
            <button
              type="button"
              onClick={() => extraInputRef.current?.click()}
              disabled={uploading !== null}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-semibold text-text/70 hover:border-primary/30 hover:text-primary disabled:opacity-60"
            >
              {uploading === "extra" ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <ImagePlus className="h-3.5 w-3.5" />
              )}
              Add Extra
            </button>
          </div>

          {extras.length === 0 ? (
            <div className="flex min-h-[120px] items-center justify-center rounded-xl border border-dashed border-border bg-white px-4 text-center text-xs text-text/45">
              No extra images yet. Add more photos for the product gallery.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {extras.map((url) => (
                <div
                  key={url}
                  className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-white"
                >
                  <Image
                    src={url}
                    alt="Extra product"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex gap-1 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-100 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={() => setAsMain(url)}
                      className="inline-flex flex-1 items-center justify-center gap-1 rounded-md bg-white/95 px-2 py-1 text-[10px] font-bold text-text"
                      title="Set as main image"
                    >
                      <Star className="h-3 w-3 text-primary" />
                      Main
                    </button>
                    <button
                      type="button"
                      onClick={() => removeImage(url)}
                      className="inline-flex items-center justify-center rounded-md bg-red-500 px-2 py-1 text-white"
                      title="Remove image"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <p className="text-xs leading-relaxed text-text/55">
            JPG, PNG, WEBP, or GIF up to 5 MB. Extra images show in the product
            gallery on the website.
          </p>
        </div>
      </div>

      {showUrlInput ? (
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="text"
            value={urlValue}
            onChange={(event) => setUrlValue(event.target.value)}
            placeholder="/products/example.jpg"
            className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-primary"
          />
          <button
            type="button"
            onClick={addByUrl}
            className="shrink-0 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white"
          >
            {mainImage ? "Add URL" : "Set as Main"}
          </button>
        </div>
      ) : null}

      {mainImage ? (
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => removeImage(mainImage)}
            className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Remove main image
          </button>
          <span className="text-xs text-text/45">
            {gallery.length} image{gallery.length === 1 ? "" : "s"} total
          </span>
        </div>
      ) : null}

      {error ? (
        <p className="rounded-xl bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
