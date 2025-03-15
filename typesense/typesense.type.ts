import { IPlace } from "@/components/QuarterSelector/types";
import { Product } from "@/graphql/generated-types";

export interface ITypesenseProduct
  extends Pick<
    Product,
    | "id"
    | "name"
    | "description"
    | "image_url"
    | "price"
    | "user_favorites"
    | "user_favorites_aggregate"
    | "score"
    | "reviews_aggregate"
    | "delivery_type"
    | "delivery_time_ranges"
    | "product_customizable_areas"
    | "last_order_time"
    | "variants"
    | "is_service_free"
    | "tenant"
    | "product_customizable_areas"
    | "discount_price"
    | "slug"
    | "properties"
    | "reviews"
    | "product_categories"
    | "product_categories_aggregate"
    | "product_no"
    | "product_customizable_areas_aggregate"
    | "tenant_id"
    | "is_active"
    | "is_approved"
    | "is_service_free"
  > {
  places: IPlace[];
  place_count: number;
  is_customizable: boolean;
  review_count: number;
}
