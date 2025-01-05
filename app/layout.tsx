import type { Metadata, Viewport } from "next";
import { Lato, Manrope } from "next/font/google";
import "./globals.css";

import { GoogleTagManagerInjector } from "@/components/GoogleTagManager";

import DesignLayout from "@/components/Layout/DesignLayout";
import NotificationListener from "@/components/Notification/NotificationListener";
import QuarterSelectorModal from "@/components/QuarterSelector/QuarterSelectorModal";
import { GetMainCategoriesQuery } from "@/graphql/queries/categories/getCategories.generated";
import { GetCategoriesDocument } from "@/service/category";
import { BonnmarseApi } from "@/service/fetch";
import { getUserById } from "@/service/user";
import Head from "next/head";
import { cookies, headers } from "next/headers";
import { userAgent } from "next/server";
import { ReactNode, Suspense } from "react";
import { CookieTokens } from "./@auth/contants";
import { getCart } from "./cart/actions";
import { Providers } from "./providers";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
  preload: true,
  adjustFontFallback: true,
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Bonnmarşe | Sevdiklerinize sürpriz yapın",
  description: "Sevdiklerinize sürpriz yapın",
  creator: "Bonnmarşe",
  icons: [
    {
      rel: "icon",
      url: "https://d1sk8qn67xoao2.cloudfront.net/system-assets/logo-kare.png?width=32&height=32&quality=70",
    },
    {
      rel: "apple-touch-icon",
      url: "https://d1sk8qn67xoao2.cloudfront.net/system-assets/logo-kare.png?width=180&height=180&quality=70",
    },
  ],
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
  robots: "index, follow",
  manifest: "/manifest.json",
  generator: "Bonnmarşe",
};

export const viewport: Viewport = {
  maximumScale: 1,
  minimumScale: 1,
  initialScale: 1,
  width: "device-width",
  userScalable: false,
};

export default async function RootLayout({
  children,
  auth,
}: {
  children: ReactNode;
  auth: ReactNode;
}) {
  const { get } = await cookies();

  const [selectedPlaces, hasSeenLocationModal, userId] = [
    get(CookieTokens.LOCATION_ID),
    get(CookieTokens.HAS_SEEN_LOCATION_MODAL)?.value,
    get(CookieTokens.USER_ID)?.value,
  ];

  const isBot = userAgent({
    headers: await headers(),
  }).isBot;

  const userData = await getUserById(userId);
  const { cartItems, costData } = await getCart(userData?.user_by_pk.id);
  const categoryData = await BonnmarseApi.request<GetMainCategoriesQuery>({
    query: GetCategoriesDocument,
    tags: ["getMainCategories"],
    cache: {
      enable: true,
      duration: 30 * 60 * 1000,
    },
    withAuth: false,
  });

  return (
    <html lang="tr">
      <GoogleTagManagerInjector />
      <NotificationListener />
      <Head>
        <meta
          name="google-site-verification"
          content="gg9nv9VRXJP_xbO8UJ-ALrSEsMbD18n3cpS6nBAGKn8"
        />
      </Head>
      <body
        className={`${lato.variable} ${manrope.variable} h-dvh font-manrope`}
        id="root"
      >
        <Providers
          userData={userData}
          categoryData={categoryData}
          cartItems={cartItems}
          costData={costData}
        >
          <DesignLayout categories={categoryData?.category}>
            {children}
          </DesignLayout>
          {auth}
          <Suspense>
            {!selectedPlaces && !hasSeenLocationModal && !isBot && (
              <QuarterSelectorModal />
            )}
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
