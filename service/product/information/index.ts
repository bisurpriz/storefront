export const GetProductInformationDocument = `
    query getProductInformation($id: bigint!) @cached(ttl: 180) {
  product: product_by_pk(id: $id) {
    description
    id
    image_url
    name
    price
    is_service_free
    delivery_time_ranges
    delivery_type
    last_order_time
    score
    properties
    slug
    variants {
      variant {
        id
        name
        image_url
        price
        slug
        discount_price
        product_categories {
          category {
            slug
          }
        }
      }
    }
    product_categories {
      category {
        slug
      }
    }
    discount_price
    product_customizable_areas {
      customizable_area {
        id
        type
      }
      count
      max_character
    }
    reviews_aggregate {
      aggregate {
        count(columns: id)
        avg {
          score
        }
      }
    }
    tenant {
      tenants {
        name
        id
      }
    }
  }
}
    `;
