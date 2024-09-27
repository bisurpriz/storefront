"use client";

import { FC, useEffect, useRef, useState, startTransition } from "react";
import TextField from "../TextField";
import clsx from "clsx";
import { searchProductsv1 } from "@/app/(feed)/actions";
import Image from "next/image";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import { useClickAway } from "@uidotdev/usehooks";
import { Link } from "@/components/Link";
import { goToProductDetail } from "@/utils/linkClickEvent";
import { useRouter, useSearchParams } from "next/navigation";
import RemoveSquare from "../Icons/RemoveSquare";
import SearchIcon from "../Icons/SearchBotttomMenu";
import { GetProductsWithFilteredPaginationQuery } from "@/graphql/queries/products/getProductsWithPagination.generated";
import { useProgress } from "react-transition-progress";
import SearchList from "./SearchList";

type Props = {
  className?: string;
};

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
  const startProgress = useProgress();
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
        searchProductsv1({}, {});
        return;
      }
      setIsLoading(true);
      const response = await searchProductsv1({ q: input });
      setProducts(
        response.hits.map(
          (hit) => hit.document
        ) as GetProductsWithFilteredPaginationQuery["product"]
      );
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const onChange = (e, value: string) => {
    // clearTimeout(debounceTimeout.current);
    setInputVal(value);
    handleSearchProducts(value);
    setIsOpen(true);
    // debounceTimeout.current = setTimeout(() => {
    //
    // }, 500);
  };

  const pushToSearch = () => {
    startTransition(() => {
      startProgress();
      setIsOpen(false);
      push(`/?search=${ref.current?.value}`);
    });
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
    startTransition(() => {
      startProgress();
      setInputVal("");
      setProducts([]);
      ref.current.value = "";
      onChange(null, "");
      push("/");
      setIsOpen(false);
    });
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
        id="header-search"
        placeholder="Çiçek, hediye, süprizler..."
        ref={ref}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        fullWidth
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
      <SearchList
        isLoading={isLoading}
        isOpen={isOpen}
        modalRef={modalRef}
        products={products}
        setIsOpen={setIsOpen}
      />
    </div>
  );
};

export default Search;
