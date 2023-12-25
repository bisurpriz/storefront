import { gql } from "@apollo/client";

export const GET_ORDER_ITEM = gql`
  query getSingleOrderItem($id: bigint!) {
    order_item(where: { id: { _eq: $id } }) {
      id
      product {
        tenant {
          id
        }
      }
    }
  }
`;
