export const UpdateDbCartDocument = `mutation updateDbCart($payload: [cart_insert_input!]!, $CONSTRAINT: cart_constraint!) {
  insert_cart(
    objects: $payload
    on_conflict: {constraint: $CONSTRAINT, update_columns: [content]}
  ) {
    returning {
      id
    }
    affected_rows
  }
}`;

export const GetDbCartDocument = `query getDbCart {
  cart {
    id
    content
  }
}`;

export const GetProductsForInitialCartDocument = `
    query getProductsForInitialCart($ids: [bigint!]) {
  product(where: {id: {_in: $ids}, is_approved: {_eq: true}}) {
    name
    description
    id
    price
    slug
    discount_price
    score
    stock
    image_url
    delivery_time_ranges
    product_categories {
      category {
        id
        name
        slug
      }
    }
    tenant {
      id
      tenants {
        id
        name
        logo
        iyzi_sub_merchant_key
        commision_rate
        tenant_shipping_places {
          places
        }
      }
    }
    product_customizable_areas {
      customizable_area {
        id
        type
      }
      count
      max_character
    }
  }
}
    `;

export const GetProductByIdForCartDocument = `
    query getProductByIdForCart($id: bigint!) {
  product_by_pk(id: $id) {
    id
    slug
    image_url
    name
    price
    delivery_type
    is_service_free
    score
    delivery_time_ranges
    product_categories {
      category {
        id
        name
        slug
      }
    }
    tenant {
      id
      tenants {
        id
        name
        commision_rate
        iyzi_sub_merchant_key
        tenant_shipping_places {
          places
        }
      }
    }
    discount_price
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
    `;
