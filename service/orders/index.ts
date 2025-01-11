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
  query getOrderApproveImages($shortCode: String) {
    order_item(where: { short_code: { _eq: $shortCode } }) {
      images_to_approve
      is_images_approved
      image_approve_expiry
    }
  }
`;

export const GetOrderForTrackingDocument = `query getOrderForTracking($orderNo: bigint!) {
  order(where: { order_no: { _eq: $orderNo }, payment_status: { _eq: PAID } }) {
    created_at
    order_no
    tenant_orders {
      id
      status
      tenant {
        tenants {
          name
          id
        }
      }
      order_items {
        quantity
        id
        status
        sell_price
        delivery_date
        delivery_time
        product {
          name
          id
          slug
          image_url
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
