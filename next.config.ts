import type { NextConfig } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
      // Izinkan Server Actions dari localhost (dev) DAN URL produksi (Vercel)
      allowedOrigins: ["https://localhost:3000", siteUrl],
    },
  },
};

export default nextConfig;
