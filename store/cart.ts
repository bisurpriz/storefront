import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  quantity: number;
};

interface CartState {
  count: number;
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeAllCart: () => void;
  removeItem: (id: string) => void;
}

const useCart = create(
  persist<CartState>(
    (set) => ({
      count: 0,
      cartItems: [],
      addToCart: (item) => {
        set((state) => {
          const foundIndex = state.cartItems.findIndex(
            (cartItem) => cartItem.id === item.id
          );
          if (foundIndex === -1) {
            return {
              cartItems: [
                ...state.cartItems,
                {
                  ...item,
                  quantity: item.quantity || 1,
                },
              ],
              count: state.count + 1,
            };
          }
          const newCartItems = [...state.cartItems];
          newCartItems[foundIndex] = {
            ...newCartItems[foundIndex],
            quantity: item.quantity,
          };

          const newCount = state.cartItems.reduce(
            (acc, curr) => acc + curr.quantity,
            0
          );
          return {
            cartItems: newCartItems,
            count: newCount,
          };
        });
      },
      removeAllCart: () => {
        set((state) => {
          return {
            cartItems: [],
            count: 0,
          };
        });
      },
      removeItem: (id) => {
        set((state) => {
          const newCartItems = state.cartItems.filter((item) => item.id !== id);
          const newCount = newCartItems.reduce(
            (acc, curr) => acc + curr.quantity,
            0
          );
          return {
            cartItems: newCartItems,
            count: newCount,
          };
        });
      },
    }),
    {
      name: "cart-storage",
    }
  )
);

export default useCart;
