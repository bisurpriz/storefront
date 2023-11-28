import { Product } from "../Product/product";

export interface ProductForCart
  extends Pick<
    Product,
    | "description"
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
}
