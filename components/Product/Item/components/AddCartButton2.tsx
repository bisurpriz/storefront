"use client";

import Button from "@/components/Button";
import { Suspense } from "react";
import { ProductForCart } from "@/common/types/Cart/cart";
import { setCartWithRedis } from "@/app/cart/actions";
import toast from "react-hot-toast";
import ToastAddCart from "@/components/ToastWrapper/ToastAddCart";

interface AddCartButton2Props {
  product: ProductForCart;
  loading?: boolean;
}

const AddCartButton2 = ({ product, loading }: AddCartButton2Props) => {
  const handleAddToCart = () =>
    setCartWithRedis(product).then(() => {
      toast.custom(
        (t) => <ToastAddCart t={t} message='Ürün sepete eklendi.' />,
        {
          position: "bottom-right",
          id: "add-cart-toast",
          duration: 500,
        }
      );
    });

  return (
    <Suspense fallback={<>Loading...</>}>
      <Button
        loading={loading}
        onClick={handleAddToCart}
        fullWidth
        color='primary'
        variant='outlined'
        className='justify-center rounded-b-lg text-base max-xs:p-2 max-xs:text-sm rounded-none border-l-transparent border-r-transparent border-b-transparent border-t-slate-200 mt-auto'
        label='Sepete Ekle'
      >
        Sepete Ekle
      </Button>
    </Suspense>
  );
};

export default AddCartButton2;
