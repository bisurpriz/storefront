import { gql } from "@apollo/client";

const GET_ALL_COUPONS = gql`
  query getAllCoupons {
    coupon(
      where: {
        user_coupons_aggregate: { count: { predicate: { _eq: 0 } } }
        end_date: { _gte: "now()" }
      }
    ) {
      id
      code
      description
      created_at
      start_date
      end_date
      minimum_cost
      amount
      product {
        name
        slug
        id
        image_url
        tenant {
          nickname
        }
      }
    }
  }
`;

export { GET_ALL_COUPONS };
