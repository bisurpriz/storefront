import { Pagination } from './pagination';

export interface IProductFilter extends Partial<Pagination> {
  category_slug?: string;
}
