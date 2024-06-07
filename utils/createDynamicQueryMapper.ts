import { CookieTokens } from "@/app/@auth/contants";
import { cookies } from "next/headers";
import { parseJson } from "./format";

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
      case FILTER_KEYS.CATEGORY:
        return {
          category: {
            slug: {
              _in: (searchParams[key] as string).split(","),
            },
          },
        };
      case FILTER_KEYS.PRICE: {
        const price = (searchParams[key] as string).split("-");

        return {
          discount_price: {
            _gte: Number(price[0]),
            _lte: Number(price[1]),
          },
        };
      }
      // case FILTER_KEYS.DELIVERY_TYPE:
      //   return {
      //     delivery_type: {
      //       _in: searchParams[key],
      //     },
      //   };
      case FILTER_KEYS.CUSTOMIZABLE:
        if (!(searchParams[key] === "true")) return {};
        return {
          product_customizable_areas: { count: { _gt: 0 } },
        };
      case FILTER_KEYS.SAME_DAY_DELIVERY:
        if (!(searchParams[key] === "true")) return {};
        return {
          delivery_type: {
            _in: searchParams[key] === "true" && ["SAME_DAY"],
          },
        };
    }
  });

  // TODO: burası location olarak düzenlenecek
  const cookie = cookies().get(CookieTokens.LOCATION_ID)?.value;
  const quarter_code = parseJson(cookie)?.id;

  const quarter_query = {
    tenant: {
      tenants: {
        tenant_shipping_places: {
          quarter_code: { _in: quarter_code ? [quarter_code] : undefined },
        },
      },
    },
  };

  const filter_payload = query.reduce(
    (acc, curr) => {
      return {
        ...acc,
        ...curr,
      };
    },
    {
      is_active: {
        _eq: true,
      },
      ...quarter_query,
    }
  );

  return {
    filter_payload,
  };
};
