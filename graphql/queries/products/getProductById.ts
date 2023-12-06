import { Category } from "@/common/types/Category/category";
import { Product } from "@/common/types/Product/product";
import { User } from "@/common/types/User/user";
import { gql } from "@apollo/client";

export const GET_PRODUCT_BY_ID = gql`
  query getProductById($id: bigint = 0) {
    product: product_by_pk(id: $id) {
      category {
        name
      }
      description
      id
      image_url
      name
      price
      quantity
      properties
      questions {
        created_at
        id
        question
        updated_at
        user {
          firstname
          lastname
        }
      }
      reviews {
        comment
        created_at
        score
        user {
          firstname
          lastname
        }
      }
      reviews_aggregate {
        aggregate {
          count(columns: id)
        }
      }
      category {
        name
      }
      tenant {
        id
        firstname
        lastname
      }
    }
  }
`;

export interface ProductForCartResponse {
  product: Pick<
    Product,
    | "id"
    | "name"
    | "image_url"
    | "price"
    | "product_customizable_areas"
    | "discount_price"
    | "description"
  > & {
    category: Pick<Category, "name">;
    tenant: Pick<User, "id" | "nickname">;
  };
  category: Pick<Category, "name">;
}

export const GET_PRODUCT_FOR_CART = gql`
  query getProductById($id: bigint = 0) {
    product: product_by_pk(id: $id) {
      description
      id
      image_url
      name
      price
      discount_price
      product_customizable_areas {
        customizable_area {
          type
        }
        count
      }
      category {
        name
      }
      tenant {
        id
        nickname
      }
    }
    category {
      name
    }
  }
`;

export interface ProductPricesResponse {
  product: Pick<Product, "id" | "price" | "discount_price">;
}

export const GET_PRODUCTS_PRICE_BY_IDS = gql`
  query getProductPricesById($id: bigint = 0) {
    product: product_by_pk(id: $id) {
      id
      price
      discount_price
    }
  }
`;
