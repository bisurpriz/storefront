import { CookieTokens } from "@/app/@auth/contants";
import { IPlace } from "@/common/types/Product/product";
import { parseJson } from "@/utils/format";
import { cookies } from "next/headers";
import { Place, WithContext } from "schema-dts";
import ProductActions from "../../components/Detail/ProductActions";
import { getProductActions } from "./actions";
import ActionPageLoading from "./loading";

const ProductActionsPage = async (props) => {
  const searchParams = await props.searchParams;
  const productId = Number(searchParams["pid"]);

  if (!productId) {
    return null;
  }

  const { product } = await getProductActions(productId);
  if (!product.user_favorites || !product.user_favorites_aggregate) {
    return <ActionPageLoading />;
  }

  const isFavorite = product?.user_favorites?.some(
    (fav) => fav.product_id === productId,
  );
  const favoriteCount = product.user_favorites_aggregate.aggregate.count;

  const handleCookie = async () => {
    const { get } = await cookies();
    try {
      const locationCookie = get(CookieTokens.LOCATION_ID)?.value
        ? parseJson(get(CookieTokens.LOCATION_ID)?.value)
        : null;
      return locationCookie;
    } catch (error) {
      console.error("Error while parsing location cookie", error);
      return null;
    }
  };
  const selectedLocation = (await handleCookie()) as IPlace;
  const places = parseJson(
    product.tenant?.tenants?.[0].tenant_shipping_places?.[0]?.places,
  );

  const shippingPlaces: WithContext<Place>[] = places?.map((place) => ({
    "@context": "https://schema.org",
    "@type": "Place",
    name: place.label,
    geo: {
      "@type": "GeoCoordinates",
      latitude: place.lat,
      longitude: place.lng,
    },
    identifier: place.placeId,
    additionalProperty: {
      "@type": "PropertyValue",
      propertyID: "viewport",
      value: place.viewport,
    },
  }));

  return (
    <>
      <ProductActions
        productId={productId}
        isFavorite={isFavorite}
        favoriteCount={favoriteCount}
        selectedLocation={selectedLocation}
        places={places}
        delivery_type={product.delivery_type}
        delivery_time_ranges={product.delivery_time_ranges}
      />
      {places && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(shippingPlaces) }}
        />
      )}
    </>
  );
};

export default ProductActionsPage;
