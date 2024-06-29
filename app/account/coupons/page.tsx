import clsx from "clsx";
import CouponCard from "../components/CouponCard";
import { getUserCoupons } from "./actions";

const CouponsPage = async () => {
  const { coupons } = await getUserCoupons();
  return (
    <div>
      <h1
        className={clsx(
          "text-2xl",
          "text-slate-900",
          "mb-4",
          "max-sm:text-xl",
          "max-sm:mb-2"
        )}
      >
        Kuponlarım ({coupons.length})
      </h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2">
        {coupons.map((coupon, i) => (
          <CouponCard
            key={coupon?.id}
            title={coupon?.tenant.tenants?.[0]?.name}
            description={coupon?.description}
            endDate={coupon?.end_date}
            minimumAmount={coupon?.minimum_cost}
            discountAmount={coupon?.amount}
          />
        ))}
        {!coupons.length && (
          <p className="text-start text-gray-500 text-lg">
            Şu anda kuponunuz bulunmamaktadır.
          </p>
        )}
      </div>
    </div>
  );
};

export default CouponsPage;
