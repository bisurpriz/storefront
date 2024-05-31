"use client";

import clsx from "clsx";
import React from "react";
import { FcShipped } from "react-icons/fc";
import SelectorAutoComplete from "./SelectorAutoComplete";
import { debounce } from "@/utils/debounce";

const QuarterSelector = () => {
  const debounced = debounce((e, value) => {
    console.log(value, "debounced");
  }, 500);

  return (
    <div className="col-span-8 max-xl:col-span-full">
      <label
        className={clsx(
          "p-4 rounded-xl border border-pink-100 bg-pink-100 text-pink-500 cursor-pointer font-mono",
          "grid grid-cols-4 gap-6 h-full self-center"
        )}
      >
        <div className={clsx("col-span-1 flex items-center max-md:hidden")}>
          <div className="flex items-center justify-center gap-4">
            <FcShipped
              className="flex-auto basis-full max-xl:hidden"
              size={60}
            />
            <span className={clsx("text-sm font-semibold text-x-pink-500")}>
              Sizin için en uygun ürünleri listelemek için lokasyonunuzu
              belirtin
            </span>
          </div>
        </div>
        <div className={clsx("col-span-3 max-md:col-span-full")}>
          <SelectorAutoComplete
            options={Array.from({ length: 4 }, (_, i) => ({
              value: i + 1,
              label: `202${i + 1} Q${i + 1}`,
            }))}
            componentName="QuarterSelector"
            autoComplete={true}
            selectOnFocus={true}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            onInputChange={(e, value) => {
              debounced(e, value);
            }}
          />
        </div>
      </label>
    </div>
  );
};

export default QuarterSelector;
