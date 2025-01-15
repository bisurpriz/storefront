import CouponCard from "../components/CouponCard";
import { getUserCoupons } from "./actions";

const CouponsPage = async () => {
  const { coupons } = await getUserCoupons();
  return (
    <div className="container mx-auto">
      <h1 className="mb-1 text-xl font-bold sm:mb-2 sm:text-3xl">Kuponlarım</h1>
      <p className="mb-3 text-xs text-muted-foreground sm:mb-6 sm:text-sm">
        Mevcut kuponlarınızı burada görebilirsiniz.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2">
        {coupons.map((coupon) => (
          <CouponCard
            key={coupon?.id}
            title={coupon?.tenant.tenants?.[0]?.name}
            description={coupon?.description}
            endDate={coupon?.end_date}
            minimumAmount={coupon?.minimum_cost}
            discountAmount={coupon?.amount}
            couponCode={coupon?.code}
            leftLimit={coupon?.left_limit}
            limit={coupon?.limit}
            tenant={coupon?.tenant.tenants?.[0]}
          />
        ))}
        {!coupons.length && (
          <p className="text-start text-lg text-gray-500">
            Şu anda kuponunuz bulunmamaktadır.
          </p>
        )}
      </div>
    </div>
  );
};

export default CouponsPage;
