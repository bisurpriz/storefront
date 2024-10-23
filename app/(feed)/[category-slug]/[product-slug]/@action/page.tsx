import ProductActions from "../../components/Detail/ProductActions";
import { FC } from "react";
import { getProductActions } from "./actions";
import ActionPageLoading from "./loading";
import { parseJson } from "@/utils/format";
import { cookies, type UnsafeUnwrappedCookies } from "next/headers";
import { IPlace } from "@/common/types/Product/product";

type Props = {
  searchParams: {
    [key: string]: string | number;
  };
};

const ProductActionsPage: FC<Props> = async (props) => {
  const searchParams = await props.searchParams;
  const productId = Number(searchParams["pid"]);

  const { product } = await getProductActions(productId);

  console.log(product, "product");

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
    product.tenant?.tenants?.[0].tenant_shipping_places?.[0].places
  ) as IPlace[];

  return (
    <ProductActions
      productId={productId}
      isFavorite={isFavorite}
      favoriteCount={favoriteCount}
      selectedLocation={selectedLocation}
      places={places}
    />
  );
};

export default ProductActionsPage;
