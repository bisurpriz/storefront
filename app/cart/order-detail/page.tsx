import { getBrandWithTitle } from "@/utils/getBrandWithTitle";
import ReceiverForm from "../components/OrderDetail/ReceiverForm";
import { getCities } from "@/app/account/actions";
import { getAvailableLocation } from "@/app/account/addresses/actions";
import { getLocationFromCookie } from "@/app/actions";
import { CityResponse } from "@/common/types/Addresses/addresses";

export const dynamic = "force-dynamic";

export const generateMetadata = async () => {
  return {
    title: getBrandWithTitle("Sipariş Detayı"),
    description: "Sipariş detayı sayfası",
  };
};

const OrderDetail = async () => {
  const { cities } = await getCities();
  const location = await getLocationFromCookie();
  const locationData = await getAvailableLocation(location);

  const data = locationData?.data;

  return (
    <div className="w-full relative">
      <section
        aria-labelledby="order-detail"
        aria-describedby="order-detail-description"
        aria-label="Sipariş Detayı"
      >
        <ReceiverForm
          cities={cities}
          defaultCity={data?.city as CityResponse}
          defaultDistrict={data?.district}
          defaultQuarter={data?.quarter}
        />
      </section>
    </div>
  );
};

export default OrderDetail;
