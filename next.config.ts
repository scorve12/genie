import type { NextConfig } from "next";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const apiUrlObj = new URL(apiUrl);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
      {
        protocol: apiUrlObj.protocol.replace(':', '') as 'http' | 'https',
        hostname: apiUrlObj.hostname,
        port: apiUrlObj.port || '',
      },
    ],
  },
};

export default nextConfig;
