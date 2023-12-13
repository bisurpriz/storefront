import { gql } from "@apollo/client";

export const GET_VENDOR_PRODUCTS_WITH_PAGINATION = gql`
  query getVendorProductsWithPagination(
    $limit: Int = 10
    $offset: Int = 0
    $is_active: Boolean = true
    $tenant_id: uuid!
  ) {
    product_aggregate(
      where: { is_active: { _eq: $is_active }, tenant_id: { _eq: $tenant_id } }
    ) {
      aggregate {
        count
      }
    }
    product(
      limit: $limit
      offset: $offset
      where: { is_active: { _eq: $is_active }, tenant_id: { _eq: $tenant_id } }
    ) {
      id
      description
      name
      image_url
      price
      quantity
    }
  }
`;
