export type ProductForCart = {
  description: string;
  id: string;
  image_url: string;
  name: string;
  price: number;
  categoryName: string;
  tenantName: string;
  quantity: number;
  discountPrice: number;
  customize: {
    area: {
      type: "special_text" | "special_image";
    };
    count: number;
  }[];
};

export type Area = Pick<ProductForCart["customize"][0]["area"], "type"> & {
  count: ProductForCart["customize"][0]["count"];
  values: any;
};
