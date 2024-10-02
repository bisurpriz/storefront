import React, { FC, useEffect } from "react";
import { Link } from "../Link";
import Image from "next/image";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import { goToProductDetail } from "@/utils/linkClickEvent";
import useResponsive from "@/hooks/useResponsive";
import clsx from "clsx";
import TextField from "../TextField";
import { motion } from "framer-motion";
import AnimationExitProvider from "../AnimatePresence/AnimationExitProvider";

type Props = {
  products: any[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isLoading: boolean;
  onChange?: (e: any, value: string) => void;
  setInputVal?: (value: string) => void;
  inputVal?: string;
  setProducts: (products: any[]) => void;
};

const SearchList: FC<Props> = ({
  isLoading,
  isOpen,
  products,
  setIsOpen,
  onChange,
  inputVal,
  setInputVal,
  setProducts,
}) => {
  const { isTablet } = useResponsive();

  const likeBottomSheetStyle = () => {
    return isTablet
      ? clsx(
          "fixed",
          "bottom-0",
          "left-0",
          "right-0",
          "bg-white",
          "shadow-lg",
          "rounded-t-lg",
          "p-4",
          "pt-0",
          "z-[51]",
          "max-h-[70vh]",
          "overflow-y-auto"
        )
      : clsx(
          "absolute",
          "w-full",
          "bg-white",
          "border",
          "border-primary-300",
          "rounded-md",
          "shadow-md",
          "z-[51]",
          "overflow-y-auto",
          "max-h-80",
          "mt-1",
          "text-lg"
        );
  };

  useEffect(() => {
    if (isTablet) {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isTablet, isOpen]);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const animates = isTablet
    ? {
        initial: { y: "100%", height: 0 },
        animate: { y: "0%", height: "auto" },
        exit: {
          y: "100%",
          height: 0,
        },
        transition: { type: "tween" },
      }
    : {
        initial: { y: "10%" },
        animate: { y: "0%" },
        exit: { y: "10%" },
        transition: { duration: 0.2 },
      };

  return (
    <AnimationExitProvider show={isOpen}>
      <div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className={clsx("fixed top-0 left-0 right-0 bottom-0 z-[1]", {
            "bg-black bg-opacity-50": isTablet,
          })}
        />
        <motion.div className={likeBottomSheetStyle()} {...animates}>
          <div
            className={clsx(
              "text-lg",
              "font-semibold",
              "text-gray-500",
              "border-b",
              "py-2",
              "border-gray-200",
              "sticky",
              "top-0",
              "bg-white",
              "z-[52]",
              "p-4"
            )}
          >
            <TextField
              type="text"
              className=""
              id="search"
              placeholder="Ürün ara"
              onChange={onChange}
              fullWidth
              value={inputVal}
              ref={inputRef}
              autoComplete="off"
            />
          </div>

          {!isLoading ? (
            products.map((product) => (
              <motion.li
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="list-none"
              >
                <Link
                  prefetch
                  key={product.id}
                  href={goToProductDetail({
                    category: {
                      slug: product.product_categories[0]?.category?.slug,
                    },
                    id: product.id,
                    slug: product.slug,
                  })}
                  onClick={() => {
                    setIsOpen(false);
                    setInputVal("");
                    setProducts([]);
                  }}
                >
                  <div
                    key={product.id}
                    className="py-2 px-4 border-b hover:bg-gray-100 transition-colors no-scrollbar"
                  >
                    <div className="flex items-start">
                      {product?.image_url?.[0] ? (
                        <div className="w-20 h-20 min-w-[5rem] min-h-[5rem]">
                          <Image
                            src={getImageUrlFromPath(product.image_url[0])}
                            width={100}
                            height={100}
                            className="w-full h-full rounded-lg"
                            alt={product.name}
                          />
                        </div>
                      ) : null}
                      <div className="text-sm font-semibold text-gray-500 ml-3 truncate">
                        {product.name}
                      </div>
                      <div className="text-xs ml-auto text-primary font-semibold mt-auto">
                        {product.product_categories[0].category.name}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.li>
            ))
          ) : (
            <Skeleton />
          )}

          {products.length === 0 && !isLoading && (
            <div className="p-2 text-gray-500">Sonuç bulunamadı</div>
          )}
        </motion.div>
      </div>
    </AnimationExitProvider>
  );
};

export default SearchList;

const Skeleton = () => (
  <div role="status" className="animate-pulse">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex items-center justify-between gap-4 p-2">
        <div className="w-20 h-20 bg-gray-300 rounded-lg" />
        <div className="flex-1 self-start w-full">
          <div className="h-2.5 bg-gray-300 rounded-full w-2/3 mb-2.5"></div>
          <div className="w-1/3 h-2 bg-gray-200 rounded-full "></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full w-20 self-end" />
      </div>
    ))}
  </div>
);
