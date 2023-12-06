import { gql } from "@apollo/client";

export const GET_PRODUCTS_WITH_PAGINATION = gql`
  query getProductsWithPagination(
    $limit: Int = 10
    $offset: Int = 0
    $is_active: Boolean = true
  ) {
    product_aggregate(where: { is_active: { _eq: $is_active } }) {
      aggregate {
        count
      }
    }
    product(
      limit: $limit
      offset: $offset
      where: { is_active: { _eq: $is_active } }
    ) {
      id
      description
      name
      image_url
      price
      quantity
      properties
    }
  }
`;
