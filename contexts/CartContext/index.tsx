"use client";

import {
  getCartCost,
  getProductByIdForCart,
  updateCart,
} from "@/app/cart/actions";
import { CostData, ProductForCart } from "@/common/types/Cart/cart";
import { IPlace } from "@/common/types/Product/product";
import { HOURS_BEFORE_DELIVERY_END } from "@/components/DatePicker/HourSelect/utils";
import { toast, ToasterToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
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
  AddToCart,
  CartContextType,
  CartState,
  DeliveryTime,
  Type,
} from "./types";
import { messages } from "./utils";

export const CartContext = createContext<CartContextType>(
  initialCartContextData,
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
        item.product_customizable_areas.some((area) => area.count > 0),
      ),
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
    toast({
      title: messages(type).loading,
    });
    setLoading(true);
    const response = await updateCart(cartItems);
    setLoading(false);
    if (response.error) {
      toast({
        title: messages(type).error,
      });
      return response;
    }

    let toastConfig: ToasterToast;

    switch (type) {
      case "add":
        toastConfig = {
          id: "add",
          title: messages(type).success,
          action: (
            <button
              onClick={() => push("/cart")}
              className="text-sm font-medium"
            >
              Sepete Git
            </button>
          ),
        };
        break;
      case "clear":
        toastConfig = {
          id: "clear",
          title: messages(type).success,
          action: (
            <button onClick={() => push("/")} className="text-sm font-medium">
              Alışverişe Devam et
            </button>
          ),
        };
        break;
      default:
        toastConfig = {
          id: "update",
          title: messages(type).success,
        };
    }

    toast(toastConfig);

    return response;
  };

  const updateCartItemNote = (id: number, note: string, index: number) => {
    const cartItems = [...cartState.cartItems];
    const findIndex = cartItems.findIndex((item) => item.id === id);
    if (findIndex === -1) return cartState;
    let notes = cartItems[findIndex].card_note?.match(/\[.*?\]/g);
    if (notes?.length) {
      notes[index] = note.replaceAll("[", "").replaceAll("]", "");
    } else {
      notes = [note.replaceAll("[", "").replaceAll("]", "")];
    }
    // [note1][note2][note3]
    const noteString = notes
      ?.map((n) => `[${n.replaceAll("[", "").replaceAll("]", "")}]`)
      .join("");
    cartItems[findIndex].card_note = noteString;
    updateCartItem(cartItems[findIndex]);
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
    deliveryLocation?: IPlace;
  }) => {
    const cartItems = [...cartState.cartItems];
    const hasItem = cartItems.findIndex((_item) => _item.id === id);
    if (hasItem === -1) {
      const item = await getProductByIdForCart(id);

      const _item = {
        ...item,
        deliveryDate: deliveryTime?.day,
        deliveryTime: deliveryTime?.hour,
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
      if (day && hour.length) {
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
    return cartState.cartItems.find((item) => item.id === id);
  };

  const syncDeliveryTimeWithProduct = (id: number) => {
    const product = cartState.cartItems.find((item) => item.id === id);

    if (product) {
      setDeliveryTime({
        day: product.deliveryDate ? new Date(product.deliveryDate) : null,
        hour: product.deliveryTime || "",
      });
    } else {
      clearDeliveryTime();
    }
  };

  const isDeliveryTimeValid = (
    deliveryDate: Date,
    deliveryTime: string,
  ): boolean => {
    if (!deliveryDate || !deliveryTime) return true;

    const today = new Date();
    const deliveryDay = new Date(deliveryDate);
    const isSameDay =
      today.getDate() === deliveryDay.getDate() &&
      today.getMonth() === deliveryDay.getMonth() &&
      today.getFullYear() === deliveryDay.getFullYear();

    if (!isSameDay) return true;

    const [endHour] = deliveryTime.split("-")[1].trim().split(":");
    const deliveryDateTime = new Date(deliveryDate);
    deliveryDateTime.setHours(
      parseInt(endHour) - HOURS_BEFORE_DELIVERY_END,
      0,
      0,
      0,
    );
    return new Date() <= deliveryDateTime;
  };

  useEffect(() => {
    const invalidItems = cartState.cartItems.filter((item) => {
      if (!item.deliveryDate || !item.deliveryTime) return false;
      const today = new Date();
      const deliveryDay = new Date(item.deliveryDate);
      const isSameDay =
        today.getDate() === deliveryDay.getDate() &&
        today.getMonth() === deliveryDay.getMonth() &&
        today.getFullYear() === deliveryDay.getFullYear();

      if (!isSameDay) return false;

      return !isDeliveryTimeValid(item.deliveryDate, item.deliveryTime);
    });

    if (invalidItems.length > 0) {
      const validItems = cartState.cartItems.filter(
        (item) => !invalidItems.some((invalid) => invalid.id === item.id),
      );

      handleChangeDb(validItems, "update").then(({ costData, error }) => {
        if (error) return;

        dispatch({
          type: UPDATE_CART,
          payload: {
            cartItems: validItems,
            count: validItems.reduce((acc, item) => acc + item.quantity, 0),
            cost: costData,
          },
        });

        toast({
          title: `Teslimat süresi geçen ${invalidItems.length} ürün sepetinizden kaldırıldı.`,
          variant: "destructive",
          duration: 5000,
        });
      });
    }
  }, [cartState.cartItems]);

  const value = useMemo(
    () => ({
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
      syncDeliveryTimeWithProduct,
      applyCouponCode,
      updateCartItemNote,
      hasCustomizableProduct,
      setHasCustomizableProduct,
    }),
    [
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
      syncDeliveryTimeWithProduct,
      applyCouponCode,
      updateCartItemNote,
      hasCustomizableProduct,
      setHasCustomizableProduct,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
