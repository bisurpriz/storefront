import * as Types from "../../generated-types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type GetVendorByIdQueryVariables = Types.Exact<{
  id: Types.Scalars["uuid"]["input"];
}>;

export type GetVendorByIdQuery = {
  tenant_by_pk?: {
    id: any;
    name?: string | null;
    logo?: string | null;
    legal_company_title?: string | null;
    created_at: any;
    owner: {
      products_aggregate: { aggregate?: { count: number } | null };
      reviews_aggregate: { aggregate?: { count: number } | null };
    };
  } | null;
};

export const GetVendorByIdDocument = gql`
  query getVendorById($id: uuid!) {
    tenant_by_pk(id: $id) {
      id
      name
      logo
      legal_company_title
      created_at
      owner {
        products_aggregate {
          aggregate {
            count
          }
        }
        reviews_aggregate {
          aggregate {
            count
          }
        }
      }
    }
  }
`;
export type GetVendorByIdQueryResult = Apollo.QueryResult<
  GetVendorByIdQuery,
  GetVendorByIdQueryVariables
>;
