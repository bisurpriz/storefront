import { gql } from "@apollo/client";

export const GET_PRODUCT_BY_ID = gql`
query MyQuery($id: bigint = 0) {
  product_by_pk(id: $id) {
    description
    id
    image_url
    name
    price
    quantity
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
    }
  }
}
`;
