import { GetCartProductsByIdsQuery, Product } from "@/graphql/generated";
import { CustomizableArea } from "../Order/order";

export interface ProductForOrder
  extends Pick<
    GetCartProductsByIdsQuery["product"][0],
    | "category"
    | "description"
    | "discount_price"
    | "id"
    | "image_url"
    | "name"
    | "price"
    | "stock"
    | "tenant"
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
