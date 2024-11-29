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
        `a[href="${pathname}"]`,
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
        "sticky inset-y-5 left-0 top-0 flex flex-col gap-2",
        "max-md:flex-row max-md:items-start max-md:justify-start max-md:gap-4",
        "no-scrollbar max-md:overflow-x-auto max-md:text-sm",
        "snap-x snap-mandatory",
      )}
      aria-label="Account Navigation"
      role="navigation"
    >
      {accountNavigationItems.map((item, index) => (
        <Link
          key={index}
          className={clsx(
            "flex snap-start items-center gap-2 rounded-md p-2",
            "max-md:flex-col",
            {
              "bg-secondary text-white": pathname === item.link,
              "hover:bg-gray-100": pathname !== item.link,
            },
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
