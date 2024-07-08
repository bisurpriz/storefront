"use client";
import { useUser } from "@/contexts/AuthContext";
import clsx from "clsx";
import Link from "next/link";
import MenuItem from "./MenuItem";
import { logout } from "@/app/@auth/actions";
import { useRouter } from "next/navigation";
import Heart from "@/components/Icons/Heart";
import Truck from "@/components/Icons/Truck";
import Basket from "@/components/Icons/Basket";
import PathBold from "@/components/Icons/PathBold";
import Login from "@/components/Icons/Login";
import Phone from "@/components/Icons/Phone";
import Logout from "@/components/Icons/Logout";

const mobileHeader = [
  {
    link: "/account/favorites",
    text: "Favorilerim",
    icon: Heart,
    private: true,
  },
  {
    link: "/account/orders",
    text: "Siparişlerim",
    icon: Truck,
    private: true,
  },
  {
    link: "/account",
    text: "Hesabım",
    icon: Basket,
    private: true,
  },
  {
    link: "/account/cargo-tracking",
    text: "Sipariş Takip",
    icon: PathBold,
    private: false,
  },
  {
    link: "/login",
    text: "Giriş Yap",
    icon: Login,
    private: false,
  },
];

const MobileMenu = ({ items }: { items: MenuItem[] | undefined }) => {
  const { user } = useUser();
  const { refresh } = useRouter();
  const handleLogout = () => {
    logout();
    refresh();
  };

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
            href={"/iletisim"}
            className={clsx([
              "flex gap-2 items-center justify-center w-full px-2 py-4 border rounded-md border-primarlight text-primary",
            ])}
          >
            <Phone className="w-4 h-4" />
            <span className="text-xs">İletişim</span>
          </Link>
          <span
            onClick={handleLogout}
            className={clsx([
              "flex gap-2 items-center justify-center w-full px-2 py-4 border rounded-md border-primarlight text-primary",
              !user && "hidden",
            ])}
          >
            <Logout className="w-4 h-4" />
            <span className="text-xs">Çıkış Yap</span>
          </span>
        </>
      </div>
    </div>
  );
};

export default MobileMenu;
