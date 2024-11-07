import * as Types from "../../generated-types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type GetVendorProductsWithPaginationQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars["Int"]["input"]>;
  offset?: Types.InputMaybe<Types.Scalars["Int"]["input"]>;
  is_active?: Types.InputMaybe<Types.Scalars["Boolean"]["input"]>;
  tenant_id?: Types.Scalars["uuid"]["input"];
}>;

export type GetVendorProductsWithPaginationQuery = {
  product_aggregate: { aggregate?: { count: number } | null };
  product: Array<{
    id: any;
    description?: string | null;
    name: string;
    image_url?: Array<string> | null;
    price?: number | null;
    quantity?: number | null;
    product_categories: Array<{
      category: { name: string; slug?: string | null };
    }>;
  }>;
};

export const GetVendorProductsWithPaginationDocument = gql`
  query getVendorProductsWithPagination(
    $limit: Int = 10
    $offset: Int = 0
    $is_active: Boolean = true
    $tenant_id: uuid! = "39d3f5ba-3029-48b2-ae57-d22b249ec6bd"
  ) {
    product_aggregate(
      where: {
        is_active: { _eq: $is_active }
        tenant: { tenants: { id: { _eq: $tenant_id } } }
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
        tenant: { tenants: { id: { _eq: $tenant_id } } }
      }
    ) {
      id
      description
      name
      image_url
      price
      quantity
      product_categories {
        category {
          name
          slug
        }
      }
    }
  }
`;
export type GetVendorProductsWithPaginationQueryResult = Apollo.QueryResult<
  GetVendorProductsWithPaginationQuery,
  GetVendorProductsWithPaginationQueryVariables
>;
