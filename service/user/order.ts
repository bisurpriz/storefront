export const GetUserOrdersDocument = `
    query getUserOrders {
  order(where: { payment_status: { _eq: PAID } }) {
    created_at
    id
    order_no
    total_amount
    tenant_orders {
      id
      tenant {
        id
        tenants {
          name
          id
        }
      }
      order_items {
        id
        order_item_no
        product_id
        quantity
        status
        order_item_special_images {
          image_url
          quantity_index
          id
        }
        order_item_special_texts {
          content
          quantity_index
          id
        }
        product {
          product_categories {
            category {
              name
              slug
            }
          }
          id
          slug
          image_url
          name
          quantity
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
      order_status {
        value
      }
      order_items_aggregate {
        aggregate {
          count(columns: id)
        }
      }
    }
  }
}
    `;

export const SendMessageAloneDocument = `
    mutation sendMessageAlone($message: String!, $receiver_id: uuid!, $order_tenant_id: bigint!) {
  insert_message_one(
    object: {receiver_id: $receiver_id, message: $message, chat_thread: {data: {order_tenant_id: $order_tenant_id, tenat_id: $receiver_id}, on_conflict: {constraint: chat_thread_order_tenant_id_key, update_columns: [order_tenant_id]}}}
  ) {
    created_at
    chat_thread {
      tenat_id
      order_tenant_id
    }
  }
}
    `;

export const UpdateOrderItemSpecialTextDocument = `
  mutation UpdateOrderItemSpecialText(
    $object: [order_item_special_text_insert_input!]!
  ) {
    insert_order_item_special_text(
      objects: $object
      on_conflict: {
        constraint: order_item_special_text_pkey
        update_columns: [content]
      }
    ) {
      affected_rows
    }
  }
`;

export const GetOrderByIdDocument = `
  query GetOrderById($id: uuid = "") {
    order_by_pk(id: $id) {
      created_at
      tenant_orders {
        tenant {
          tenants {
            logo
            name
          }
        }
        order_items {
          id
          order_item_special_images {
            id
            image_url
            order_item_id
            quantity_index
          }
          order_item_special_texts {
            id
            order_item_id
            quantity_index
            content
          }
          status
          sell_price
          quantity
          product {
            image_url
            slug
            name
            product_customizable_areas {
              customizable_area {
                id
                type
              }
              id
              max_character
              count
            }
          }
        }
      }
    }
  }
`;

export const GetOrdersWithReviewsDocument = `
    query getOrdersWithReviews($user_id: uuid!) {
  order_item(
    where: {_and: [{product: {reviews: {user_id: {_is_null: true}}}}, {order_tenant: {order_status: {value: {_eq: "Delivered"}}}}]}
  ) {
    id
    order_tenant {
      order_status {
        value
      }
      updated_at
    }
    created_at
    product {
      slug
      id
      name
      image_url
      reviews_aggregate {
        aggregate {
          count
        }
      }
    }
  }
  review(where: {user_id: {_eq: $user_id}}) {
    id
    comment
    score
    created_at
    product {
      slug
      name
      id
      image_url
      product_categories {
        category {
          name
          slug
          id
        }
      }
      tenant {
        id
        picture
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
