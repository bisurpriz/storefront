"use client";
import Button from "@/components/Button";
import useCart from "@/store/cart";
import { useCallback } from "react";
import { ProductItemProps } from "..";
import { setRedisProduct } from "@/app/cart/actions";

const AddCartButton = ({
  id,
  loading,
  product_customizable_areas,
  tenant_id,
}: ProductItemProps) => {
  const { addToCart, cartItems } = useCart.getState();

  const handleAddToCart = useCallback(async () => {
    const prev = cartItems.find((item) => item.id === id);
    const hasSpecialInstructions = product_customizable_areas?.length > 0;
    addToCart({
      id,
      quantity: prev ? prev.quantity + 1 : 1,
      specialInstructions: prev?.specialInstructions
        ? prev.specialInstructions
        : hasSpecialInstructions
        ? []
        : null,
      tenant_id,
    });

    const rest = await setRedisProduct({
      id,
      quantity: prev ? prev.quantity + 1 : 1,
      specialInstructions: prev?.specialInstructions
        ? prev.specialInstructions
        : hasSpecialInstructions
        ? []
        : null,
      tenant_id,
    });
    console.log(rest);
  }, [id, addToCart, cartItems, product_customizable_areas]);

  return (
    <Button
      loading={loading}
      fullWidth
      size="small"
      color="secondary"
      variant="outlined"
      rounded
      className="justify-center text-lg rounded-3xl max-xs:p-2 max-xs:text-sm"
      onClick={handleAddToCart}
    >
      Sepete Ekle
    </Button>
  );
};

export default AddCartButton;
