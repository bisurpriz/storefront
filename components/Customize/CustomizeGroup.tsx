"use client";
import React, { useMemo } from "react";
import CustomizeCartItem from "./CustomizeCartItem";
import { ProductForCart } from "@/app/cart/types/cart";
import Button from "../Button";
import useCart from "@/store/cart";
import { getBase64Image } from "@/utils/getBase64Image";

interface CustomizeGroupProps {
  customize: ProductForCart["customize"];
  productId: ProductForCart["id"];
  index: number;
  quantity: ProductForCart["quantity"];
}

const CustomizeGroup = ({
  customize,
  productId,
  index,
  quantity,
}: CustomizeGroupProps) => {
  const { updateItem, cartItems } = useCart();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const keys = Object.keys(data);
    // Image var mı kontrol et
    const hasImages = keys?.find((item) => item.includes("special_image"));
    const image = data[hasImages];

    // image file to base64
    if (image instanceof File) {
      const base64 = (await getBase64Image(image)) as string;

      if (base64) {
        data[hasImages] = base64;
      }

      const oldSpecialInstructions = cartItems.find(
        (item) => item.id === productId
      )?.specialInstructions;

      const newSpecialInstructions = oldSpecialInstructions?.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            ...data,
          };
        }
        return item;
      });

      updateItem({
        id: productId,
        specialInstructions: newSpecialInstructions,
      });
    }
  };

  const values = useMemo(() => {
    return cartItems.find((item) => item.id === productId)?.specialInstructions;
  }, [cartItems, productId, index]);

  return (
    <form
      className="flex flex-col gap-3 mt-3 w-full rounded-md"
      onSubmit={handleFormSubmit}
    >
      {customize?.map(({ count, area: { type } }, i) => {
        return (
          <CustomizeCartItem
            key={i}
            type={type}
            count={count}
            values={values?.[index]}
          />
        );
      })}
      <Button
        type="submit"
        className="mt-3 w-fit"
        size="small"
        variant="outlined"
      >
        Kaydet
      </Button>
    </form>
  );
};

export default CustomizeGroup;
