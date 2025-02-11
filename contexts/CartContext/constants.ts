import { CartContextType } from "./types";

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CLEAR_CART = "CLEAR_CART";
export const UPDATE_CART = "UPDATE_CART";

export const CouponMessages = {
  INVALID_COUPON: "Hatalı kupon kodu",
  COUPON_LIMIT_OVER: "Geçersiz kupon",
  TOTAL_AMOUNT_LESS: "Sepet tutarı yetersiz",
  COUPON_SUCCESS: "Kupon başarıyla uygulandı",
};

export const initialCartContextData: CartContextType = {
  cartState: {
    cartItems: [],
    count: 0,
    cost: {
      totalPrice: 0,
      isCouponApplied: false,
      couponMessage: "",
      discountAmount: 0,
    },
  },
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  updateCartItem: () => {},
  loading: false,
  deliveryTime: { day: null, hour: "" },
  setDeliveryTimeHandler: () => {},
  clearDeliveryTime: () => {},
  isProductInCart: () => undefined,
  syncDeliveryTimeWithProduct: () => {},
  applyCouponCode: () => {},
  updateCartItemNote: () => {},
  hasCustomizableProduct: false,
  setHasCustomizableProduct: () => {},
};
