/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "maps.gstatic.com",
      "maps.googleapis.com",
      "images.unsplash.com",
      "nest-nextjs-13.vercel.app",
    ],
    loader: "default",
  },
};

module.exports = nextConfig;
