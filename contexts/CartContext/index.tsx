"use client";

import { CostData, ProductForCart } from "@/common/types/Cart/cart";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
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
import {
  getCartCost,
  getProductByIdForCart,
  updateCart,
} from "@/app/cart/actions";
import useResponsive from "@/hooks/useResponsive";
import { useProduct } from "../ProductContext";
import { isDate } from "date-fns";
import { DeliveryLocation } from "@/common/types/Order/order";

type AddToCart = ({
  id,
  type,
  quantity,
}: {
  id: number;
  type: "updateq" | "add";
  quantity?: number;
  deliveryDate?: string;
  deliveryTime?: string;
  deliveryLocation: DeliveryLocation;
}) => void;

interface CartContextType {
  addToCart: AddToCart;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
  updateCartItem: (item: ProductForCart) => void;
  cartState: CartState;
  loading: boolean;
  deliveryTime: DeliveryTime | null;
  setDeliveryTimeHandler: (deliveryTime: DeliveryTime) => void;
  clearDeliveryTime: () => void;
  isProductInCart: ProductForCart;
  applyCouponCode: (code: string) => Promise<void>;
  updateCartItemNote: (id: number, note: string) => void;
  hasCustomizableProduct: boolean;
  setHasCustomizableProduct: Dispatch<SetStateAction<boolean>>;
}

export interface CartState {
  cartItems: ProductForCart[];
  count: number;
  cost: CostData;
}

type Type = "add" | "remove" | "clear" | "update";

export type DeliveryTime = {
  day: Date | null;
  hour: string;
};

export const CartContext = createContext<CartContextType>({
  cartState: {
    cartItems: [],
    cost: {
      totalPrice: 0,
      isCouponApplied: false,
      couponMessage: "",
      discountAmount: 0,
    },
    count: 0,
  },
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  updateCartItem: () => {},
  loading: false,
  deliveryTime: null,
  setDeliveryTimeHandler: () => {},
  clearDeliveryTime: () => {},
  isProductInCart: null,
  applyCouponCode: async () => {},
  updateCartItemNote: () => {},
  hasCustomizableProduct: false,
  setHasCustomizableProduct: () => {},
});

export const CartProvider = ({
  children,
  cartDbItems,
  dbCost,
}: {
  children: ReactNode;
  cartDbItems: ProductForCart[];
  dbCost: CostData;
}) => {
  const [hasCustomizableProduct, setHasCustomizableProduct] = useState(false);
  const [cartState, dispatch] = useReducer(cartReducer, {
    cartItems: cartDbItems,
    count: cartDbItems.reduce((acc, item) => acc + item.quantity, 0),
    cost: dbCost,
  } as CartState);
  const [loading, setLoading] = useState(false);

  const [deliveryTime, setDeliveryTime] = useState<DeliveryTime>({
    day: null,
    hour: "",
  });

  const { selectedProduct } = useProduct();

  const { isTablet } = useResponsive();

  useEffect(() => {
    setHasCustomizableProduct(
      cartState.cartItems.some((item) =>
        item.product_customizable_areas.some((area) => area.count > 0)
      )
    );
  }, [cartState.cartItems]);

  useEffect(() => {
    if (cartDbItems.length === 0) {
      localStorage.removeItem("cart");
      localStorage.removeItem("count");
      localStorage.removeItem("cost");
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

  const updateCartItemNote = (id: number, note: string) => {
    const cartItems = [...cartState.cartItems];
    const index = cartItems.findIndex((item) => item.id === id);
    if (index === -1) return cartState;
    cartItems[index].card_note = note;
    dispatch({
      type: UPDATE_CART,
      payload: {
        cartItems,
        count: cartItems.reduce((acc, item) => acc + item.quantity, 0),
        cost: cartState.cost,
      },
    });
  };

  const addToCart: AddToCart = async ({
    id,
    type,
    quantity,
    deliveryLocation,
  }: {
    id: number;
    type: "updateq" | "add";
    quantity?: number;
    deliveryDate?: string;
    deliveryTime?: string;
    deliveryLocation: DeliveryLocation;
  }) => {
    const cartItems = [...cartState.cartItems];
    const hasItem = cartItems.findIndex((_item) => _item.id === id);

    if (hasItem === -1) {
      const item = await getProductByIdForCart(id);

      const _item = {
        ...item,
        deliveryDate: deliveryTime.day,
        deliveryTime: deliveryTime.hour,
        deliveryLocation: deliveryLocation,
      };

      cartItems.push(_item);
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
      clearDeliveryTime();
      return;
    } else {
      if (type === "updateq") {
        cartItems[hasItem].quantity = quantity;
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
        return;
      }

      if (type === "add") {
        cartItems[hasItem].quantity += 1;
        cartItems[hasItem].deliveryDate = deliveryTime.day;
        cartItems[hasItem].deliveryTime = deliveryTime.hour;
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
      }
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
    const index = cartItems.findIndex((t) => t.id === item.id);

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

  const applyCouponCode = async (code: string) => {
    const newCost = await getCartCost(cartState.cartItems, code);
    dispatch({
      type: UPDATE_CART,
      payload: {
        cartItems: cartState.cartItems,
        count: cartState.count,
        cost: newCost,
      },
    });
  };

  const isValidDeliveryTime = (deliveryTime: DeliveryTime) => {
    try {
      const { day, hour } = deliveryTime;
      if (isDate(day) && hour.length) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const setDeliveryTimeHandler = (deliveryTime: DeliveryTime) => {
    if (isValidDeliveryTime(deliveryTime)) {
      setDeliveryTime(deliveryTime);
    }
  };

  const clearDeliveryTime = () => {
    setDeliveryTime({ day: null, hour: "" });
  };

  const isProductInCart = useMemo(
    () => cartState.cartItems.find((item) => item.id === selectedProduct?.id),
    [cartState.cartItems, selectedProduct?.id]
  );

  useEffect(() => {
    if (Boolean(isProductInCart)) {
      setDeliveryTime({
        day: isProductInCart.deliveryDate,
        hour: isProductInCart.deliveryTime,
      });
    } else {
      clearDeliveryTime();
    }
  }, [isProductInCart]);

  const value = {
    cartState,
    addToCart,
    removeFromCart,
    clearCart,
    updateCartItem,
    loading,
    deliveryTime,
    setDeliveryTimeHandler,
    clearDeliveryTime,
    isProductInCart: isProductInCart,
    applyCouponCode,
    updateCartItemNote,
    hasCustomizableProduct,
    setHasCustomizableProduct,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
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
