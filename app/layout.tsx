import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { Suspense } from "react";
import Loading from "./loading";
import Header from "../components/Layout/Header";
import Content from "@/components/Layout/Content";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ApolloWrapper } from "@/graphql/lib/ApolloWrapper";
import "./globals.css";
import "swiper/css";
import Divider from "@/components/Divider";

const lato = Lato({ subsets: ["latin"], weight: "400" });

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

export default async function RootLayout({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User;
}) {
  return (
    <html lang="tr">
      <UserProvider loginUrl={`/api/auth/login`} profileUrl={`/api/auth/me`}>
        <ApolloWrapper>
          <body className={lato.className} id="root">
            <Suspense fallback={<Loading />}>
              <Header />
              <Divider orientation="horizontal" />
              <Content>{children}</Content>
            </Suspense>
          </body>
        </ApolloWrapper>
      </UserProvider>
    </html>
  );
}
