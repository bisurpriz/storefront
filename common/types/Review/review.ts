import { Product } from "@/graphql/generated";

export interface Review {
  id: number;
  comment: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  product_id: Product["id"];
  score: number;
}

export interface ReviewWithProduct {
  id: number;
  comment: string;
  score: number;
  created_at: string;
  product: {
    review_count: number;
  } & Partial<Product>;
}
