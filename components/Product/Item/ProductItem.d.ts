interface ProductData {
  products: ProductItemProps[];
  totalCount: number;
}

interface ProductItemProps {
  name: string;
  description: string;
  image: string;
  price: number;
  id: string;
  loading?: boolean;
}
