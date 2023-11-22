import { gql } from "@apollo/client";

export const GET_PRODUCT_BY_ID = gql`
  query getProductById($id: bigint = 0) {
    product: product_by_pk(id: $id) {
      description
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

export const GET_PRODUCT_FOR_CART = gql`
  query getProductById($id: bigint = 0) {
    product: product_by_pk(id: $id) {
      description
      id
      image_url
      name
      price
      discount_price
      customize: product_customizable_areas {
        area: customizable_area {
          type
        }
        count
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
    category {
      name
    }
    tenant {
      id
    }
  }
}
`;
