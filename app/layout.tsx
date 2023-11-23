import type { Metadata } from "next";
import { Lato, Quicksand } from "next/font/google";
import { Suspense } from "react";
import Loading from "./loading";
import Header from "../components/Layout/Header";
import Content from "@/components/Layout/Content";
import { UserProvider } from "@auth0/nextjs-auth0/client";

import "./globals.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/zoom";

import "@smastrom/react-rating/style.css";
import setDefaultOptions from "date-fns/setDefaultOptions";
import "react-datepicker/dist/react-datepicker.css";
import tr from "date-fns/locale/tr";

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

const quickSand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
});

export const metadata: Metadata = {
  title: "BiSürpriz",
  description: "Sevdiklerinize sürpriz yapın",
  creator: "BiSürpriz",
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
  ],
  robots: "index, follow",
};
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User;
}) {
  if (process.env.NODE_ENV === "development") {
    loadDevMessages();
    loadErrorMessages();
  }
  return (
    <html lang="tr">
      <body
        className={`${lato.variable} ${quickSand.variable} font-sans relative scroll-smooth`}
        id="root"
      >
        <Suspense fallback={<Loading />}>
          <UserProvider
            loginUrl={`/api/auth/login`}
            profileUrl={`/api/auth/me`}
          >
            <Header />
            <Content>{children}</Content>
          </UserProvider>
        </Suspense>
      </body>
    </html>
  );
}
