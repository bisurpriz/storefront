import Button from "@/components/Button";
import useCart from "@/store/cart";
import React from "react";
import { ProductItemProps } from "..";

const AddCartButton = ({ id, loading }: ProductItemProps) => {
  const { addToCart } = useCart();

  return (
    <Button
      loading={loading}
      fullWidth
      size="small"
      color="secondary"
      variant="outlined"
      rounded
      className="justify-center text-lg rounded-3xl max-xs:p-2 max-xs:text-sm"
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
