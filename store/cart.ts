import toast, { ToastType } from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SpecialInstructions = {
  [key: string]: number | string | File | FileList | null;
};

export type CartItem = {
  id: number;
  quantity: number;
  specialInstructions?: SpecialInstructions[];
};

interface CartState {
  count: number;
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeAllCart: () => void;
  removeItem: (id: number) => void;
  updateItem: (data: {
    id: number;
    quantity?: number;
    specialInstructions?: SpecialInstructions[];
  }) => void;
}

const notify = (message: string, type: ToastType = "success") => {
  toast[type](message, {
    duration: 2000,
    position: "bottom-right",
  });
};

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
            notify("Ürün sepete eklendi.");
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
          const specialInstructions =
            newCartItems[foundIndex].specialInstructions;
          const newSpecialInstructions =
            specialInstructions?.length > item.quantity
              ? specialInstructions.slice(0, item.quantity)
              : specialInstructions;
          newCartItems[foundIndex] = {
            ...newCartItems[foundIndex],
            quantity: item.quantity,
            specialInstructions: newSpecialInstructions ?? [],
          };

          const newCount = state.cartItems.reduce(
            (acc, curr) => acc + curr.quantity,
            0
          );

          notify("Ürün sepete eklendi.");
          return {
            cartItems: newCartItems,
            count: newCount,
          };
        });
      },
      removeAllCart: () => {
        set((state) => {
          notify("Sepet temizlendi.");
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
          notify("Ürün sepetten çıkarıldı.");
          return {
            cartItems: newCartItems,
            count: newCount,
          };
        });
      },
      updateItem: ({ id, quantity, specialInstructions }) => {
        set((state) => {
          const foundIndex = state.cartItems.findIndex(
            (cartItem) => cartItem.id === id
          );
          if (foundIndex === -1) {
            return state;
          }

          if (quantity && quantity < state.cartItems[foundIndex].quantity) {
            const newSpecialInstructions = state.cartItems[
              foundIndex
            ].specialInstructions?.slice(0, quantity);

            return {
              cartItems: [
                ...state.cartItems.slice(0, foundIndex),
                {
                  ...state.cartItems[foundIndex],
                  quantity,
                  specialInstructions: newSpecialInstructions ?? [],
                },
                ...state.cartItems.slice(foundIndex + 1),
              ],
              count: state.count - 1,
            };
          }

          const newCartItems = [...state.cartItems];
          if (
            quantity &&
            !(quantity === state.cartItems[foundIndex].quantity)
          ) {
            newCartItems[foundIndex] = {
              ...newCartItems[foundIndex],
              quantity,
            };
          }
          if (specialInstructions?.length > 0) {
            newCartItems[foundIndex] = {
              ...newCartItems[foundIndex],
              specialInstructions,
            };
          }
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
