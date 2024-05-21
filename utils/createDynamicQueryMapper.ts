export enum FILTER_KEYS {
  SEARCH = "search",
  QUARTER_CODE = "quarter_code",
  CATEGORY = "category",
  PRICE = "price",
  DELIVERY_TYPE = "delivery_type",
  CUSTOMIZABLE = "customizable",
  SAME_DAY_DELIVERY = "sameDayDelivery",
}

export type FilterSearchParams = {
  [FILTER_KEYS.SEARCH]?: string;
  [FILTER_KEYS.QUARTER_CODE]?: string[];
  [FILTER_KEYS.CATEGORY]?: string;
  [FILTER_KEYS.PRICE]?: number[];
  [FILTER_KEYS.DELIVERY_TYPE]?: string[];
  [FILTER_KEYS.CUSTOMIZABLE]?: boolean;
  [FILTER_KEYS.SAME_DAY_DELIVERY]?: boolean;
};

export const createDynamicQueryMapper = (searchParams: {
  [key: string]: string | string[] | undefined;
}) => {
  const query = Object.keys(searchParams).map((key) => {
    switch (key) {
      case FILTER_KEYS.SEARCH:
        return {
          _or: [
            {
              name: {
                _ilike: `%${searchParams[key]}%`,
              },
            },
            {
              description: {
                _ilike: `%${searchParams[key]}%`,
              },
            },
            {
              category: {
                name: {
                  _ilike: `%${searchParams[key]}%`,
                },
              },
            },
          ],
        };
      case FILTER_KEYS.QUARTER_CODE:
        return {
          tenant: {
            tenants: {
              tenant_shipping_places: {
                quarter_code: {
                  _in: searchParams[key],
                },
              },
            },
          },
        };
      case FILTER_KEYS.CATEGORY:
        return {
          category: {
            slug: {
              _in: (searchParams[key] as string).split(","),
            },
          },
        };
      case FILTER_KEYS.PRICE:
        return {
          discount_price: {
            _gte: searchParams[key][0],
            _lte: searchParams[key][1],
          },
        };
      case FILTER_KEYS.DELIVERY_TYPE:
        return {
          delivery_type: {
            _in: searchParams[key],
          },
        };
      case FILTER_KEYS.CUSTOMIZABLE:
        return {
          product_customizable_areas_aggregate: {
            count: {
              predicate: {
                _gt: 0,
              },
            },
          },
        };
      case FILTER_KEYS.SAME_DAY_DELIVERY:
        return {
          same_day_delivery: {
            _eq: true,
          },
        };
    }
  });

  return {
    filter_payload: {
      _and: query,
    },
  };
};
