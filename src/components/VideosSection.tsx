"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState } from "react";
import { cardHover3d } from "@/lib/animations";
import { videoThumbnails } from "@/lib/site-images";
import Container from "./Container";
import Reveal from "./motion/Reveal";
import SectionDivider from "./motion/SectionDivider";
import { StaggerItem, StaggerReveal } from "./motion/StaggerReveal";
import SectionHeading from "./SectionHeading";

const IMAGE_FALLBACK = "/gallery/07-flex-printing.jpg";

function VideoThumbnail({
  src,
  alt,
  duration,
  title,
}: {
  src: string;
  alt: string;
  duration: string;
  title: string;
}) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <motion.button
      type="button"
      initial="rest"
      whileHover="hover"
      variants={cardHover3d}
      whileTap={{ scale: 0.98 }}
      className="perspective-card group w-full overflow-hidden rounded-xl border border-border bg-white text-left shadow-sm transition-shadow hover:shadow-xl hover:shadow-black/5"
      aria-label={`Play video: ${title}`}
    >
      <div className="relative aspect-video overflow-hidden bg-neutral-200">
        <Image
          src={imgSrc}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-600 group-hover:scale-105"
          onError={() => {
            if (imgSrc !== IMAGE_FALLBACK) setImgSrc(IMAGE_FALLBACK);
          }}
        />

        <div className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-black/40" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-lg ring-4 ring-white/30 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:ring-primary/40">
            <Play className="ml-1 h-7 w-7 fill-primary text-primary transition-colors group-hover:fill-white group-hover:text-white" />
          </div>
        </div>

        <span className="absolute bottom-2.5 right-2.5 rounded-md bg-black/70 px-2 py-0.5 text-xs font-medium text-white">
          {duration}
        </span>
      </div>

      <p className="px-4 py-3 text-sm font-medium text-text transition-colors group-hover:text-primary">
        {title}
      </p>
    </motion.button>
  );
}

export default function VideosSection() {
  return (
    <>
      <SectionDivider variant="mint" />
      <section id="videos" className="relative bg-section-mint py-12 sm:py-16">
        <Container>
          <SectionHeading spaced>Videos</SectionHeading>

          <Reveal delay={0.1} className="mx-auto -mt-6 mb-10 max-w-xl text-center">
            <p className="text-sm text-text/60">
              See our printing, signage &amp; installation work in action
            </p>
          </Reveal>

          <StaggerReveal
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.1}
          >
            {videoThumbnails.map((video) => (
              <StaggerItem key={video.title}>
                <VideoThumbnail
                  src={video.src}
                  alt={video.title}
                  duration={video.duration}
                  title={video.title}
                />
              </StaggerItem>
            ))}
          </StaggerReveal>
        </Container>
      </section>
    </>
  );
}
