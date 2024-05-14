import { Product } from "../Product/product";

export interface ProductForOrder
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
  product_customizable_areas: {
    customizable_area: CustomizableArea;
    id: number;
    quantity: number;
    count: number;
  }[] &
    Product["product_customizable_areas"];
}

export type ProductForCart = Pick<
  ProductForOrder,
  "id" | "product_customizable_areas" | "quantity"
>;
