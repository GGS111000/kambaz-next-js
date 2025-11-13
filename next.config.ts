import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.staradvertiser.com'], // ✅ add your external host here
  },
}

export default nextConfig
