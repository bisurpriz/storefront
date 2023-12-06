import { DeliveryType } from "@/common/enums/Product/product";
import { OrderItem, ProductCustomizableArea } from "../Order/order";
import { Question } from "../Question/question";
import { Review } from "../Review/review";
import { Category } from "../Category/category";
import { User } from "../User/user";

export interface DeliveryTypeRelation {
  comment: string;
  value: keyof typeof DeliveryType;
}

export interface Product {
  name: string;
  id: number;
  description: string;
  price: number;
  quantity: number;
  tenant_id: string;
  category_id: string;
  image_url: string | string[];
  is_active: boolean;
  supplier_product_code: string;
  discount_price: number;
  stock: number;
  stock_track: boolean;
  properties: string;
  delivery_type: keyof typeof DeliveryType;
  order_items: OrderItem[];
  product_customizable_areas: ProductCustomizableArea[];
  questions: Question[];
  reviews: Review[];
  category: Category;
  delivery_type_rel: DeliveryTypeRelation;
  tenant: User;
}
