import "./globals.css";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { Suspense } from "react";
import Loading from "./loading";
import { i18n } from "@/utils/i18n-config";
import Header from "../../components/Layout/Header";
import Content from "@/components/Layout/Content";

const lato = Lato({ subsets: ["latin"], weight: "400" });

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const metadata: Metadata = {
  title: "BiSürpriz",
  description: "Sevdiklerinize sürpriz yapın",
  creator: "BiSürpriz",
  icons: {
    icon: "/assets/imgs/theme/favicon.ico",
    apple: "/assets/imgs/theme/apple-touch-icon.png",
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

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={params.lang}>
      <body className={lato.className}>
        <Suspense fallback={<Loading />}>
          <Header />
          <Content>{children}</Content>
        </Suspense>
      </body>
    </html>
  );
}
