import { Product } from "../Product/product";

export interface Review {
  id: number;
  comment: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  product_id: Product["id"];
  score: number;
}
