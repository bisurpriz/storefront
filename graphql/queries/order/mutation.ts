import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
  mutation MyMutation($user_id: uuid!, $total_amount: numeric!, $tenant_orders: [order_tenant_insert_input!]!) {
    insert_order_one(
      object: { user_id: $user_id, total_amount: $total_amount, tenant_orders: { data: $tenant_orders } }
    ) {
      id
    }
  }
`;
