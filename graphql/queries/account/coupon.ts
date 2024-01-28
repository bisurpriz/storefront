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
      created_at
      start_date
      end_date
      minimum_cost
      amount
    }
  }
`;

export { GET_ALL_COUPONS };
