import React from "react";
import { getProductById } from "../actions";
import { IMAGE_URL } from "@/contants/urls";
import ProductImageCarousel from "./components/Detail/ProductImageCarousel";
import ProductInformation from "./components/Detail/ProductInformation";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = Number(params.slug);

  // fetch data
  const product = await getProductById({ id });
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product.product.name,
    openGraph: {
      images: [
        ...previousImages,
        ...product.product.image_url.map(
          (url: string) => `${IMAGE_URL}/${url}`
        ),
      ],
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
      <div className="flex items-start justify-start max-md:flex-col gap-6">
        <div className="w-1/2 max-md:w-full">
          <ProductImageCarousel />
        </div>
        <div className="w-1/2 max-md:w-full">
          <ProductInformation />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
