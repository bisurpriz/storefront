/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,
    reactCompiler: true,
    forceSwcTransforms: true,
    scrollRestoration: true,
    optimizePackageImports: [
      "framer-motion",
      "@mui/base",
      "@hookform/resolvers",
      "date-fns",
      "graphql",
      "yup",
      "zustand",
      "react-hook-form",
    ],
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
  images: {
    loader: "default",
    remotePatterns: [
      {
        hostname: "picsum.photos",
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
        hostname: "www.eticaret.gov.tr",
        protocol: "https",
        pathname: "/**",
        port: "",
      },
      {
        hostname: "via.placeholder.com",
        protocol: "https",
        pathname: "/**",
        port: "",
      },
      {
        hostname: "d1sk8qn67xoao2.cloudfront.net",
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
