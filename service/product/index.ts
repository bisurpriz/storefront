export const GetProductByIdDocument = `
    query getProductById($id: bigint = 0) {
  product: product_by_pk(id: $id) {
    product_categories {
      category {
        name
      }
    }
    description
    id
    image_url
    name
    price
    quantity
    is_service_free
    delivery_time_ranges
    delivery_type
    last_order_time
    properties
    score
    discount_price
    questions {
      created_at
      id
      question
      updated_at
      user {
        firstname
        lastname
      }
    }
    reviews {
      id
      comment
      created_at
      score
      user {
        firstname
        lastname
        picture
        id
      }
    }
    product_customizable_areas {
      customizable_area {
        id
        type
      }
    }
    reviews_aggregate {
      aggregate {
        count(columns: id)
      }
    }
    product_categories {
      category {
        name
        id
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
      }
    }
    user_favorites {
      user_id
      id
    }
    user_favorites_aggregate {
      aggregate {
        count
      }
    }
  }
}
    `;

export const GetProductsWithPaginationDocument = `
    query getProductsWithPagination($limit: Int = 15, $offset: Int = 0, $category_slug: String) {
  product_aggregate(
    where: {product_categories: {category: {slug: {_eq: $category_slug}}}}
  ) {
    aggregate {
      count
    }
  }
  product(
    limit: $limit
    offset: $offset
    where: {product_categories: {category: {slug: {_eq: $category_slug}}}}
  ) {
    id
    tenant_id
    description
    name
    slug
    score
    product_categories {
      category {
        name
        slug
      }
    }
    image_url
    price
    quantity
    properties
    discount_price
    product_customizable_areas {
      count
      customizable_area {
        type
      }
    }
    tenant {
      id
      tenants {
        name
        logo
        id
        iyzi_sub_merchant_key
        commision_rate
      }
    }
    reviews_aggregate {
      aggregate {
        count
      }
    }
  }
}
    `;

export const GetProductsWithFilteredPaginationDocument = `
    query getProductsWithFilteredPagination($filter_payload: product_bool_exp, $limit: Int = 10, $offset: Int = 0) {
  product_aggregate(where: $filter_payload) {
    aggregate {
      count
    }
  }
  product(
    where: $filter_payload
    limit: $limit
    offset: $offset
    order_by: {id: asc}
  ) {
    id
    tenant_id
    description
    name
    slug
    score
    product_categories {
      category {
        name
        slug
      }
    }
    image_url
    price
    quantity
    slug
    properties
    discount_price
    is_service_free
    delivery_type
    product_customizable_areas {
      count
      customizable_area {
        type
      }
    }
    tenant {
      id
      tenants {
        name
        logo
        id
        iyzi_sub_merchant_key
        commision_rate
      }
    }
    reviews_aggregate {
      aggregate {
        count
      }
    }
  }
}
    `;

export const GetProductDescriptionDocument = `
  query getProductDescription($id: bigint!) @cached(ttl: 180) {
    product: product_by_pk(id: $id) {
      description
      properties
    }
  }
`;
