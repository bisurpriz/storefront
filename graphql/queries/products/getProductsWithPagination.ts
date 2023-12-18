import { gql } from "@apollo/client";

export const GET_PRODUCTS_WITH_PAGINATION = gql`
  query getProductsWithPagination(
    $limit: Int = 15
    $offset: Int = 0
    $is_active: Boolean = true
    $category_slug: String
  ) {
    product_aggregate(
      where: {
        is_active: { _eq: $is_active }
        category: { slug: { _eq: $category_slug } }
      }
    ) {
      aggregate {
        count
      }
    }
    product(
      limit: $limit
      offset: $offset
      where: {
        is_active: { _eq: $is_active }
        category: { slug: { _eq: $category_slug } }
      }
    ) {
      id
      tenant_id
      description
      name
      slug
      category {
        name
        slug
      }
      image_url
      price
      quantity
      properties
      discount_price
      product_customizable_areas {
        count
      }
      reviews_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;
