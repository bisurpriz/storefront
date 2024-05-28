"use client";

import { ProductForCart } from "@/common/types/Cart/cart";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import {
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_FROM_CART,
  UPDATE_CART,
} from "./constants";
import { cartReducer } from "./reducer";
import toast from "react-hot-toast";
import { updateCart } from "@/app/cart/actions";
import useResponsive from "@/hooks/useResponsive";

interface CartContextType {
  addToCart: (item: ProductForCart) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
  updateCartItem: (item: ProductForCart) => void;
  cartState: CartState;
  loading: boolean;
}

export interface CartState {
  cartItems: ProductForCart[];
  count: number;
  cost: number;
}

type Type = "add" | "remove" | "clear" | "update";

export const CartContext = createContext<CartContextType>({
  cartState: {
    cartItems: [],
    cost: 0,
    count: 0,
  },
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  updateCartItem: () => {},
  loading: false,
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
  const [cartState, dispatch] = useReducer(cartReducer, {
    cartItems: cartDbItems,
    count: cartDbItems.reduce((acc, item) => acc + item.quantity, 0),
    cost: dbCost,
  } as CartState);
  const [loading, setLoading] = useState(false);

  const { isTablet } = useResponsive();

  // Get local storage data if cartDbItems is empty
  useEffect(() => {
    if (cartDbItems.length === 0) {
      const cartItems = localStorage.getItem("cart");
      const count = localStorage.getItem("count");
      const cost = localStorage.getItem("cost");

      if (cartItems && count && cost) {
        dispatch({
          type: "ADD_TO_CART",
          payload: {
            cartItems: JSON.parse(cartItems),
            count: JSON.parse(count),
            cost: JSON.parse(cost),
          },
        });
      }
    }
  }, [cartDbItems]);

  const handleChangeDb = async (cartItems: ProductForCart[], type?: Type) => {
    setLoading(true);
    const response = await toast.promise(
      updateCart(cartItems),
      messages(type),
      {
        position: isTablet ? "top-center" : "bottom-right",
      }
    );
    setLoading(false);

    return response;
  };

  const addToCart = async (item: ProductForCart) => {
    const cartItems = [...cartState.cartItems];
    const hasItem = cartItems.findIndex((_item) => _item.id === item.id);

    if (hasItem === -1) {
      cartItems.push(item);
      handleChangeDb(cartItems, "add").then(({ costData, error }) => {
        if (error) return;

        dispatch({
          type: ADD_TO_CART,
          payload: {
            cartItems,
            count: cartItems.reduce((acc, item) => acc + item.quantity, 0),
            cost: costData,
          },
        });
      });
    } else {
      cartItems[hasItem].quantity = item.quantity;
      handleChangeDb(cartItems, "update").then(({ costData, error }) => {
        if (error) return;
        return {
          ...cartState,
          cartItems,
          cost: costData,
          count: cartItems.reduce((acc, item) => acc + item.quantity, 0),
        };
      });
    }
  };

  const removeFromCart = async (itemId: number | string) => {
    const cartItems = [...cartState.cartItems];
    const index = cartItems.findIndex((item) => item.id === itemId);
    if (index === -1) return cartState;
    cartItems.splice(index, 1);
    handleChangeDb(cartItems, "remove").then(({ costData, error }) => {
      if (error) return;

      dispatch({
        type: REMOVE_FROM_CART,
        payload: {
          cartItems,
          count: cartItems.reduce((acc, item) => acc + item.quantity, 0),
          cost: costData,
        },
      });
    });
  };

  const clearCart = async () => {
    handleChangeDb([], "clear").then(({ costData, error }) => {
      if (error) return;

      dispatch({
        type: CLEAR_CART,
        payload: {
          cartItems: [],
          count: 0,
          cost: costData,
        },
      });
    });
  };

  const updateCartItem = async (item: ProductForCart) => {
    const cartItems = [...cartState.cartItems];
    const index = cartItems.findIndex(
      (item) => item.id === (item as ProductForCart).id
    );
    if (index === -1) return cartState;
    cartItems[index] = item as ProductForCart;

    handleChangeDb(cartItems, "update").then(({ costData, error }) => {
      if (error) return;

      dispatch({
        type: UPDATE_CART,
        payload: {
          cartItems,
          count: cartItems.reduce((acc, item) => acc + item.quantity, 0),
          cost: costData,
        },
      });
    });
  };

  const memoizedValue = useMemo(
    () => ({
      cartState,
      addToCart,
      removeFromCart,
      clearCart,
      updateCartItem,
      loading,
    }),
    [
      cartState.cartItems,
      cartState.cost,
      cartState.count,
      addToCart,
      removeFromCart,
      clearCart,
      updateCartItem,
      loading,
    ]
  );

  return (
    <CartContext.Provider value={memoizedValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

const messages = (type: Type) => {
  switch (type) {
    case "add":
      return {
        loading: "Ürün sepete ekleniyor.",
        success: "Ürün sepete eklendi.",
        error: "Ürün sepete eklenirken bir hata oluştu.",
      };
    case "remove":
      return {
        loading: "Ürün sepetten çıkarılıyor.",
        success: "Ürün sepetten çıkarıldı.",
        error: "Ürün sepetten çıkarılırken bir hata oluştu.",
      };
    case "clear":
      return {
        loading: "Sepet temizleniyor.",
        success: "Sepet temizlendi.",
        error: "Sepet temizlenirken bir hata oluştu.",
      };
    case "update":
      return {
        loading: "Ürün güncelleniyor.",
        success: "Ürün güncellendi.",
        error: "Ürün güncellenirken bir hata oluştu.",
      };
    default:
      return {
        loading: "Sepet güncelleniyor.",
        success: "Sepet başarıyla güncellendi.",
        error: "Sepet güncellenirken bir hata oluştu.",
      };
  }
};
