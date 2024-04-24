import { Product } from "@/graphql/generated";

export interface Question {
  id: number;
  question: string;
  user_id: string;
  product_id: Product["id"];
  created_at: string;
  updated_at: string;
}
