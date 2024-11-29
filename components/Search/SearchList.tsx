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
          "overflow-y-auto",
        )
      : clsx(
          "absolute",
          "w-full",
          "bg-white",
          "border",
          "border-primary",
          "rounded-md",
          "shadow-md",
          "z-[51]",
          "overflow-y-auto",
          "max-h-80",
          "mt-1",
          "text-lg",
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
          className={clsx("fixed bottom-0 left-0 right-0 top-0 z-[1]", {
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
              "p-4",
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
                    className="no-scrollbar border-b px-4 py-2 transition-colors hover:bg-gray-100"
                  >
                    <div className="flex items-start">
                      {product?.image_url?.[0] ? (
                        <div className="h-20 min-h-[5rem] w-20 min-w-[5rem]">
                          <Image
                            src={getImageUrlFromPath(product.image_url[0])}
                            width={100}
                            height={100}
                            className="h-full w-full rounded-lg"
                            alt={product.name}
                          />
                        </div>
                      ) : null}
                      <div className="ml-3 truncate text-sm font-semibold text-gray-500">
                        {product.name}
                      </div>
                      <div className="ml-auto mt-auto text-xs font-semibold text-primary">
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
        <div className="h-20 w-20 rounded-lg bg-gray-300" />
        <div className="w-full flex-1 self-start">
          <div className="mb-2.5 h-2.5 w-2/3 rounded-full bg-gray-300"></div>
          <div className="h-2 w-1/3 rounded-full bg-gray-200"></div>
        </div>
        <div className="h-2.5 w-20 self-end rounded-full bg-gray-300" />
      </div>
    ))}
  </div>
);
