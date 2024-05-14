import {
  CustomizableAreaType,
  OrderItemStatus,
} from "@/common/enums/Order/product";
import { Product } from "../Product/product";
import { Address } from "../Addresses/addresses";
import { User } from "../User/user";

export interface OrderItem {
  id: number;
  product_id: Product["id"];
  quantity: Product["quantity"];
  created_at: string;
  updated_at: string;
  user_id: string;
  order_tenant_id: Product["tenant_id"];
  product: Product;
}

export interface CustomizableArea {
  id: number;
  type: CustomizableAreaType.IMAGE | CustomizableAreaType.TEXT;
  values?: {
    [key: string]: string | number;
  }[];
}

export interface ProductCustomizableArea {
  customizable_area: CustomizableArea;
  count: number;
  max_character?: number;
}

export interface OrderItemSpecial {
  id: number;
  order_item_id: OrderItem["id"];
}

export interface OrderItemSpecialText extends OrderItemSpecial {
  content: string;
}

export interface OrderItemSpecialImage extends OrderItemSpecial {
  image_url: string;
}

export interface OrderDetailFormData extends Address {
  user_id: User["id"];
  receiver_firstname: string;
  receiver_surname: string;
  receiver_phone: string;
}

export interface OrderItemResponse {
  id: number;
  order_item_no: string;
  product_id: number;
  quantity: number;
  product: Product;
  order_item_specials: OrderItemSpecial[];
}

export interface OrderResponse {
  id: number;
  total_amount: number;
  created_at: string;
  updated_at: string;
  tenant_orders: {
    id: number;
    tenant: Pick<User, "nickname" | "id">;
    order_items: OrderItemResponse[];
    order_status: {
      value: OrderItemStatus;
    };
  }[];
}

export interface OrderItemWithReview {
  id: number;
  order_tenant: {
    order_status: {
      value: OrderItemStatus;
    };
    updated_at: string;
  };
  created_at: string;
  product: Partial<Product>;
  review_count: number;
}

export interface TenantOrderItem {
  id: number;
  tenant: {
    id: string;
  };
}
