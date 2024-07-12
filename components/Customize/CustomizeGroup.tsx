"use client";

import { CustomizableAreaType } from "@/common/enums/Order/product";
import CustomizeCartItem from "./CustomizeCartItem";
import useDebounce from "@/hooks/useDebounce";
import { GetUserOrdersQuery } from "@/graphql/queries/account/account.generated";

interface CustomizeGroupProps {
  index: number;
  product: GetUserOrdersQuery["order"][0]["tenant_orders"][0]["order_items"][0]["product"];
}

const CustomizeGroup = ({ product, index }: CustomizeGroupProps) => {
  const debouncedHandleInputsChange = useDebounce(() => {}, 500);
  return (
    <div className="flex flex-col gap-3 w-full">
      {product.product_customizable_areas?.map(
        ({ count, customizable_area: { type }, max_character }, i) => {
          return (
            <CustomizeCartItem
              key={i}
              type={type as CustomizableAreaType}
              count={count}
              onChange={debouncedHandleInputsChange}
              maxCharacter={max_character}
              keyIndex={index}
            />
          );
        }
      )}
    </div>
  );
};

export default CustomizeGroup;
