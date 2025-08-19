import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
     remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com', 
      },
      
    ],
  },
  async rewrites() {
    return [
      {
        source: "/cart/:path*",
        destination: "http://cart-service:3000/cart/:path*", 
      },
    ];
  },
};

export default nextConfig;
