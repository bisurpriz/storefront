/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "maps.gstatic.com",
      "maps.googleapis.com",
      "images.unsplash.com",
      "nest-nextjs-13.vercel.app",
      "picsum.photos",
      "lh3.googleusercontent.com",
    ],
    loader: "default",
  },
};

module.exports = nextConfig;
