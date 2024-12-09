/** @type {import('next').NextConfig} */

const nextConfig = {
  poweredByHeader: false,
  experimental: {
    scrollRestoration: true,
    optimizePackageImports: [
      "framer-motion",
      "@hookform/resolvers",
      "date-fns",
      "graphql",
      "yup",
      "zustand",
      "react-hook-form",
      "react-transition-progress",
      "@radix-ui",
      "sonner",
      "embla-carousel-react",
    ],
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
      {
        hostname: "d5425fns9u0fk.cloudfront.net",
        protocol: "https",
        pathname: "/**",
        port: "",
      },
      {
        hostname: "lh3.googleusercontent.com",
        protocol: "https",
        pathname: "/**",
        port: "",
      },
      {
        hostname: "d1anzw2j0k6x8s.cloudfront.net",
        protocol: "https",
        pathname: "/**",
        port: "",
      },
      {
        hostname: "dxcht61cb1uj6.cloudfront.net",
        protocol: "https",
        pathname: "/**",
        port: "",
      },
    ],
  },
  env: {
    HASURA_URL: process.env.HASURA_URL,
    HASURA_WS_URL: process.env.HASURA_WS_URL,
    HASURA_GRAPHQL_ADMIN_SECRET: process.env.HASURA_GRAPHQL_ADMIN_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    JWT_SECRET: process.env.JWT_SECRET,
    AUTH_SECRET: process.env.AUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXT_PUBLIC_SELLER_PANEL_URL: process.env.NEXT_PUBLIC_SELLER_PANEL_URL,
    IYZICO_API_KEY: process.env.IYZICO_API_KEY,
    IYZICO_SECRET_KEY: process.env.IYZICO_SECRET_KEY,
    IYZICO_URL: process.env.IYZICO_URL,
    NEXT_PUBLIC_SOCIAL_FACEBOOK: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK,
    NEXT_PUBLIC_SOCIAL_INSTAGRAM: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM,
    NEXT_PUBLIC_SOCIAL_TWITTER: process.env.NEXT_PUBLIC_SOCIAL_TWITTER,
    NEXT_PUBLIC_IYZICO_CALLBACK_URL:
      process.env.NEXT_PUBLIC_IYZICO_CALLBACK_URL,
    NEXT_PUBLIC_HOST: process.env.NEXT_PUBLIC_HOST,
    NEXT_PUBLIC_CLOUDFRONT_URL: process.env.NEXT_PUBLIC_CLOUDFRONT_URL,
    NEXT_PUBLIC_APPROVE_IMAGE_LAMBDA_URL:
      process.env.NEXT_PUBLIC_APPROVE_IMAGE_LAMBDA_URL,
    NEXT_PUBLIC_UPDATE_ORDER_ITEM_IMAGE_URL:
      process.env.NEXT_PUBLIC_UPDATE_ORDER_ITEM_IMAGE_URL,
    CREATE_ORDER_ACTION_URL: process.env.CREATE_ORDER_ACTION_URL,
    CART_COST_URL: process.env.CART_COST_URL,
    JWT_CONFIG: process.env.JWT_CONFIG,
    TYPESENSE_HOST: process.env.TYPESENSE_HOST,
    TYPESENSE_API_KEY: process.env.TYPESENSE_API_KEY,
  },
};

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA(nextConfig);
