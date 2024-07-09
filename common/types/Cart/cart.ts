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
  delivery_date?: string;
  delivery_time?: string;
}
