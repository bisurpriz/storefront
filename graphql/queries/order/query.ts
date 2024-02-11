import { gql } from '@apollo/client';

export const GET_TENANT_ORDER_ITEM = gql`
  query getSingleTenantOrderItem($id: bigint!) {
    order_tenant(where: { id: { _eq: $id } }) {
      id
      tenant {
        id
      }
    }
  }
`;
