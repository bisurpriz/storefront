"use client";
import Button from "@/components/Button";
import { useCallback } from "react";
import { ProductForCart } from "@/common/types/Cart/cart";

interface AddCartButtonProps extends ProductForCart {
  className?: string;
  loading?: boolean;
}

const AddCartButton = ({
  category,
  discount_price,
  id,
  image_url,
  name,
  price,
  product_customizable_areas,
  quantity,
  tenant,
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
