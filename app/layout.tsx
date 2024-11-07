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
import { ProgressBar, ProgressBarProvider } from "react-transition-progress";

import { ApolloWrapper } from "@/graphql/lib/apollo-wrapper";
import { query } from "@/graphql/lib/client";

import StickyHeader from "@/components/Layout/Header/StickyHeader";
import QuarterSelectorModal from "@/components/QuarterSelector/QuarterSelectorModal";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ResponsiveDialogProvider } from "@/contexts/DialogContext/ResponsiveDialogContext";
import { ProductProvider } from "@/contexts/ProductContext";
import { SearchProductProvider } from "@/contexts/SearchContext";
import {
  GetMainCategoriesDocument,
  GetMainCategoriesQuery,
  GetMainCategoriesQueryVariables,
} from "@/graphql/queries/categories/getCategories.generated";
import { cookies } from "next/headers";
import Script from "next/script";
import { ReactNode, Suspense } from "react";
import { CookieTokens } from "./@auth/contants";
import { getUserById } from "./account/actions";
import { getCart } from "./cart/actions";

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
  const data = await getUserById();
  const { cartItems, costData } = await getCart(data?.user?.id);

  const { data: categoryData } = await query<
    GetMainCategoriesQuery,
    GetMainCategoriesQueryVariables
  >({
    query: GetMainCategoriesDocument,
    fetchPolicy: "no-cache",
  });

  const cookie = await cookies();

  const selectedPlaces = cookie.get(CookieTokens.LOCATION_ID);
  const hasSeenLocationModal = cookie.get(CookieTokens.HAS_SEEN_LOCATION_MODAL);

  return (
    <html lang="tr">
      <GoogleTagManagerInjector />
      <body
        className={`${lato.variable} ${quickSand.variable} ${manrope.variable} relative overflow-auto overflow-x-hidden scroll-smooth font-manrope`}
        id="root"
      >
        <ProgressBarProvider>
          <ProgressBar className="fixed top-0 z-[1000] h-1 bg-primary shadow-lg shadow-sky-500/20" />
          <TagManagerNoscript />
          <Script
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBaoFsD1n1A9l9QrAxJsQkid54Jd_s8Glk&libraries=places"
            id="googleMapsScript"
            strategy="beforeInteractive"
            async={true}
          />
          <AuthProvider user={data?.user}>
            <TooltipProvider>
              <ResponsiveDialogProvider>
                <ApolloWrapper>
                  <ProductProvider>
                    <CategoryProvider category={categoryData?.category}>
                      <CartProvider
                        cartDbItems={cartItems}
                        dbCost={{
                          totalPrice: costData.totalPrice,
                          isCouponApplied: false,
                          couponMessage: "",
                          discountAmount: 0,
                        }}
                      >
                        <SearchProductProvider>
                          <Suspense fallback={<HeaderSuspense />}>
                            <Header category={categoryData?.category} />
                            <StickyHeader />
                          </Suspense>
                          <Content>{children}</Content>
                          {auth}
                          <Suspense>
                            {!selectedPlaces && !hasSeenLocationModal && (
                              <QuarterSelectorModal />
                            )}
                          </Suspense>
                        </SearchProductProvider>
                      </CartProvider>
                    </CategoryProvider>
                  </ProductProvider>
                </ApolloWrapper>
              </ResponsiveDialogProvider>
            </TooltipProvider>
          </AuthProvider>
        </ProgressBarProvider>
      </body>
    </html>
  );
}
