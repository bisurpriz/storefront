import { CustomizableArea, ProductCustomizableArea } from "../Order/order";
import { Product } from "../Product/product";

export interface CartCustomizableArea extends CustomizableArea {
  values: {
    [key: string]: string;
  }[];
}

export interface CartProductCustomizableArea extends ProductCustomizableArea {
  customizable_area: CartCustomizableArea;
}
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
  > {
  quantity: number;
  product_customizable_areas?: CartProductCustomizableArea[];
}
