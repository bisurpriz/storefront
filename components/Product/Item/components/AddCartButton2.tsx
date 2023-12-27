import Button from "@/components/Button";
import { useCallback } from "react";
import { ProductForCart } from "@/common/types/Cart/cart";
import { setCartWithRedis } from "@/app/cart/actions";

interface AddCartButton2Props {
  product: ProductForCart;
  loading?: boolean;
}

const AddCartButton2 = ({ product, loading }: AddCartButton2Props) => {
  const handleAddToCart = useCallback(async () => {
    setCartWithRedis(product);
    console.log("AddCartButton2Props", product);
  }, []);

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
