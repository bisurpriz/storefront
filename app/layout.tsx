import Content from "@/components/Layout/Content";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Lato, Manrope, Quicksand } from "next/font/google";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/zoom";
import Header from "../components/Layout/Header";
import "./globals.css";

import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev";
import "@smastrom/react-rating/style.css";
import tr from "date-fns/locale/tr";
import setDefaultOptions from "date-fns/setDefaultOptions";
import "react-datepicker/dist/react-datepicker.css";
import Listener from "./account/messages/components/Listener";
import { getSession } from "@auth0/nextjs-auth0";
import { GoogleAnalytics } from "@next/third-parties/google";

setDefaultOptions({
  weekStartsOn: 1,
  firstWeekContainsDate: 1,
  locale: tr,
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
});

const quickSand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
});

export const metadata: Metadata = {
  title: "Bonnmarşe",
  description: "Sevdiklerinize sürpriz yapın",
  creator: "Bonnmarşe",
  icons: {
    icon: "./favicon.ico",
  },
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
};
export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (process.env.NODE_ENV === "development") {
    loadDevMessages();
    loadErrorMessages();
  }

  const session = await getSession();

  return (
    <html lang='tr'>
      <body
        className={`${lato.variable} ${quickSand.variable} 
        ${manrope.variable}
        font-manrope relative scroll-smooth overflow-hidden mb-10`}
        id='root'
      >
        <SpeedInsights debug={process.env.NODE_ENV === "development"} />
        <UserProvider
          loginUrl={`/api/auth/login`}
          profileUrl={`/api/auth/me`}
          user={session?.user}
        >
          <Header />
          <Content>{children}</Content>
          <Listener />
        </UserProvider>
      </body>
      <GoogleAnalytics gaId="G-WWEREE808L" />
    </html>
  );
}
