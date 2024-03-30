"use client";
import Button from "@/components/Button";
import { useCallback } from "react";
import { ProductForOrder } from "@/common/types/Cart/cart";

interface AddCartButtonProps extends ProductForOrder {
  className?: string;
  loading?: boolean;
}

const AddCartButton = ({
  id,
  product_customizable_areas,
  className,
  loading,
}: AddCartButtonProps) => {
  const handleAddToCart = useCallback(async () => {}, [
    id,
    product_customizable_areas,
  ]);

  return (
    <Button
      loading={loading}
      fullWidth
      size="small"
      color="secondary"
      variant="outlined"
      rounded
      className={
        className ??
        "justify-center text-lg rounded-3xl max-xs:p-2 max-xs:text-sm"
      }
      onClick={handleAddToCart}
    >
      Sepete Ekle
    </Button>
  );
};

export default AddCartButton;
