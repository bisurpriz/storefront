"use client";
import { useUser } from "@/contexts/AuthContext";
import clsx from "clsx";
import { Link } from "@/components/Link";
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
    <div className="flex h-full w-full flex-col items-start justify-start">
      <div
        className={clsx([
          "mb-2 grid w-full gap-2",
          !user ? "grid-cols-2" : "grid-cols-3",
        ])}
      >
        {mobileHeader.map((item) => (
          <Link
            key={item.text}
            href={item.link}
            className={clsx([
              "border-primarlight flex w-full flex-col items-center justify-center rounded-md border px-2 py-4 text-primary transition-colors duration-200 ease-in-out hover:text-white",
              !user && item.private && "hidden",
              user && !item.private && "hidden",
            ])}
            replace={item.link === "/login"}
          >
            <item.icon className="h-4 w-4" />
            <span className="text-xs">{item.text}</span>
          </Link>
        ))}
      </div>
      <div className="h-full w-full">
        <ul>
          {items?.map((item, index) => <MenuItem key={index} {...item} />)}
        </ul>
      </div>
      <div
        className={`grid w-full ${!user ? "grid-cols-1" : "grid-cols-2"} gap-4`}
      >
        <>
          <Link
            href={"/iletisim"}
            className={clsx([
              "border-primarlight flex w-full items-center justify-center gap-2 rounded-md border px-2 py-4 text-primary",
            ])}
          >
            <Phone className="h-4 w-4" />
            <span className="text-xs">İletişim</span>
          </Link>
          <span
            onClick={handleLogout}
            className={clsx([
              "border-primarlight flex w-full items-center justify-center gap-2 rounded-md border px-2 py-4 text-primary",
              !user && "hidden",
            ])}
          >
            <Logout className="h-4 w-4" />
            <span className="text-xs">Çıkış Yap</span>
          </span>
        </>
      </div>
    </div>
  );
};

export default MobileMenu;
