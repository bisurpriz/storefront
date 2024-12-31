export const GetVendorProductsWithPaginationDocument = `
  query getVendorProductsWithPagination(
    $limit: Int = 10
    $offset: Int = 0
    $is_active: Boolean = true
    $tenant_id: uuid! = "39d3f5ba-3029-48b2-ae57-d22b249ec6bd"
  ) {
    product_aggregate(
      where: {
        is_active: { _eq: $is_active }
        tenant: { tenants: { id: { _eq: $tenant_id } } }
      }
    ) {
      aggregate {
        count
      }
    }
    product(
      limit: $limit
      offset: $offset
      where: {
        is_active: { _eq: $is_active }
        tenant: { tenants: { id: { _eq: $tenant_id } } }
      }
    ) {
      id
      description
      name
      image_url
      price
      quantity
      product_categories {
        category {
          name
          slug
        }
      }
    }
  }
`;

export const GetVendorByIdDocument = `
  query getVendorById($id: uuid!) {
    tenant_by_pk(id: $id) {
      id
      name
      logo
      legal_company_title
      created_at
      owner {
        products_aggregate {
          aggregate {
            count
          }
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

export const GetVendorReviewsDocument = `
  query getVendorReviews($tenant_id: uuid!) {
    review_aggregate(where: {product: {tenant: {tenants: {id: {_eq: $tenant_id}}}}}) {
      aggregate {
        count
      }
    }
  }
`;

export const GetVendorProductScoreAverageDocument = `
  query getVendorProductScoreAverage($tenant_id: uuid!) {
    product_aggregate(where: {tenant: {tenants: {id: {_eq: $tenant_id}}}}) {
      aggregate {
        avg {
          score
        }
      }
    }
  }
`;

export const GetVendorCouponsDocument = `query getVendorCoupons($tenant_id: uuid!) {
  coupon_aggregate(
    where: { tenant: { tenants: { id: { _eq: $tenant_id } } } }
  ) {
    aggregate {
      count
    }
  }
  coupon {
    id
    code
    start_date
    end_date
    amount
    left_limit
    code
    is_public
    minimum_cost
    limit
    }
  }
`;
