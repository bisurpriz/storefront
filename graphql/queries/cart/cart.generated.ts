import * as Types from "../../generated-types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type UpdateDbCartMutationVariables = Types.Exact<{
  payload: Array<Types.Cart_Insert_Input> | Types.Cart_Insert_Input;
  CONSTRAINT: Types.Cart_Constraint;
}>;

export type UpdateDbCartMutation = {
  insert_cart?: { affected_rows: number; returning: Array<{ id: any }> } | null;
};

export type GetDbCartQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetDbCartQuery = { cart: Array<{ id: any; content?: any | null }> };

export type GetProductByIdForCartQueryVariables = Types.Exact<{
  id: Types.Scalars["bigint"]["input"];
}>;

export type GetProductByIdForCartQuery = {
  product_by_pk?: {
    id: any;
    image_url?: Array<string> | null;
    name: string;
    price?: number | null;
    delivery_type?: Types.Delivery_Type_Enum | null;
    is_service_free?: boolean | null;
    score?: number | null;
    delivery_time_ranges?: any | null;
    discount_price?: number | null;
    product_categories: Array<{
      category: { id: number; name: string; slug?: string | null };
    }>;
    tenant: {
      id: any;
      tenants: Array<{
        id: any;
        name?: string | null;
        commision_rate?: number | null;
        iyzi_sub_merchant_key?: string | null;
        tenant_shipping_places: Array<{ places: any }>;
      }>;
    };
    product_customizable_areas: Array<{
      count: number;
      max_character?: number | null;
      customizable_area: { id: number; type: string };
    }>;
  } | null;
};

export const UpdateDbCartDocument = gql`
  mutation updateDbCart(
    $payload: [cart_insert_input!]!
    $CONSTRAINT: cart_constraint!
  ) {
    insert_cart(
      objects: $payload
      on_conflict: { constraint: $CONSTRAINT, update_columns: [content] }
    ) {
      returning {
        id
      }
      affected_rows
    }
  }
`;
export type UpdateDbCartMutationFn = Apollo.MutationFunction<
  UpdateDbCartMutation,
  UpdateDbCartMutationVariables
>;
export type UpdateDbCartMutationResult =
  Apollo.MutationResult<UpdateDbCartMutation>;
export type UpdateDbCartMutationOptions = Apollo.BaseMutationOptions<
  UpdateDbCartMutation,
  UpdateDbCartMutationVariables
>;
export const GetDbCartDocument = gql`
  query getDbCart {
    cart {
      id
      content
    }
  }
`;
export type GetDbCartQueryResult = Apollo.QueryResult<
  GetDbCartQuery,
  GetDbCartQueryVariables
>;
export const GetProductByIdForCartDocument = gql`
  query getProductByIdForCart($id: bigint!) {
    product_by_pk(id: $id) {
      id
      image_url
      name
      price
      delivery_type
      is_service_free
      score
      delivery_time_ranges
      product_categories {
        category {
          id
          name
          slug
        }
      }
      tenant {
        id
        tenants {
          id
          name
          commision_rate
          iyzi_sub_merchant_key
          tenant_shipping_places {
            places
          }
        }
      }
      discount_price
      product_customizable_areas {
        count
        max_character
        customizable_area {
          id
          type
        }
      }
    }
  }
`;
export type GetProductByIdForCartQueryResult = Apollo.QueryResult<
  GetProductByIdForCartQuery,
  GetProductByIdForCartQueryVariables
>;
