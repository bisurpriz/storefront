import Content from "@/components/Layout/Content";
import type { Metadata, Viewport } from "next";
import { Lato, Manrope, Quicksand } from "next/font/google";
import Header from "../components/Layout/Header";
import "./globals.css";

import { GoogleTagManagerInjector } from "@/components/GoogleTagManager";
import TagManagerNoscript from "@/components/GoogleTagManager/TagManagerNoscript";
import HeaderSuspense from "@/components/Layout/Header/HeaderSuspense";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { CategoryProvider } from "@/contexts/CategoryContext";

import { ApolloWrapper } from "@/graphql/lib/apollo-wrapper";
import { query } from "@/graphql/lib/client";

import { ReactNode, Suspense } from "react";
import { getUserById } from "./account/actions";
import { getCart } from "./cart/actions";
import {
  GetMainCategoriesDocument,
  GetMainCategoriesQuery,
  GetMainCategoriesQueryVariables,
} from "@/graphql/queries/categories/getCategories.generated";
import StickyHeader from "@/components/Layout/Header/StickyHeader";
import { ProductProvider } from "@/contexts/ProductContext";

export const experimental_ppr = true;

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

const quickSand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
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
    "sürpriz",
    "sevgiliye sürpriz",
    "sevgiliye hediye",
    "sevgiliye doğum günü hediyesi",
    "sevgiliye doğum günü sürprizi",
    "sevgiliye doğum günü",
    "sevgiliye doğum günü hediyesi ne alınır",
    "sevgiliye doğum günü hediyesi fikirleri",
    "sevgiliye doğum günü hediyesi ne alabilirim",
    "sevgiliye doğum günü hediyesi ne yapabilirim",
    "sevgiliye doğum günü hediyesi ne alınır ekşi",
    "sevgiliye doğum günü hediyesi ne alınır kadın",
    "sevgiliye doğum günü hediyesi ne alınır erkek",
    "çiçek",
    "çiçek siparişi",
    "çiçek siparişi ankara",
    "çiçek siparişi istanbul",
    "hediyelik eşya",
    "hediyelik eşya ankara",
    "hediye",
    "hediye ankara",
    "hediye istanbul",
    "hediye fikirleri",
    "çikolata",
    "çikolata ankara",
    "çikolata istanbul",
    "çikolata çeşitleri",
    "çikolata çeşitleri ankara",
    "çikolata çeşitleri istanbul",
    "çikolata çeşitleri fiyatları",
    "çikolata çeşitleri fiyatları ankara",
    "çikolata çeşitleri fiyatları istanbul",
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
  const { user } = await getUserById();
  const { cartItems, costData } = await getCart(user?.id);
  const {
    data: { category },
  } = await query<GetMainCategoriesQuery, GetMainCategoriesQueryVariables>({
    query: GetMainCategoriesDocument,
    fetchPolicy: "no-cache",
  });

  return (
    <html lang="tr">
      <GoogleTagManagerInjector />
      <body
        className={`${lato.variable} ${quickSand.variable} 
        ${manrope.variable}
        font-manrope relative scroll-smooth overflow-auto overflow-x-hidden`}
        id="root"
      >
        <TagManagerNoscript />
        <AuthProvider user={user}>
          <ApolloWrapper>
            <ProductProvider>
              <CategoryProvider category={category}>
                <CartProvider cartDbItems={cartItems} dbCost={costData}>
                  <Suspense fallback={<HeaderSuspense />}>
                    <Header category={category} />
                    <StickyHeader />
                  </Suspense>
                  <Content>{children}</Content>
                  {auth}
                </CartProvider>
              </CategoryProvider>
            </ProductProvider>
          </ApolloWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
