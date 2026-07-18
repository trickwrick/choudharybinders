"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { videoThumbnails } from "@/lib/site-images";
import Container from "./Container";
import SectionHeading from "./SectionHeading";

export default function VideosSection() {
  return (
    <section id="videos" className="bg-section-mint py-12 sm:py-16">
      <Container>
        <SectionHeading spaced>Videos</SectionHeading>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {videoThumbnails.map((video) => (
            <motion.button
              key={video.title}
              type="button"
              variants={staggerItem}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="group overflow-hidden rounded-xl border border-border bg-white text-left shadow-sm transition-shadow hover:shadow-xl hover:shadow-black/5"
            >
              <div className="relative aspect-video overflow-hidden bg-light-bg">
                <Image
                  src={video.src}
                  alt={video.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-primary/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm ring-2 ring-white/30 transition-all group-hover:bg-accent/80 group-hover:ring-accent"
                  >
                    <Play className="h-6 w-6 fill-white text-white" />
                  </motion.div>
                </div>
                <span className="absolute bottom-2 right-2 rounded bg-black/60 px-2 py-0.5 text-xs text-white">
                  {video.duration}
                </span>
              </div>
              <p className="px-4 py-3 text-sm font-medium text-text transition-colors group-hover:text-primary">
                {video.title}
              </p>
            </motion.button>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
