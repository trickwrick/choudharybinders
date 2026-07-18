"use client";

import Image from "next/image";
import { useState } from "react";

type AspectRatio = "4/3" | "16/9" | "16/7" | "square" | "video";

interface SectionImageProps {
  src: string;
  alt: string;
  aspect?: AspectRatio;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  fit?: "cover" | "contain";
}

const aspectClasses: Record<AspectRatio, string> = {
  "4/3": "aspect-[4/3]",
  "16/9": "aspect-[16/9]",
  "16/7": "aspect-[16/7]",
  square: "aspect-square",
  video: "aspect-video",
};

const FALLBACK = "/categories/flex-printing.jpg";

export default function SectionImage({
  src,
  alt,
  aspect = "4/3",
  className = "",
  imageClassName = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  fit = "cover",
}: SectionImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const objectClass = fit === "contain" ? "object-contain" : "object-cover";

  return (
    <div
      className={`relative w-full overflow-hidden bg-white ${aspectClasses[aspect]} ${className}`}
    >
      <Image
        src={imgSrc}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        onError={() => {
          if (imgSrc !== FALLBACK) setImgSrc(FALLBACK);
        }}
        className={`${objectClass} p-2 transition-transform duration-500 group-hover:scale-105 ${imageClassName}`}
      />
    </div>
  );
}
