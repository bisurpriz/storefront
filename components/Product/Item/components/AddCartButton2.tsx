import Button from "@/components/Button";
import useCart from "@/store/cart";
import { useCallback } from "react";
import { ProductItemProps } from "..";
import { setRedisProduct } from "@/app/cart/actions";

interface AddCartButton2Props extends ProductItemProps {
  className?: string;
}

const AddCartButton2 = ({
  id,
  loading,
  product_customizable_areas,
  tenant_id,
  className,
}: AddCartButton2Props) => {
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
  }, [id, addToCart, cartItems, product_customizable_areas]);

  return (
    <Button
      loading={loading}
      onClick={handleAddToCart}
      fullWidth
      color="primary"
      variant="outlined"
      className="justify-center rounded-b-lg text-lg max-xs:p-2 max-xs:text-sm rounded-none border-l-transparent border-r-transparent border-b-transparent border-t-slate-200"
      label="Sepete Ekle"
    >
      Sepete Ekle
    </Button>
  );
};

export default AddCartButton2;
