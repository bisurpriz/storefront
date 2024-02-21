import CouponCard from '../components/CouponCard';
import { getUserCoupons } from './actions';

const CouponsPage = async () => {
  const { coupons } = await getUserCoupons()

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2">
      {coupons.map((coupon, i) => (
        <CouponCard
          key={coupon.id}
          title={coupon.tenant.nickname}
          description={coupon.description}
          endDate={coupon.end_date}
          minimumAmount={coupon.minimum_cost}
          discountAmount={coupon.amount}
        />
      ))}
    </div>
  );
};

export default CouponsPage;
