import { IPlace, Product } from "../Product/product";

export interface ProductForCart
  extends Pick<
    Product,
    | "id"
    | "image_url"
    | "name"
    | "price"
    | "product_categories"
    | "tenant"
    | "discount_price"
    | "product_customizable_areas"
    | "delivery_type"
    | "is_service_free"
  > {
  quantity: number;
  deliveryDate?: Date;
  deliveryTime?: string;
  card_note?: string;
  deliveryLocation?: IPlace;
}

export interface CostData {
  totalPrice: number;
  couponMessage: string;
  isCouponApplied: boolean;
  discountAmount: number;
  totalWithDiscount?: number;
  couponCode?: string;
}
