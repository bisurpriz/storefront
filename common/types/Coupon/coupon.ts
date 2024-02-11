import { Product } from '../Product/product';

export interface ICoupon {
  id: string;
  code: string;
  description: string;
  created_at: string;
  start_date: string;
  end_date: string;
  minimum_cost: number;
  amount: number;
  product: Partial<Product>;
}
