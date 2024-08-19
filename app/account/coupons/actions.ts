import { query } from "@/graphql/lib/client";
import {
  GetAllCouponsDocument,
  GetAllCouponsQuery,
  GetAllCouponsQueryVariables,
} from "@/graphql/queries/account/coupon.generated";

export const getUserCoupons = async () => {
  const { data } = await query<GetAllCouponsQuery, GetAllCouponsQueryVariables>(
    {
      query: GetAllCouponsDocument,
    }
  );

  return {
    coupons: data.coupon,
  };
};
