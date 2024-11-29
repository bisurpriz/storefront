export const GetProductActionDataDocument = `
    query getProductActionData($id: bigint!) @cached(ttl: 180) {
  product: product_by_pk(id: $id) {
    delivery_type
    delivery_time_ranges
    tenant {
      tenants {
        tenant_shipping_places {
          places
        }
      }
    }
    user_favorites_aggregate {
      aggregate {
        count
      }
    }
    user_favorites(where: {product: {id: {_eq: $id}}}) {
      product_id
    }
  }
}
    `;

export const GetProductActionDataForAnonymousDocument = `
  query getProductActionDataForAnonymous($id: bigint!) @cached(ttl: 180) {
    product: product_by_pk(id: $id) {
      delivery_type
      delivery_time_ranges
      tenant {
        tenants {
          tenant_shipping_places {
            places
          }
        }
      }
      user_favorites_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;
