"use client";

import { FC, useEffect, useRef, useState } from "react";
import TextField from "../TextField";
import clsx from "clsx";
import { searchProducts } from "@/app/(feed)/actions";
import { GetProductsWithFilteredPaginationQuery } from "@/graphql/generated";
import Image from "next/image";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import { useClickAway } from "@uidotdev/usehooks";
import Link from "next/link";
import { goToProductDetail } from "@/utils/linkClickEvent";
import { useRouter, useSearchParams } from "next/navigation";
import RemoveSquare from "../Icons/RemoveSquare";
import SearchIcon from "../Icons/Search";

type Props = {
  className?: string;
};

const Skeleton = () => (
  <div
    role="status"
    className="max-w-md p-4 space-y-4 border divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6"
  >
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex items-center justify-between pt-3">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
      </div>
    ))}
    <span className="sr-only">Yükleniyor...</span>
  </div>
);

const Search: FC<Props> = ({ className }) => {
  const [products, setProducts] = useState<
    GetProductsWithFilteredPaginationQuery["product"]
  >([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();
  const [inputVal, setInputVal] = useState("");

  const modalRef = useClickAway<HTMLInputElement>(() => {
    setIsOpen(false);
  });

  const ref = useRef<HTMLInputElement>(null);

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null!);
  const searchParams = useSearchParams();

  useEffect(() => {
    const search = searchParams.get("search");
    if (search) {
      ref.current.value = search;
      setInputVal(search);
    }
  }, [searchParams]);

  const handleSearchProducts = async (input: string) => {
    try {
      if (!input) {
        setProducts([]);
        searchProducts({}, {});
        return;
      }
      setIsLoading(true);
      const response = await searchProducts({}, { search: input });
      setProducts(response.products);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const onChange = (e, value: string) => {
    clearTimeout(debounceTimeout.current);
    setInputVal(value);
    debounceTimeout.current = setTimeout(() => {
      handleSearchProducts(value);
    }, 500);
  };

  const pushToSearch = () => {
    setIsOpen(false);
    push(`/?search=${ref.current?.value}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      pushToSearch();
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(debounceTimeout.current);
    };
  }, []);

  const handleClear = () => {
    setInputVal("");
    setProducts([]);
    ref.current.value = "";
    onChange(null, "");
    push("/?search=");
  };

  return (
    <div
      className={clsx("relative max-w-xl w-full mx-auto", {
        [className]: className,
      })}
    >
      <TextField
        type="text"
        className=""
        placeholder="Çiçek, hediye, süprizler..."
        ref={ref}
        onChange={onChange}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
      />

      <div
        className={clsx(
          "absolute right-0 top-0",
          "h-full flex items-center justify-center gap-3",
          "transition-all duration-300 group"
        )}
      >
        {inputVal && (
          <button
            className={clsx(
              "text-primary ",
              "flex items-center justify-center outline-none",
              "transition-all duration-300 group"
            )}
            onClick={handleClear}
          >
            <RemoveSquare className="text-2xl" />
          </button>
        )}
        <button
          className={clsx(
            "h-full bg-primary text-white rounded-r-lg px-6",
            "flex items-center justify-center outline-none",
            "hover:bg-primary-light  focus:ring-2 focus:ring-primary-light focus:ring-opacity-50",
            "transition-all duration-300 group"
          )}
          onClick={pushToSearch}
          name="search"
        >
          <SearchIcon className="group-hover:animate-bounce text-2xl" />
        </button>
      </div>

      {isOpen && (
        <div
          ref={modalRef}
          className="absolute z-10 w-full bg-white shadow-lg rounded-lg mt-2 max-h-80 overflow-y-auto"
        >
          {products.map((product) => (
            <Link
              prefetch
              key={product.id}
              href={goToProductDetail({
                category: {
                  slug: product.category.slug,
                },
                id: product.id,
                slug: product.slug,
              })}
              onClick={() => setIsOpen(false)}
            >
              <div key={product.id} className="p-2 border-b">
                <div className="flex items-center">
                  <div className="flex items-center gap-2">
                    {product?.image_url?.[0] ? (
                      <Image
                        src={getImageUrlFromPath(product.image_url[0])}
                        width={60}
                        height={60}
                        alt={product.name}
                        style={{ minWidth: 60 }}
                      />
                    ) : null}
                  </div>
                  <div className="text-sm text-gray-500 ml-3">
                    {product.name}
                  </div>
                  <div className="text-xs mt-auto ml-auto text-primary font-semibold">
                    {product.category.name}
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {isLoading && <Skeleton />}

          {products.length === 0 && !isLoading && (
            <div className="p-2 text-gray-500">Sonuç bulunamadı</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
