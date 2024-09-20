"use client";

import clsx from "clsx";
import { Link } from "@/components/Link";
import { usePathname } from "next/navigation";
import { accountNavigationItems } from "../../constants";
import { useEffect } from "react";
import useResponsive from "@/hooks/useResponsive";

const AccountNavigation = () => {
  const pathname = usePathname();
  const { isTablet } = useResponsive();

  useEffect(() => {
    if (isTablet) {
      const activeItem = document.querySelector(
        `a[href="${pathname}"]`
      ) as HTMLAnchorElement;

      if (activeItem) {
        activeItem.scrollIntoView({
          inline: "center",
          block: "center",
          behavior: "smooth",
        });
      }
    }
  }, [pathname, isTablet]);

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
              "bg-secondary text-white": pathname === item.link,
              "hover:bg-gray-100": pathname !== item.link,
            }
          )}
          as={item.link}
          href={item.link}
          aria-current={pathname === item.link ? "page" : undefined}
          aria-label={item.title}
        >
          <item.icon className="text-2xl" />
          <span>{item.title}</span>
        </Link>
      ))}
    </nav>
  );
};

export default AccountNavigation;
