/** @type {import('next').NextConfig} */

const { withSentryConfig } = require("@sentry/nextjs");

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
      "swiper",
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
    ],
  },
  env: {
    HASURA_URL: process.env.HASURA_URL,
    HASURA_WS_URL: process.env.HASURA_WS_URL,
    HASURA_GRAPHQL_ADMIN_SECRET: process.env.HASURA_GRAPHQL_ADMIN_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    JWT_SECRET: process.env.JWT_SECRET,
    SECRET: process.env.SECRET,
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
  },
};

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

module.exports = withSentryConfig(withPWA(nextConfig), {
  silent: false,
  org: "bonnmarse-c9",
  project: "javascript-nextjs",
  authToken: process.env.SENTRY_AUTH_TOKEN,
});

// Injected content via Sentry wizard below

/* module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    org: "bonnmarse-c9",
    project: "javascript-nextjs",
    sentryUrl: "https://sentry.io/",

    // Only print logs for uploading source maps in CI
    silent: !process.env.CI,

    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    // tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: false,
  }
);
 */
