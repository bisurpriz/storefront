import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import CouponCard from "../components/CouponCard";
import { getUserCoupons } from "./actions";

const CouponsPage = async () => {
  const { coupons } = (await getUserCoupons()) || { coupons: null };

  return coupons.length ? (
    <div className='grid gap-4 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2'>
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
  ) : (
    <div className='w-full flex items-center justify-center'>
      <span className='inline-flex items-center justify-center p-4 text-lg font-normal leading-none text-red-100 bg-7 rounded-full'>
        Tanımlı kuponunuz bulunmamaktadır.
      </span>
    </div>
  );
};

export default withPageAuthRequired(CouponsPage);
