"use client";

import { Link } from "@/components/Link";
import { useCart } from "@/contexts/CartContext";
import { useEffect, useState } from "react";

import { useSearchProduct } from "@/contexts/SearchContext";
import clsx from "clsx";
import { Grid2X2, Home, Search, ShoppingCart, User } from "lucide-react";
import { usePathname } from "next/navigation";

const MenuItem = ({
  item,
  selected,
  onSelect,
  hasBadge,
}: {
  item: (typeof mobileBottomMenu)[0];
  selected: boolean;
  onSelect: () => void;
  hasBadge?: {
    badgeShow: boolean;
    badgeText: string | number;
  };
}) => {
  const Component = item.href ? Link : "button";

  return (
    <Component
      href={item.href}
      className={clsx(
        "flex touch-auto flex-col items-center justify-center rounded-md p-2 text-gray-600",
        {
          "bg-secondary text-white outline-none": selected,
        },
      )}
      onClick={onSelect}
    >
      {hasBadge?.badgeShow ? (
        // üzerinde item sayısı göster
        <div className="relative">
          <span className="flex-1 text-2xl">{item.icon}</span>
          <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -right-2 -top-2">
            {hasBadge.badgeText}
          </span>
        </div>
      ) : (
        <span className="flex-1 text-2xl">{item.icon}</span>
      )}

      <span className="inline-block text-xs font-medium max-xs:hidden">
        {item.name}
      </span>
    </Component>
  );
};

const MobileBottomNav = () => {
  const {
    cartState: { count },
  } = useCart();
  const pathname = usePathname();
  const { setIsOpen } = useSearchProduct();

  const getSelectedMenuItem = () => {
    const splittedPathname = pathname.split("/");

    const index = mobileBottomMenu.findIndex(
      (item) => item.href === `/${splittedPathname[1]}`,
    );
    return index === -1 ? 0 : index;
  };

  const [selected, setSelected] = useState<number>(getSelectedMenuItem());

  useEffect(() => {
    setSelected(getSelectedMenuItem());
  }, [pathname]);

  const handleSelect = (index: number) => {
    setSelected(index);

    if (index === 2) setIsOpen(true);
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-10 hidden bg-white border-t border-gray-200 max-md:block"
      id="mobile-bottom-nav"
    >
      <div className="grid grid-cols-5 gap-4 p-2">
        {mobileBottomMenu.map((item, index) => {
          return item.href === "/cart" ? (
            <MenuItem
              key={item.name}
              item={item}
              selected={selected === index}
              onSelect={() => handleSelect(index)}
              hasBadge={{
                badgeShow: count > 0,
                badgeText: count,
              }}
            />
          ) : (
            <MenuItem
              key={item.name}
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
    icon: <Home />,
  },
  {
    name: "Kategoriler",
    href: "/categories",
    icon: <Grid2X2 />,
  },
  {
    name: "Arama",
    icon: <Search />,
    href: "/arama",
  },
  {
    name: "Sepet",
    href: "/cart",
    icon: <ShoppingCart />,
  },
  {
    name: "Profil",
    href: "/account",
    icon: <User />,
  },
];
