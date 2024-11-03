"use client";

import { CostData, ProductForCart } from "@/common/types/Cart/cart";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  ADD_TO_CART,
  CLEAR_CART,
  initialCartContextData,
  REMOVE_FROM_CART,
  UPDATE_CART,
} from "./constants";
import { cartReducer } from "./reducer";
import {
  getCartCost,
  getProductByIdForCart,
  updateCart,
} from "@/app/cart/actions";
import useResponsive from "@/hooks/useResponsive";
import { useProduct } from "../ProductContext";
import { isDate } from "date-fns";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { IPlace } from "@/common/types/Product/product";
import { messages } from "./utils";
import {
  AddToCart,
  CartContextType,
  CartState,
  DeliveryTime,
  Type,
} from "./types";

export const CartContext = createContext<CartContextType>(
  initialCartContextData
);

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

  const { push } = useRouter();

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
    toast.loading(messages(type).loading, {
      id: type,
    });
    setLoading(true);
    const response = await updateCart(cartItems);
    setLoading(false);
    if (response.error) {
      toast.error(messages(type).error, {
        id: type,
      });
      return response;
    }

    let toastActons;

    switch (type) {
      case "add":
        toastActons = {
          action: {
            label: "Sepete Git",
            onClick: () => push("/cart"),
          },
        };
        break;
      case "clear":
        toastActons = {
          action: {
            label: "Alışverişe Devam et",
            onClick: () => push("/"),
          },
        };
        break;
      default:
        toastActons = {
          action: {
            label: "Kapat",
            onClick: () => {
              toast.dismiss(type);
            },
          },
        };
    }

    toast.success(messages(type).success, {
      id: type,
      action: toastActons.action,
    });

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
    deliveryLocation: IPlace;
  }) => {
    const cartItems = [...cartState.cartItems];
    const hasItem = cartItems.findIndex((_item) => _item.id === id);
    console.log(deliveryLocation);
    if (hasItem === -1) {
      const item = await getProductByIdForCart(id);

      const _item = {
        ...item,
        deliveryDate: deliveryTime.day,
        deliveryTime: deliveryTime.hour,
        deliveryLocation,
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
        cartItems[hasItem].deliveryLocation = deliveryLocation;
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

  const isProductInCart = (id: number) => {
    const product = cartState.cartItems.find((item) => item.id === id);

    if (Boolean(product)) {
      setDeliveryTime({
        day: new Date(product.deliveryDate),
        hour: product.deliveryTime,
      });
    } else {
      clearDeliveryTime();
    }

    return product;
  };

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
    isProductInCart,
    applyCouponCode,
    updateCartItemNote,
    hasCustomizableProduct,
    setHasCustomizableProduct,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
