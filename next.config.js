/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["maps.gstatic.com", "maps.googleapis.com"],
    loader: "default",
  },
};

module.exports = nextConfig;
