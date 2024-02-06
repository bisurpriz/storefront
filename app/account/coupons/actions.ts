import { ICoupon } from '@/common/types/Coupon/coupon';
import { query } from '@/graphql/lib/client';
import { GET_ALL_COUPONS } from '@/graphql/queries/account/coupon';

export const getUserCoupons = async () => {
  const { data } = await query<{
    coupon: ICoupon[];
  }>({
    query: GET_ALL_COUPONS,
    fetchPolicy: 'no-cache',
  });

  return {
    coupons: data.coupon,
  };
};
