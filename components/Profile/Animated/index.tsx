"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useAnimate, stagger, motion } from "framer-motion";
import { profileItems } from "../contants";
import { MdKeyboardArrowDown } from "react-icons/md";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useClickAway } from "@uidotdev/usehooks";
import Link from "next/link";

const staggerMenuItems = stagger(0.1, { startDelay: 0.15 });

function useMenuAnimation(isOpen: boolean) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(".arrow", { rotate: isOpen ? 180 : 0 }, { duration: 0.2 });

    animate(
      "ul",
      {
        clipPath: isOpen
          ? "inset(0% 0% 0% 0% round 10px)"
          : "inset(10% 50% 90% 50% round 10px)",
      },
      {
        type: "spring",
        bounce: 0,
        duration: 0.5,
      }
    );

    animate(
      "li",
      isOpen
        ? { opacity: 1, scale: 1, filter: "blur(0px)" }
        : { opacity: 0, scale: 0.3, filter: "blur(20px)" },
      {
        duration: 0.2,
        delay: isOpen ? staggerMenuItems : 0,
      }
    );
  }, [isOpen]);

  return scope;
}

const AnimatedProfileHeader = () => {
  const { user, isLoading } = useUser();

  const [isOpen, setIsOpen] = useState(false);
  const scope = useMenuAnimation(isOpen);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const ref = useClickAway<HTMLUListElement>(() => {
    setIsOpen(false);
  });

  return (
    <nav className="menu relative" ref={scope}>
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        {user?.nickname}
        <div className="arrow" style={{ transformOrigin: "50% 55%" }}>
          <MdKeyboardArrowDown />
        </div>
      </motion.button>
      <ul
        className={clsx([
          "absolute top-full right-0 z-10 w-48 mt-2 overflow-hidden text-sm bg-white rounded shadow-lg",
          isOpen ? "block" : "hidden",
        ])}
        ref={ref}
      >
        {profileItems.map((item, index) => (
          <motion.li
            key={index}
            className={clsx([
              "p-4 text-sm text-slate-500 hover:bg-slate-100 cursor-pointer",
              item.path === pathname && "bg-slate-100",
            ])}
          >
            <Link href={item.path}>{item.label}</Link>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
};

export default AnimatedProfileHeader;
