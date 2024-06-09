"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineUnlock, AiOutlineUser } from "react-icons/ai";
import { BsTruck } from "react-icons/bs";
import { FiMessageSquare, FiStar } from "react-icons/fi";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { PiAddressBook } from "react-icons/pi";
import { RiCoupon2Line } from "react-icons/ri";

const accountNavigationItems = [
  {
    title: "Siparişlerim",
    icon: BsTruck,
    link: "/account/orders",
  },
  {
    title: "Kuponlarım",
    icon: RiCoupon2Line,
    link: "/account/coupons",
  },
  {
    title: "Favorilerim",
    icon: MdOutlineFavoriteBorder,
    link: "/account/favorites",
  },
  {
    title: "Değerlendirmelerim",
    icon: FiStar,
    link: "/account/reviews",
  },
  {
    title: "Bilgilerim",
    icon: AiOutlineUser,
    link: "/account",
  },
  {
    title: "Mesajlarım",
    icon: FiMessageSquare,
    link: "/account/messages",
  },
  {
    title: "Adreslerim",
    icon: PiAddressBook,
    link: "/account/addresses",
  },
  {
    title: "İzinlerim",
    icon: AiOutlineUnlock,
    link: "/account/permissions",
  },
];

const AccountNavigation = () => {
  const pathname = usePathname();

  return (
    <nav
      className={clsx(
        "flex flex-col gap-2 sticky top-0 left-0 inset-y-5",
        "max-md:flex-row max-md:justify-start max-md:items-start max-md:gap-4",
        "max-md:overflow-x-auto max-md:text-sm no-scrollbar",
        "snap-x snap-mandatory"
      )}
      aria-label="Account Navigation"
      role="navigation"
    >
      {accountNavigationItems.map((item, index) => (
        <Link
          key={index}
          className={clsx(
            "flex items-center gap-2 p-2 rounded-md  snap-start",
            "max-md:flex-col",
            {
              "bg-primary text-white": pathname === item.link,
              "hover:bg-gray-100": pathname !== item.link,
            }
          )}
          as={item.link}
          href={item.link}
          aria-current={pathname === item.link ? "page" : undefined}
          aria-label={item.title}
        >
          <item.icon size={24} />
          <span>{item.title}</span>
        </Link>
      ))}
    </nav>
  );
};

export default AccountNavigation;
