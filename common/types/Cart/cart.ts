import { Product } from "../Product/product";

export interface ProductForCart
  extends Pick<
    Product,
    | "id"
    | "image_url"
    | "name"
    | "price"
    | "category"
    | "tenant"
    | "discount_price"
    | "product_customizable_areas"
  > {
  quantity: number;
  deliveryDate?: Date;
  deliveryTime?: string;
}

export interface CostData {
  totalPrice: number;
  couponMessage: string;
  isCouponApplied: boolean;
  discountAmount: number;
  totalWithDiscount?: number;
}
