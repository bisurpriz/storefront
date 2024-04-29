"use client";

import { ProductForCart } from "@/common/types/Cart/cart";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import toast from "react-hot-toast";
import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART } from "./constants";
import { cartReducer } from "./reducer";
import { updateCart } from "@/app/cart/actions";

interface CartContextType {
  cartItems: ProductForCart[];
  addToCart: (item: ProductForCart) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
  updateCartItem: (item: ProductForCart) => void;
  count: number;
  cost: number;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  updateCartItem: () => {},
  count: 0,
  cost: 0,
});

export const CartProvider = ({
  children,
  cartDbItems,
  dbCost,
}: {
  children: ReactNode;
  cartDbItems: ProductForCart[];
  dbCost: number;
}) => {
  const [cartItems, dispatch] = useReducer(cartReducer, cartDbItems ?? []);
  const [count, setCount] = useState(
    cartItems.reduce((acc, item) => acc + item.quantity, 0)
  );
  const [cost, setCost] = useState(dbCost ?? 0);

  const handleChangeDb = async (cartItems: ProductForCart[]) => {
    const { costData } = await updateCart(cartItems);
    if (!!costData) setCost(costData);
    setCount(cartItems.reduce((acc, item) => acc + item.quantity, 0));
  };

  useEffect(() => {
    const cartItemsString = JSON.stringify(cartItems);
    const cartDbItemsString = JSON.stringify(cartDbItems);
    if (cartItemsString !== cartDbItemsString) {
      handleChangeDb(cartItems);
    }
  }, [cartItems, cartDbItems]);

  const addToCart = useCallback((item: ProductForCart) => {
    dispatch({ type: ADD_TO_CART, payload: item });
    toast.success("Ürün sepete eklendi", {
      icon: "🛒",
      id: item.id.toString(),
      ariaProps: {
        role: "status",
        "aria-live": "polite",
      },
      iconTheme: {
        primary: "#000",
        secondary: "#fff",
      },
      position: "bottom-right",
    });
  }, []);

  const removeFromCart = useCallback((itemId: number | string) => {
    dispatch({
      type: REMOVE_FROM_CART,
      payload: itemId,
    });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: CLEAR_CART });
  }, []);

  const updateCartItem = useCallback((item: ProductForCart) => {
    dispatch({
      type: "UPDATE_CART_ITEM",
      payload: item,
    });
  }, []);

  const memoizedValue = useMemo(() => {
    return {
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,
      updateCartItem,
      count,
      cost,
    };
  }, [cartItems, count]);

  return (
    <CartContext.Provider value={memoizedValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
