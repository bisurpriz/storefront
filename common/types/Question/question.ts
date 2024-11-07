import { Product } from "../Product/product";

export interface Question {
  id: number;
  question: string;
  user_id: string;
  product_id: Product["id"];
  created_at: string;
  updated_at: string;
}
