import Button from "@/components/Button";
import useCart from "@/store/cart";
import React from "react";
import { ProductItemProps } from "..";

const AddCartButton = ({ id, loading }: ProductItemProps) => {
  const { addToCart } = useCart();

  return (
    <Button
      size="small"
      loading={loading}
      onClick={() =>
        addToCart({
          id,
          quantity: 1,
        })
      }
    >
      Sepete Ekle
    </Button>
  );
};

export default AddCartButton;
