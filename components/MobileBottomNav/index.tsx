"use client";

import { useCart } from "@/contexts/CartContext";
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
  selected,
  onSelect,
}: {
  item: (typeof mobileBottomMenu)[0];
  selected: boolean;
  onSelect: () => void;
}) => {
  return (
    <Link
      href={item.href}
      className={clsx(
        "flex flex-col items-center justify-center text-gray-600 rounded-md p-2 touch-auto",
        {
          "outline-none ring-2 ring-primary-light text-white bg-primary":
            selected,
        }
      )}
      onClick={onSelect}
    >
      <span className="text-2xl">{item.icon}</span>
      <span className="text-xs font-medium inline-block max-xs:hidden">
        {item.name}
      </span>
    </Link>
  );
};

const MobileBottomNav = () => {
  const { count } = useCart();
  const pathname = usePathname();

  const getSelectedMenuItem = () => {
    const splittedPathname = pathname.split("/");

    const index = mobileBottomMenu.findIndex(
      (item) => item.href === `/${splittedPathname[1]}`
    );
    return index === -1 ? 0 : index;
  };

  const [selected, setSelected] = useState<number>(getSelectedMenuItem());

  useEffect(() => {
    setSelected(getSelectedMenuItem());
  }, [pathname]);

  const handleSelect = (index: number) => {
    setSelected(index);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white z-50 border-t border-gray-200 sm:hidden">
      <div className="grid grid-cols-5 gap-4 p-2">
        {mobileBottomMenu.map((item, index) => {
          return item.href === "/cart" ? (
            <Badge badgeContent={count} key={index}>
              <MenuItem
                item={item}
                selected={selected === index}
                onSelect={() => handleSelect(index)}
              />
            </Badge>
          ) : (
            <MenuItem
              key={index}
              item={item}
              selected={selected === index}
              onSelect={() => handleSelect(index)}
            />
          );
        })}
      </div>
    </div>
  );
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
    href: "/account",
    icon: <RiUser3Line />,
  },
];
