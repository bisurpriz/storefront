import ProductActions from "../../components/Detail/ProductActions";
import { FC } from "react";
import { getProductActions } from "./actions";
import ActionPageLoading from "./loading";
import { parseJson } from "@/utils/format";
import { cookies } from "next/headers";
import { IPlace } from "@/common/types/Product/product";
import { WithContext, Place } from "schema-dts";

const ProductActionsPage = async (props) => {
  const searchParams = await props.searchParams;
  const productId = Number(searchParams["pid"]);

  const { product } = await getProductActions(productId);

  if (!product.user_favorites || !product.user_favorites_aggregate) {
    return <ActionPageLoading />;
  }

  const isFavorite = product?.user_favorites?.some(
    (fav) => fav.product_id === productId
  );
  const favoriteCount = product.user_favorites_aggregate.aggregate.count;

  const handleCookie = async () => {
    const { get } = await cookies();
    try {
      const locationCookie = get("location_id")?.value
        ? parseJson(get("location_id")?.value)
        : null;
      return locationCookie;
    } catch (error) {
      console.error("Error while parsing location cookie", error);
      return null;
    }
  };

  const selectedLocation = (await handleCookie()) as IPlace;
  const places = parseJson(
    product.tenant?.tenants?.[0].tenant_shipping_places?.[0]?.places
  ) as IPlace[];

  const placesData = parseJson(
    product.tenant?.tenants[0]?.tenant_shipping_places[0]?.places
  );

  const shippingPlaces: WithContext<Place>[] = placesData?.map((place) => ({
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
      />
      {placesData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(shippingPlaces) }}
        />
      )}
    </>
  );
};

export default ProductActionsPage;
