import { ProductForOrder } from "@/common/types/Cart/cart";
import Button from "@/components/Button";
import { useCart } from "@/contexts/CartContext";

interface AddCartButton2Props {
  product: ProductForOrder;
  loading?: boolean;
}

const AddCartButton2 = ({ product, loading }: AddCartButton2Props) => {
  const { addToCart } = useCart();
  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Button
      loading={loading}
      onClick={handleAddToCart}
      fullWidth
      color="primary"
      variant="outlined"
      className="justify-center rounded-b-lg text-base max-xs:p-2 max-xs:text-sm rounded-none border-l-transparent border-r-transparent border-b-transparent border-t-slate-200 mt-auto"
      label="Sepete Ekle"
    >
      Sepete Ekle
    </Button>
  );
};

export default AddCartButton2;
