import React from "react";
import { getProductById } from "../actions";
import { IMAGE_URL } from "@/contants/urls";
import ProductImageCarousel from "./components/Detail/ProductImageCarousel";
import ProductInformation from "./components/Detail/ProductInformation";
import { Metadata, ResolvingMetadata } from "next";
import SearchLocation from "./components/Layout/SearchLocation";
import HourSelect from "@/components/DatePicker/HourSelect";
import Promotions from "./components/Detail/Promotions";
import ProductActions from "./components/Detail/ProductActions";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = Number(params.slug);

  const product = await getProductById({ id });
  const previousImages = (await parent).openGraph?.images || [];

  const imgs = product.product.image_url?.length
    ? product.product.image_url?.map((url: string) => `${IMAGE_URL}/${url}`)
    : [];

  return {
    title: product.product.name,
    openGraph: {
      images: [...previousImages, ...imgs],
    },
    description: product.product.description,
    category: product.category.name,
  };
}

const ProductDetail = async ({
  params: { slug },
}: {
  params: { slug: string | number };
}) => {
  const data = await getProductById({ id: Number(slug) });

  return (
    <div className="h-full">
      <section
        className="flex items-start justify-start max-md:flex-col gap-6"
        id="detail"
        aria-labelledby="detail"
        aria-describedby="Ürün detayları"
      >
        <div className="w-1/2 max-md:w-full">
          <ProductImageCarousel />
        </div>
        <div className="w-1/2 max-md:w-full">
          <Promotions />
          <ProductInformation
            name={data.product.name}
            price={250}
            rateCounts={{
              1: 1,
              2: 1,
              3: 1,
              4: 1,
              5: 1,
            }}
            rating={data.reviews.data}
            reviewCount={data.reviews.totalCount}
            promotion="Kargo Bedava"
            discountPrice={data.product.price}
            discountRate={10}
            key={data.product.id}
          />
          <SearchLocation className="mt-6" />
          <HourSelect className="mt-6" />
          <ProductActions />
        </div>
      </section>
      <section className="bg-12" id="reviews">
        reviews
      </section>
    </div>
  );
};

export default ProductDetail;
