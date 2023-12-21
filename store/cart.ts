import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SpecialInstructions = {
  [key: string]: number | string | File | FileList | null;
};

export type CartItem = {
  id: number;
  quantity: number;
  specialInstructions?: SpecialInstructions[];
  tenant_id: number | string;
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
  resetCartStorage: () => void;
}

const useCart = create(
  persist<CartState>(
    (set) => ({
      count: 0,
      cartItems: [],
      addToCart: (item) => {
        set((state) => {
          // If item already exists in cart, update quantity
          const itemExists = state.cartItems.find((i) => i.id === item.id);

          if (itemExists) {
            const count = state.count - itemExists.quantity + item.quantity;
            itemExists.quantity = item.quantity;
            return {
              cartItems: [...state.cartItems],
              count,
            };
          }

          return {
            cartItems: [...state.cartItems, item],
            count: state.count + item.quantity,
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
          const itemExists = state.cartItems.find((i) => i.id === id);
          if (itemExists) {
            return {
              cartItems: state.cartItems.filter((i) => i.id !== id),
              count: state.count - itemExists.quantity,
            };
          }
          return {
            cartItems: [...state.cartItems],
            count: state.count,
          };
        });
      },
      updateItem: ({ id, quantity, specialInstructions }) => {
        set((state) => {
          const itemExists = state.cartItems.find((i) => i.id === id);
          if (itemExists) {
            if (quantity && quantity < itemExists.quantity) {
              itemExists.specialInstructions =
                itemExists.specialInstructions?.slice(0, quantity);
            }
            return {
              cartItems: state.cartItems.map((item) => {
                if (item.id === id) {
                  return {
                    ...item,
                    quantity: quantity || item.quantity,
                    specialInstructions:
                      specialInstructions || item.specialInstructions,
                  };
                }
                return item;
              }),
              count: state.count - itemExists.quantity + quantity,
            };
          }
        });
      },
      resetCartStorage: () => {
        set(() => {
          localStorage.removeItem("cart-storage");
          return {
            cartItems: [],
            count: 0,
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
