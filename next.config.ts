import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-v2.didongviet.vn",
        pathname: "/files/**",
      },
      {
        protocol: "https",
        hostname: "didongviet.vn",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
