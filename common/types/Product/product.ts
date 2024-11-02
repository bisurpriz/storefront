import { DeliveryType } from "@/common/enums/Product/product";
import { OrderItem, ProductCustomizableArea } from "../Order/order";
import { Question } from "../Question/question";
import { Review } from "../Review/review";
import { Category } from "../Category/category";

export interface DeliveryTypeRelation {
  comment: string;
  value: keyof typeof DeliveryType;
}

export interface Product {
  name: string;
  slug: string;
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
  is_service_free: boolean;
  score: number;
  reviews_aggregate: {
    aggregate: {
      count: number;
    };
  };
  product_categories: {
    category: Category;
  }[];
  delivery_type_rel: DeliveryTypeRelation;
  tenant: {
    id?: string;
    tenants: {
      id: string;
      name?: string;
      logo?: string;
      iyzi_sub_merchant_key?: string;
      commision_rate?: number;
    }[];
  };
}

export interface IPlace {
  label: string;
  placeId: string;
  address_components: {
    long_name: string;
    short_name: string;
    types: string[];
  }[]
}
