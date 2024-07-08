/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,
    reactCompiler: true,
    forceSwcTransforms: true,
  },
  images: {
    loader: "default",
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
        protocol: "https",
        pathname: "/**",
        port: "",
      },
      {
        hostname: "bisurprizdev.s3.eu-north-1.amazonaws.com",
        protocol: "https",
        pathname: "/**",
        port: "",
      },
      {
        hostname: "lottie.host",
        protocol: "https",
        pathname: "/**",
        port: "",
      },
      {
        hostname: "picsum.photos",
        protocol: "https",
        pathname: "/**",
        port: "",
      },
      {
        hostname: "images.unsplash.com",
        protocol: "https",
        pathname: "/**",
        port: "",
      },
      {
        hostname: "maps.gstatic.com",
        protocol: "https",
        pathname: "/**",
        port: "",
      },
      {
        hostname: "maps.googleapis.com",
        protocol: "https",
        pathname: "/**",
        port: "",
      },
      {
        hostname: "nest-nextjs-13.vercel.app",
        protocol: "https",
        pathname: "/**",
        port: "",
      },
      {
        hostname: "avatars.githubusercontent.com",
        protocol: "https",
        pathname: "/**",
        port: "",
      },
      {
        hostname: "cloudflare-ipfs.com",
        protocol: "https",
        pathname: "/**",
        port: "",
      },
      {
        hostname: "cdn03.ciceksepeti.com",
        protocol: "https",
        pathname: "/**",
        port: "",
      },
      {
        hostname: "loremflickr.com",
        protocol: "https",
        pathname: "/**",
        port: "",
      },
      {
        hostname: "source.unsplash.com",
        protocol: "https",
        pathname: "/**",
        port: "",
      },
      {
        hostname: "s.gravatar.com",
        protocol: "https",
        pathname: "/**",
        port: "",
      },
      {
        hostname: "cdn.trendyol.com",
        protocol: "https",
        pathname: "/**",
        port: "",
      },
      {
        hostname: "www.eticaret.gov.tr",
        protocol: "https",
        pathname: "/**",
        port: "",
      },
    ],
  },
};

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA(nextConfig);
