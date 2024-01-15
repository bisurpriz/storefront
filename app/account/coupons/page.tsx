import CouponCard from "../components/CouponCard";
import { getUserCoupons } from "./actions";

const CouponsPage = async () => {
  const { coupons } = (await getUserCoupons()) || { coupons: null };

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2">
      {coupons.map((item, i) => (
        <CouponCard
          key={item.id}
          title={item.product.tenant.nickname}
          description={item.product.name}
          endDate={item.end_date}
          minimumAmount={item.minimum_cost}
          discountAmount={item.amount}
        />
      ))}
    </div>
  );
};

export default CouponsPage;
