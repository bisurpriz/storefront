import { useUser } from "@/contexts/AuthContext";
import clsx from "clsx";
import Link from "next/link";
import { memo } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsTruck } from "react-icons/bs";
import { FiPhoneCall } from "react-icons/fi";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { PiPathBold } from "react-icons/pi";
import MenuItem from "./MenuItem";
import { getUserById } from "@/app/account/actions";

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

const MobileMenu = async ({ items }: { items: MenuItem[] | undefined }) => {
  const { user } = await getUserById();

  return (
    <div className="w-full h-full flex flex-col justify-start items-start">
      <div
        className={clsx([
          "w-full grid  gap-2 mb-2",
          !user ? "grid-cols-2" : "grid-cols-3",
        ])}
      >
        {mobileHeader.map((item) => (
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
        <ul>
          {items?.map((item, index) => (
            <MenuItem key={index} {...item} />
          ))}
        </ul>
      </div>
      <div
        className={`w-full grid ${!user ? "grid-cols-1" : "grid-cols-2"} gap-4`}
      >
        <>
          <Link
            href={"/contact"}
            className={clsx([
              "flex gap-2 items-center justify-center w-full px-2 py-4 border rounded-md border-primarlight text-primary",
            ])}
          >
            <FiPhoneCall className="w-4 h-4" />
            <span className="text-xs">İletişim</span>
          </Link>
          <Link
            href={"/api/auth/logout"}
            className={clsx([
              "flex gap-2 items-center justify-center w-full px-2 py-4 border rounded-md border-primarlight text-primary",
              !user && "hidden",
            ])}
          >
            <LuLogOut className="w-4 h-4" />
            <span className="text-xs">Çıkış Yap</span>
          </Link>
        </>
      </div>
    </div>
  );
};

export default memo(MobileMenu);
