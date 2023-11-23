"use client";
import React from "react";
import CustomizeCartItem from "./CustomizeCartItem";
import { ProductForCart } from "@/app/cart/types/cart";
import Button from "../Button";
import useCart from "@/store/cart";

interface CustomizeGroupProps {
  customize: ProductForCart["customize"];
  productId: ProductForCart["id"];
}

const CustomizeGroup = ({ customize, productId }: CustomizeGroupProps) => {
  const { updateItem, cartItems } = useCart();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    updateItem({
      id: productId,
      specialInstructions: [data],
    });
  };

  const values = cartItems.find(
    (item) => item.id === productId
  )?.specialInstructions;

  return (
    <form
      className="flex flex-col gap-3 mt-3 w-full rounded-md"
      onSubmit={handleFormSubmit}
    >
      {customize?.map(({ count, area: { type } }, i) => (
        <CustomizeCartItem
          key={i}
          type={type}
          count={count}
          values={values?.[i]}
        />
      ))}
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
