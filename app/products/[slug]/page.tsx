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
import { HiOutlineArchive, HiOutlineTicket } from "react-icons/hi";
import ProductDescription from "./components/Detail/ProductDescription";
import ProductComments from "./components/Detail/ProductComments";
import { faker } from "@faker-js/faker";
import PaymentMethods from "./components/Detail/PaymentMethods";

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
  console.log(data);
  return (
    <div className="h-full">
      <section
        className="flex items-start justify-start max-md:flex-col gap-6"
        id="detail"
        aria-labelledby="detail"
        aria-describedby="Ürün detayları"
      >
        <div className="w-1/2 max-md:w-full">
          <ProductImageCarousel
            images={data.product.image_url?.map((url: string) => ({
              id: url,
              url: `${IMAGE_URL}/${url}`,
            }))}
          />
        </div>
        <div className="w-1/2 max-md:w-full">
          <Promotions
            promotions={[
              {
                description:
                  "Promosyon mesajları bu kısımda görünecek, bold kısımlar strong olacak ve HTML olarak serverdan gelecek.",
                icon: <HiOutlineTicket />,
              },
              {
                description:
                  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores quisquam commodi nulla provident ea dolore asperiores minima quae, perspiciatis est.",
                icon: <HiOutlineArchive />,
              },
            ]}
          />
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
      <section
        className="mt-6"
        id="payment-methods"
        aria-labelledby="payment-methods"
        aria-describedby="Ödeme yöntemleri"
      >
        <PaymentMethods />
      </section>
      <section className="mt-6" id="reviews">
        <ProductDescription
          title="Ürün Detayları"
          description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis, cumque. Facere quae nulla quo libero dolorem inventore! Numquam voluptate magni incidunt earum nobis molestiae ducimus aspernatur sapiente deleniti ratione, enim architecto reiciendis repellendus voluptatibus sunt harum, dolore beatae illum alias, error a. Enim iste sequi atque cumque nihil dicta ducimus fugiat voluptatum accusamus odio quisquam, quasi cum voluptates optio consequatur esse molestiae veritatis expedita numquam eveniet dolores tempore. Saepe dolores aspernatur fugit, tempora eius, quidem assumenda, dolor eum facere esse ducimus cupiditate obcaecati illo autem! Quae ex est dignissimos earum, corporis dolorem repellendus laboriosam aut officiis aspernatur corrupti laborum! Temporibus."
          notes={Array.from({ length: 5 }).map((_, index) =>
            faker.commerce.productDescription()
          )}
          specifications={Array.from({ length: 5 }).map((_, index) => ({
            name: faker.commerce.productName(),
            value: faker.commerce.product(),
          }))}
        />
      </section>
      <section
        className="mt-6"
        id="comments"
        aria-labelledby="comments"
        aria-describedby="Ürün yorumları"
      >
        <ProductComments
          comments={Array.from({ length: 5 }).map((_, index) => ({
            comment: faker.lorem.paragraph(),
            createdAt: faker.date.past().toISOString(),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            user_id: index,
            rate: faker.number.int({
              min: 1,
              max: 5,
            }),
            user_image_url: faker.image.avatar(),
            comment_id: index,
            email: faker.internet.email(),
          }))}
        />
      </section>
    </div>
  );
};

export default ProductDetail;
