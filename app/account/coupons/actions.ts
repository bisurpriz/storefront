import { GetAllCouponsQuery } from "@/graphql/queries/account/coupon.generated";
import { GetAllCouponsDocument } from "@/service/coupons";
import { BonnmarseApi } from "@/service/fetch";

export const getUserCoupons = async () => {
  const { coupon: coupons } = await BonnmarseApi.request<GetAllCouponsQuery>({
    query: GetAllCouponsDocument,
  });

  return {
    coupons,
  };
};
