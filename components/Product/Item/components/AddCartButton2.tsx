import Button from "@/components/Button";
import { Suspense } from "react";
import { ProductForCart } from "@/common/types/Cart/cart";
import { setCartWithRedis } from "@/app/cart/actions";

interface AddCartButton2Props {
  product: ProductForCart;
  loading?: boolean;
}

const AddCartButton2 = ({ product, loading }: AddCartButton2Props) => {
  const handleAddToCart = () => setCartWithRedis(product);

  return (
    <Suspense fallback={<>Loading...</>}>
      <Button
        loading={loading}
        onClick={handleAddToCart}
        fullWidth
        color="primary"
        variant="outlined"
        className="justify-center rounded-b-lg text-lg max-xs:p-2 max-xs:text-sm rounded-none border-l-transparent border-r-transparent border-b-transparent border-t-slate-200 mt-auto"
        label="Sepete Ekle"
      >
        Sepete Ekle
      </Button>
    </Suspense>
  );
};

export default AddCartButton2;
