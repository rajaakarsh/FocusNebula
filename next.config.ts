import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "server.arcgisonline.com",
      },
    ],
  },
};

export default nextConfig;
