export const GetSingleTenantOrderItemDocument = `
  query getSingleTenantOrderItem($id: bigint) {
    order_tenant(where: { id: { _eq: $id } }) {
      id
      tenant {
        id
      }
    }
  }
`;

export const GetOrderApproveImagesDocument = `
  query getOrderApproveImages($token: String) {
    order_item(where: { image_approve_token: { _eq: $token } }) {
      images_to_approve
      is_images_approved
      image_approve_expiry
    }
  }
`;

export const GetOrderForTrackingDocument = `
    query getOrderForTracking($orderNo: bigint!) {
  order(where: {order_no: {_eq: $orderNo}, payment_status: {_eq: PAID}}) {
    created_at
    order_no
    tenant_orders {
      id
      status
      order_items {
        quantity
        id
        delivery_date
        delivery_time
        product {
          name
          id
          slug
          product_categories {
            category {
              name
              id
              slug
            }
          }
        }
      }
    }
  }
}
    `;
