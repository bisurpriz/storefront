import { CostData, ProductForCart } from "@/common/types/Cart/cart";
import { IPlace } from "@/common/types/Product/product";
import { Dispatch, SetStateAction } from "react";

export type Type = "add" | "remove" | "clear" | "update";

export interface CartState {
  cartItems: ProductForCart[];
  count: number;
  cost: CostData;
}

export type DeliveryTime = {
  day: Date | null;
  hour: string;
};

export type AddToCart = ({
  id,
  type,
  quantity,
}: {
  id: number;
  type: "updateq" | "add";
  quantity?: number;
  deliveryDate?: string;
  deliveryTime?: string;
  deliveryLocation: IPlace;
}) => void;

export interface CartContextType {
  addToCart: AddToCart;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
  updateCartItem: (item: ProductForCart) => void;
  cartState: CartState;
  loading: boolean;
  deliveryTime: DeliveryTime | null;
  setDeliveryTimeHandler: (deliveryTime: DeliveryTime) => void;
  clearDeliveryTime: () => void;
  isProductInCart: (id: number) => ProductForCart;
  applyCouponCode: (code: string) => Promise<void>;
  updateCartItemNote: (id: number, note: string, index: number) => void;
  hasCustomizableProduct: boolean;
  setHasCustomizableProduct: Dispatch<SetStateAction<boolean>>;
}
