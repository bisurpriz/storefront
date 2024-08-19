"use client";

import HeaderTop from "./Top";
import HeaderMiddle from "./Middle";
import HeaderBottom from "./Bottom";
import { useCategory } from "@/contexts/CategoryContext";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { motion, scroll } from "framer-motion";
import AnimationExitProvider from "@/components/AnimatePresence/AnimationExitProvider";
import ReviewRating from "@/components/ReviewRating/ReviewRating";

const StickyHeader = () => {
  const { category } = useCategory();
  const [scrolled, setScrolled] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  if (typeof window !== "undefined") {
    useEffect(() => {
      setLoaded(true);
    }, []);
  }

  return (
    <AnimationExitProvider show={loaded}>
      <motion.div
        ref={ref}
        className={clsx(
          "fixed -z-10 opacity-0 w-full top-0 shadow-md border-b bg-white transition-transform duration-300",
          {
            "z-[500] opacity-100 top-0 left-0": scrolled,
          }
        )}
        initial={{ y: "-100%" }}
        animate={{ y: scrolled ? "0%" : "-100%" }}
        exit={{ y: "-100%" }}
        transition={{ duration: 0.3 }}
        onScroll={() => {
          if (ref.current) {
            setScrolled(ref.current.scrollTop > 0);
          }
        }}
      >
        <>
          <HeaderTop />
          <HeaderMiddle />
          <HeaderBottom categories={category} />
        </>
      </motion.div>
    </AnimationExitProvider>
  );
};

export default StickyHeader;
