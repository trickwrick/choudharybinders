import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "image1.jdomni.in",
      },
      {
        protocol: "https",
        hostname: "image2.jdomni.in",
      },
      {
        protocol: "https",
        hostname: "image3.jdomni.in",
      },
    ],
  },
};

export default nextConfig;
