import type { Metadata, Viewport } from "next";
import { Lato, Manrope } from "next/font/google";
import "./globals.css";

//import ValentinesBanner from "@/components/Banner/ValentinesBanner";
import { GoogleTagManagerInjector } from "@/components/GoogleTagManager";
import MobileBottomNav from "@/components/MobileBottomNav";
import { GetMainCategoriesQuery } from "@/graphql/queries/categories/getCategories.generated";
import { GetCategoriesDocument } from "@/service/category";
import { BonnmarseApi } from "@/service/fetch";
import { getUserById } from "@/service/user";
import dynamic from "next/dynamic";
import { headers } from "next/headers";
import { userAgent } from "next/server";
import { ReactNode, Suspense } from "react";
import { getCart } from "./(cart)/cart/actions";
import { Providers } from "./providers";

// Dinamik import ile QuarterSelectorModal'ı lazy load ediyoruz
const QuarterSelectorModal = dynamic(
  () => import("@/components/QuarterSelector/QuarterSelectorModal"),
  { ssr: true },
);

// Font optimizasyonu - preload stratejisi ile
const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
  preload: true,
  adjustFontFallback: true,
  display: "optional", // Font yüklenirken sistem fontunu kullan, hazır olunca değiştir
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
  preload: true,
  adjustFontFallback: true,
  display: "optional", // Font yüklenirken sistem fontunu kullan, hazır olunca değiştir
});

// Metadata'yı optimize et
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_HOST || "https://bonnmarse.com",
  ),
  title: "Bonnmarşe | Sevdiklerinize sürpriz yapın",
  description: "Sevdiklerinize sürpriz yapın",
  creator: "Bonnmarşe",
  icons: {
    icon: [
      {
        url: "https://d1sk8qn67xoao2.cloudfront.net/system-assets/logo-kare.png?width=32&height=32&quality=70",
        sizes: "32x32",
      },
    ],
    apple: [
      {
        url: "https://d1sk8qn67xoao2.cloudfront.net/system-assets/logo-kare.png?width=180&height=180&quality=70",
        sizes: "180x180",
      },
    ],
  },
  keywords: [
    "Bonnmarşe",
    "Bonnmarşe.com",
    "Sevdiklerinize sürpriz yapın",
    "Hediye",
    "Çiçek",
    "Çikolata",
    "Hediye gönder",
    "Hediye al",
    "Hediye fikirleri",
    "Hediye önerileri",
    "Hediye kutusu",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  manifest: "/manifest.json",
  generator: "Bonnmarşe",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: process.env.NEXT_PUBLIC_HOST,
    siteName: "Bonnmarşe",
    title: "Bonnmarşe | Sevdiklerinize sürpriz yapın",
    description: "Sevdiklerinize sürpriz yapın",
  },
};

export const viewport: Viewport = {
  maximumScale: 1,
  minimumScale: 1,
  initialScale: 1,
  width: "device-width",
  userScalable: false,
  themeColor: "#ffffff",
};

async function getInitialData() {
  const [userData, categoryData] = await Promise.all([
    getUserById(),
    BonnmarseApi.request<GetMainCategoriesQuery>({
      query: GetCategoriesDocument,
      tags: ["getMainCategories"],
      cache: {
        enable: true,
        duration: 30 * 60 * 1000,
      },
      withAuth: false,
    }),
  ]);

  const cartData = await getCart();

  return {
    userData,
    categoryData,
    cartData,
  };
}

export default async function RootLayout({
  children,
  auth,
}: {
  children: ReactNode;
  auth: ReactNode;
}) {
  const isBot = userAgent({
    headers: await headers(),
  }).isBot;

  // Paralel veri çekme
  const { userData, categoryData, cartData } = await getInitialData();

  return (
    <html lang="tr">
      <head>
        <link
          rel="preconnect"
          href="https://d1sk8qn67xoao2.cloudfront.net"
          crossOrigin="anonymous"
        />
        <meta
          name="google-site-verification"
          content="gg9nv9VRXJP_xbO8UJ-ALrSEsMbD18n3cpS6nBAGKn8"
        />
      </head>
      <GoogleTagManagerInjector />
      <body
        className={`${lato.variable} ${manrope.variable} flex h-dvh flex-col font-manrope`}
        id="root"
      >
        <Providers
          userData={userData}
          categoryData={categoryData}
          cartItems={cartData.cartItems}
          costData={cartData.costData}
        >
          {/* <ValentinesBanner /> */}

          {children}
          {auth}
          {!isBot && (
            <Suspense fallback={null}>
              <QuarterSelectorModal />
            </Suspense>
          )}
          <MobileBottomNav />
        </Providers>
      </body>
    </html>
  );
}
