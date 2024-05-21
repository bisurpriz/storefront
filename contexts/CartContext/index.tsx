"use client";

import { ProductForCart, ProductForOrder } from "@/common/types/Cart/cart";
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
import {
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_FROM_CART,
  UPDATE_CART,
} from "./constants";
import { cartReducer } from "./reducer";
import { updateCart } from "@/app/cart/actions";

interface CartContextType {
  cartItems: ProductForOrder[];
  addToCart: (item: ProductForCart) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
  updateCartItem: (item: ProductForCart) => void;
  count: number;
  cost: number;
  loading?: boolean;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  updateCartItem: () => {},
  count: 0,
  cost: 0,
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
  const [cartItems, dispatch] = useReducer(cartReducer, cartDbItems ?? []);
  const [count, setCount] = useState(
    cartItems.reduce((acc, item) => acc + item.quantity, 0)
  );
  const [cost, setCost] = useState(dbCost ?? 0);
  const [loading, setLoading] = useState(false);

  const handleChangeDb = async (cartItems: ProductForCart[]) => {
    setLoading(true);
    toast.promise(
      updateCart(cartItems)
        .then(({ costData }) => {
          if (costData) setCost(costData);
          setCount(cartItems.reduce((acc, item) => acc + item.quantity, 0));
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        }),
      {
        loading: "Ürün sepete ekleniyor.",
        success: "Ürün sepete eklendi.",
        error: "Ürün sepete eklenirken bir hata oluştu.",
      },
      {
        position: "bottom-right",
      }
    );
  };

  useEffect(() => {
    const cartDbIds = cartDbItems.map((item) => item.id);
    const cartIds = cartItems.map((item) => item.id);

    if (cartDbIds.length !== cartIds.length) {
      handleChangeDb(cartItems);
    } else {
      const isSame = cartIds.every((id) => cartDbIds.includes(id));
      if (!isSame) {
        handleChangeDb(cartItems);
      }
    }
  }, [cartItems, cartDbItems]);

    if (!ids.length) return;

    const getCartItems = async () => {
      const res = await getProductsForCartWithIds(ids);

      const items = res.map((item, i) => {
        const cartItem = detailedDbItems.find(
          (cartItem) => cartItem.id === item.id
        );
        return {
          ...item,
          quantity: cartItem?.quantity,
          product_customizable_areas:
            detailedDbItems[i].product_customizable_areas,
        } as ProductForOrder;
      });
      dispatch({ type: SET_ALL_CART, payload: items });
    };

    getCartItems();
  }, [detailedDbItems]);

  const getLocalStorageCart = () => {
    const cart = localStorage.getItem("cart");
    return cart ? (JSON.parse(cart) as typeof cartItems) : [];
  };

  const setLocalStorageCart = (cart: ProductForCart[]) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const { user } = useUser();

  const handleChangeDb = useCallback(async () => {
    if (!user) {
      setLocalStorageCart(cartItems);
      return;
    }

    const localData = getLocalStorageCart();

    if (localData.length) {
      const updateItemData: UpdateUserCartMutationVariables["payload"] = {
        content: JSON.stringify(
          localData.map((item) => ({
            product_id: item.id,
            quantity: item.quantity,
            product_customizable_areas: item.product_customizable_areas,
          }))
        ),
        user_id: user?.id,
        id: user?.carts[0]?.id,
      };
      await updateCart(updateItemData);
      localStorage.removeItem("cart");
      return;
    }

    const updateItemData: UpdateUserCartMutationVariables["payload"] = user
      ?.carts[0]?.id && {
      content: JSON.stringify(
        cartItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          product_customizable_areas: item.product_customizable_areas,
        }))
      ),
      user_id: user?.id,
      id: user?.carts[0]?.id,
    };

    await updateCart(updateItemData);
  }, [cartItems, user]);

  const addToCart = useCallback((item: ProductForOrder) => {
    dispatch({ type: ADD_TO_CART, payload: item });
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

  const updateCartItem = useCallback((item: ProductForOrder) => {
    dispatch({
      type: UPDATE_CART,
      payload: item,
    });
  }, []);

  const count = useMemo(
    () => cartItems?.reduce((acc, item) => acc + item.quantity, 0) ?? 0,
    [cartItems]
  );

  const memoizedValue = useMemo(() => {
    return {
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,
      updateCartItem,
      count,
      cost,
      loading,
    };
  }, [cartItems, count]);

  return (
    <CartContext.Provider value={memoizedValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
