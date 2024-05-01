"use client";

import CustomizeCartItem from "./CustomizeCartItem";
import { ProductForCart } from "@/common/types/Cart/cart";
import { useCart } from "@/contexts/CartContext";

interface CustomizeGroupProps {
  index: number;
  quantity: ProductForCart["quantity"];
  product: ProductForCart;
}

const CustomizeGroup = ({ product, index, quantity }: CustomizeGroupProps) => {
  const { updateCartItem } = useCart();

  const handleInputsChange = (type, value) => {
    console.log(product, type, value);
    const newProduct = {
      ...product,
      product_customizable_areas: product.product_customizable_areas.map(
        (area) => {
          return {
            ...area,
            customizable_area:
              area.customizable_area.type === type
                ? {
                    ...area.customizable_area,
                    values: area.customizable_area?.values?.map((v) => {
                      return {
                        ...v,
                        [type]: [value],
                      };
                    }),
                  }
                : {
                    ...area.customizable_area,
                  },
          };
        }
      ),
    };
    console.log(newProduct);
    // updateCartItem(newProduct);
  };

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
              onChange={handleInputsChange}
              maxCharacter={max_character}
            />
          );
        }
      )}
    </div>
  );
};

export default CustomizeGroup;
