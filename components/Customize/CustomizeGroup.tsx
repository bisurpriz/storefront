import React from "react";
import CustomizeCartItem from "./CustomizeCartItem";
import { ProductForCart } from "@/app/cart/types/cart";
import Button from "../Button";

interface CustomizeGroupProps {
  customize: ProductForCart["customize"];
  productId: ProductForCart["id"];
}

const CustomizeGroup = ({ customize, productId }: CustomizeGroupProps) => {
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  };

  return (
    <form
      className="flex flex-col gap-3 mt-3 w-full rounded-md"
      onSubmit={handleFormSubmit}
    >
      {customize?.map(({ count, area: { type } }, i) => (
        <CustomizeCartItem key={i} type={type} count={count} />
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
