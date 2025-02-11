import { CostData, ProductForCart } from "@/common/types/Cart/cart";
import { IPlace } from "@/common/types/Product/product";

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
  cartState: CartState;
  addToCart: AddToCart;
  removeFromCart: (itemId: number | string) => void;
  clearCart: () => void;
  updateCartItem: (item: ProductForCart) => void;
  loading: boolean;
  deliveryTime: DeliveryTime;
  setDeliveryTimeHandler: (deliveryTime: DeliveryTime) => void;
  clearDeliveryTime: () => void;
  isProductInCart: (id: number) => ProductForCart | undefined;
  syncDeliveryTimeWithProduct: (id: number) => void;
  applyCouponCode: (code: string) => void;
  updateCartItemNote: (id: number, note: string, index: number) => void;
  hasCustomizableProduct: boolean;
  setHasCustomizableProduct: (value: boolean) => void;
}
