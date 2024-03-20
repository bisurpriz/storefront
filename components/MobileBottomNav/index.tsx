"use client";

import { useCart } from "@/contexts/CartContext";
import useResponsive from "@/hooks/useResponsive";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  RiHome2Line,
  RiSearch2Line,
  RiShoppingBagLine,
  RiUser3Line,
} from "react-icons/ri";
import { TbCategory } from "react-icons/tb";
import Badge from "../Badge";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const MenuItem = ({
  item,
  isSmallMobile,
  selected,
}: {
  item: (typeof mobileBottomMenu)[0];
  isSmallMobile: boolean;
  selected: boolean;
}) => {
  return (
    <Link
      href={item.href}
      className={clsx(
        "flex flex-col items-center justify-center text-gray-600 rounded-md px-4 py-2 touch-auto",
        {
          "text-primary-500": selected,
        }
      )}
    >
      <span className="text-2xl">{item.icon}</span>
      {!isSmallMobile && (
        <span className="text-xs font-medium">{item.name}</span>
      )}
    </Link>
  );
};

const MobileBottomNav = () => {
  const { isMobile, isSmallMobile } = useResponsive();
  const { count } = useCart();
  const pathname = usePathname();

  const getSelectedMenuItem = () => {
    const index = mobileBottomMenu.findIndex((item) => item.href === pathname);
    return index === -1 ? 0 : index;
  };

  const [selected, setSelected] = useState<number>(getSelectedMenuItem());

  useEffect(() => {
    setSelected(getSelectedMenuItem());
  }, [pathname]);

  return isMobile ? (
    <div className="fixed bottom-0 left-0 right-0 bg-white z-50 border-t border-gray-200">
      <div className="flex justify-between py-2 px-1">
        {mobileBottomMenu.map((item, index) => {
          return item.href === "/cart" ? (
            <Badge badgeContent={count}>
              <MenuItem
                item={item}
                isSmallMobile={isSmallMobile}
                selected={selected === index}
              />
            </Badge>
          ) : (
            <MenuItem
              item={item}
              isSmallMobile={isSmallMobile}
              selected={selected === index}
            />
          );
        })}
      </div>
    </div>
  ) : null;
};
export default MobileBottomNav;

const mobileBottomMenu = [
  {
    name: "Anasayfa",
    href: "/",
    icon: <RiHome2Line />,
  },
  {
    name: "Kategoriler",
    href: "/categories",
    icon: <TbCategory />,
  },
  {
    name: "Arama",
    href: "/search",
    icon: <RiSearch2Line />,
  },
  {
    name: "Sepet",
    href: "/cart",
    icon: <RiShoppingBagLine />,
  },
  {
    name: "Profil",
    href: "/profile",
    icon: <RiUser3Line />,
  },
];
