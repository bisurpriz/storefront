"use client";

import { Link } from "@/components/Link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { accountNavigationItems } from "../../constants";

interface AccountNavigationProps {
  isMobile: boolean;
}


const AccountNavigation = ({ isMobile }: AccountNavigationProps) => {
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLAnchorElement>(null);
  const [isPending, startTransition] = useTransition();
  const [activeLink, setActiveLink] = useState(pathname);

  useEffect(() => {
    startTransition(() => {
      setActiveLink(pathname);
    });
  }, [pathname]);

  useEffect(() => {
    if (isMobile && activeItemRef.current && navRef.current) {
      const container = navRef.current;
      const activeItem = activeItemRef.current;

      const scrollToCenter = () => {
        const containerWidth = container.offsetWidth;
        const itemWidth = activeItem.offsetWidth;
        const itemLeft = activeItem.offsetLeft;
        const centerPosition = itemLeft - (containerWidth / 2) + (itemWidth / 2);

        container.scrollTo({
          left: centerPosition,
          behavior: 'smooth'
        });
      };

      scrollToCenter();
    }
  }, [activeLink, isMobile]);

  return (
    <div className={clsx(
      "transition-all duration-200",
      isMobile
        ? "w-full py-1.5"
        : "w-64 sticky top-0 pt-1"
    )}>
      <nav
        ref={navRef}
        className={clsx(
          "flex w-full",
          isMobile && [
            "overflow-x-auto overflow-y-hidden flex-row",
            "no-scrollbar px-1"
          ],
          !isMobile && "flex-col"
        )}
        aria-label="Account Navigation"
      >
        {accountNavigationItems.map((item, index) => {
          const isActive = activeLink === item.link;
          return (
            <Link
              key={index}
              ref={isActive ? activeItemRef : null}
              className={clsx(
                "group flex items-center gap-3 rounded-lg",
                "transition-all duration-200",
                isMobile ? [
                  "min-w-fit whitespace-nowrap px-4 py-2.5",
                  "first:ml-1 last:mr-1",
                  "border-b border-transparent",
                  isActive && [
                    "border-b-2 border-primary",
                    "bg-primary/5"
                  ]
                ] : [
                  "w-full px-3 py-2.5 mb-0.5",
                  "relative overflow-hidden",
                  isActive && [
                    "bg-primary/5",
                    "before:absolute before:left-0 before:top-[10%] before:h-[80%] before:w-0.5",
                    "before:bg-primary before:rounded-r"
                  ],
                  "hover:bg-gray-50/80"
                ],
                isActive
                  ? "text-primary font-medium"
                  : "text-gray-600 hover:text-primary",
                isPending && "opacity-80"
              )}
              href={item.link}
              onClick={() => startTransition(() => setActiveLink(item.link))}
              aria-current={isActive ? "page" : undefined}
            >
              <item.icon
                className={clsx(
                  "transition-transform duration-200",
                  isActive ? "text-lg text-primary" : "text-base text-gray-400",
                  "group-hover:text-primary",
                  !isActive && "group-hover:scale-110"
                )}
              />
              <span className={clsx(
                "transition-all duration-200",
                isMobile ? "text-[13px]" : "text-[14px]",
                !isActive && "group-hover:translate-x-0.5"
              )}>
                {item.title}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default AccountNavigation;
