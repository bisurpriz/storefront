import Button from "@/components/Button";
import useCart from "@/store/cart";
import React from "react";
import { ProductItemProps } from "..";

const AddCartButton = ({ id, loading }: ProductItemProps) => {
  const { addToCart, cartItems } = useCart();

  return (
    <Button
      loading={loading}
      fullWidth
      size="small"
      color="secondary"
      variant="outlined"
      rounded
      className="justify-center text-lg rounded-3xl max-xs:p-2 max-xs:text-sm"
      onClick={() => {
        const prev = cartItems.find((item) => item.id === id);

        addToCart({
          id,
          quantity: prev ? prev.quantity + 1 : 1,
        });
      }}
    >
      Sepete Ekle
    </Button>
  );
};

export default AddCartButton;
