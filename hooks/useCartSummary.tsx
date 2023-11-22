import { ProductForCart } from "@/app/cart/types/cart";
import { useEffect, useState } from "react";

export type CartSummary = {
  totalQuantity: number;
  totalPrice: number;
  items: ProductForCart[];
  discount: number;
  couponApplied: boolean;
};

const useCartSummary = (cartItems: ProductForCart[] = []) => {
  const [cartSummary, setCartSummary] = useState<CartSummary>({
    totalQuantity: 0,
    totalPrice: 0,
    items: [],
    discount: 0,
    couponApplied: false,
  });

  useEffect(() => {
    // Her sepet öğesi üzerinde dönerek toplam miktarı, fiyatı ve öğeleri güncelle
    const calculateSummary = () => {
      let quantity = 0;
      let price = 0;

      const updatedItems = cartItems?.map((item) => {
        quantity += item.quantity;
        price += item.price * item.quantity;
        return { ...item };
      });

      // İndirim ve kupon uygulamalarını hesapla
      const discountedPrice = cartSummary.couponApplied
        ? price - cartSummary.discount
        : price;

      setCartSummary({
        totalQuantity: quantity,
        totalPrice: discountedPrice,
        items: updatedItems,
        discount: cartSummary.discount,
        couponApplied: cartSummary.couponApplied,
      });
    };

    calculateSummary();
  }, [cartItems, cartSummary.couponApplied, cartSummary.discount]);

  const applyCoupon = (discountAmount: number) => {
    setCartSummary((prevSummary) => ({
      ...prevSummary,
      discount: discountAmount,
      couponApplied: true,
    }));
  };

  const removeCoupon = () => {
    setCartSummary((prevSummary) => ({
      ...prevSummary,
      discount: 0,
      couponApplied: false,
    }));
  };

  return {
    cartSummary,
    applyCoupon,
    removeCoupon,
  };
};

export default useCartSummary;
