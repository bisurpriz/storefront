import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
  mutation createOrder(
    $user_id: uuid!
    $tenant_orders: [order_tenant_insert_input!]!
    $order_addresses: [order_address_insert_input!]!
  ) {
    insert_order_one(
      object: {
        user_id: $user_id
        tenant_orders: { data: $tenant_orders }
        order_addresses: { data: $order_addresses }
      }
    ) {
      id
      created_at
      total_amount
    }
  }
`;
