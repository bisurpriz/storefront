import { GetAllCouponsDocument, GetAllCouponsQuery } from "@/graphql/generated";
import { query } from "@/graphql/lib/client";

export const getUserCoupons = async () => {
  const { data } = await query<GetAllCouponsQuery>({
    query: GetAllCouponsDocument,
  });

  return {
    coupons: data.coupon,
  };
};
