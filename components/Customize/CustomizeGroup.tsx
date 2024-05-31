"use client";

import CustomizeCartItem from "./CustomizeCartItem";
import { ProductForCart } from "@/common/types/Cart/cart";
import { useCart } from "@/contexts/CartContext";
import useDebounce from "@/hooks/useDebounce";
import { useCallback } from "react";

interface CustomizeGroupProps {
  index: number;
  product: ProductForCart;
}

const CustomizeGroup = ({ product, index }: CustomizeGroupProps) => {
  const { updateCartItem } = useCart();

  const handleInputsChange = useCallback(
    (inputIndex, type, value) => {
      const newProduct = {
        ...product,
        product_customizable_areas: product.product_customizable_areas.map(
          (area) => {
            if (area.customizable_area.type === type) {
              return {
                ...area,
                customizable_area: {
                  ...area.customizable_area,
                  values: {
                    ...area.customizable_area.values,
                    [`${index}_${type}_${inputIndex}`]: value,
                  },
                },
              };
            }

            return area;
          }
        ),
      };

      updateCartItem(newProduct);
    },
    [product, updateCartItem, index]
  );

  const debouncedHandleInputsChange = useDebounce(handleInputsChange, 500);

  return (
    <div className="flex flex-col gap-3 w-full">
      {product.product_customizable_areas?.map(
        ({ count, customizable_area: { type, values }, max_character }, i) => {
          return (
            <CustomizeCartItem
              key={i}
              type={type}
              count={count}
              values={values}
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
