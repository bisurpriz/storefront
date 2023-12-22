import { gql } from "@apollo/client";

const GET_ORDERS_WITH_REVIEW = gql`
  query getOrdersWithReviews($user_id: uuid!) {
    order_item(
      where: {
        _and: [
          {
            product: {
              _or: [
                { reviews_aggregate: { count: { predicate: { _eq: 0 } } } }
                { reviews: { user_id: { _neq: $user_id } } }
              ]
            }
          }
          { order_tenant: { order_status: { value: { _eq: "Delivered" } } } }
        ]
      }
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

    review(where: { user_id: { _eq: $user_id } }) {
      id
      comment
      score
      created_at
      product {
        slug
        name
        id
        image_url
        category {
          name
          slug
          id
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

export { GET_ORDERS_WITH_REVIEW };
