import { GetAllCouponsQuery } from "@/graphql/queries/account/coupon.generated";
import { GetAllCouponsDocument } from "@/service/coupons";
import { BonnmarseApi } from "@/service/fetch";

export const getUserCoupons = async () => {
  const { coupon: coupons } = await BonnmarseApi.request<GetAllCouponsQuery>({
    query: GetAllCouponsDocument,
    cache: {
      enable: true,
      duration: 10 * 60 * 1000,
    },
    tags: ["getUserCoupons"],
    withAuth: true,
  });

  return {
    coupons,
  };
};
