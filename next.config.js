/** @type {import('next').NextConfig} */
const nextConfig = {
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
    ],
  },
};

module.exports = nextConfig;
