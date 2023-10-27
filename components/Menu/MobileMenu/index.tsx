import React from "react";
import { MenuItem } from "..";
import Link from "next/link";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { BsTruck } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { LuLogIn } from "react-icons/lu";
import { PiPathBold } from "react-icons/pi";
import Accordion from "@/components/Accordion";
import { useUser } from "@auth0/nextjs-auth0/client";
import clsx from "clsx";

const mobileHeader = [
  {
    link: "/account/favorites",
    text: "Favorilerim",
    icon: MdOutlineFavoriteBorder,
    private: true,
  },
  {
    link: "/account/orders",
    text: "Siparişlerim",
    icon: BsTruck,
    private: true,
  },
  {
    link: "/account",
    text: "Hesabım",
    icon: AiOutlineShoppingCart,
    private: true,
  },
  {
    link: "/account/cargo-tracking",
    text: "Sipariş Takip",
    icon: PiPathBold,
    private: false,
  },
  {
    link: "/api/auth/login",
    text: "Giriş Yap",
    icon: LuLogIn,
    private: false,
  },
];

const accordionItems = [
  {
    content: <div>adasdasd</div>,
    title: "1",
    className: "border-b",
  },
  {
    content: <div>adasdasd</div>,
    title: "2",
    className: "border-b",
  },
  {
    content: <div>adasdasd</div>,
    title: "3",
    className: "border-b",
  },
  {
    content: <div>adasdasd</div>,
    title: "4",
    className: "border-b",
  },
];

const MobileMenu = ({ items }: { items: MenuItem[] | undefined }) => {
  const { user, isLoading } = useUser();

  return (
    <div className="w-full h-full flex flex-col justify-start items-start">
      <div
        className={clsx([
          "w-full grid  gap-2 mb-2",
          !user ? "grid-cols-2" : "grid-cols-3",
        ])}
      >
        {mobileHeader.map((item, index) => (
          <Link
            key={item.text}
            href={item.link}
            className={clsx([
              "flex flex-col items-center justify-center w-full px-2 py-4 border rounded-md border-primarlight text-primary hover:bg-primary-light hover:text-white transition-colors duration-200 ease-in-out",
              !user && item.private && "hidden",
              user && !item.private && "hidden",
            ])}
          >
            <item.icon className="w-4 h-4" />
            <span className="text-xs">{item.text}</span>
          </Link>
        ))}
      </div>
      <div className="w-full h-full">
        <Accordion items={accordionItems} bordered={false} />
      </div>
    </div>
  );
};

export default MobileMenu;
