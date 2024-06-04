"use client";

import React, { ReactNode, FC, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { usePathname } from "next/navigation";

interface StickyHeaderProps {
  children: ReactNode;
  secondChildren?: ReactNode;
}

const StickyHeader: FC<StickyHeaderProps> = ({ children, secondChildren }) => {
  const pathname = usePathname();

  const { scrollY } = useScroll();
  const [isSticky, setIsSticky] = useState(false);

  const transform = useTransform(scrollY, [0, 100], [0, -100]);

  transform.on("change", (value) => {
    if (value < -50) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  });

  if (pathname !== "/")
    return (
      <div className="md:container mx-auto z-10 leading-none flex flex-col items-center justify-start max-sm:flex-col-reverse">
        {children}
      </div>
    );

  return (
    <>
      {/* Küçük sticky header çıkacak */}
      <motion.header style={{ y: transform }}>
        <div className="md:container mx-auto z-10 leading-none flex flex-col items-center justify-start max-sm:flex-col-reverse">
          {children}
        </div>
      </motion.header>

      {/* Büyük sticky header çıkacak */}
      <AnimatePresence>
        {isSticky && (
          <motion.header
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="sticky top-0 z-10 bg-white"
          >
            <div className="md:container mx-auto z-10 leading-none flex flex-col items-center justify-start max-sm:flex-col-reverse">
              {secondChildren}
            </div>
          </motion.header>
        )}
      </AnimatePresence>
    </>
  );
};

export default StickyHeader;
