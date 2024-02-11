'use client';

import { useCart } from '@/contexts/CartContext';
import CartWrapper from './components/Cart/CartWrapper/index';

const Cart = () => {
  const { cartItems } = useCart();
  return (
    <div
      className="w-full relative"
      aria-label="Sepetim"
      aria-describedby="Sepetimdeki ürünlerin listesi"
    >
      <div className="col-span-1 md:col-span-2 flex flex-col gap-3">
        <CartWrapper initialCartItems={cartItems} />
      </div>
    </div>
  );
};

export default Cart;
