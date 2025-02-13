export interface TypesenseProduct {
  id: string;
  name: string;
  description: string;
  slug: string;
  image_url: string[];
  price: number;
  stock: number;
  brand?: string;
  category?: {
    name: string;
  };
}

export interface TypesenseSearchResponse {
  hits?: Array<{
    document: TypesenseProduct;
  }>;
}
