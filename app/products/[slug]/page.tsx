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
import PaymentMethods from "./components/Detail/PaymentMethods";
import { CustomizableAreaType } from "@/common/enums/Order/product";

type Props = {
  params: { slug: string };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = Number(params.slug);

  const { product } = await getProductById({ id });
  const previousImages = (await parent).openGraph?.images || [];
  const imgs = product.image_url?.length
    ? product.image_url?.map((url: string) => `${IMAGE_URL}/${url}`)
    : [];

  return {
    title: product.name,
    openGraph: {
      images: [...previousImages, ...imgs],
    },
    description: product.description,
    category: product.category?.name,
  };
}

const ProductDetail = async ({
  params: { slug },
}: {
  params: { slug: string | number };
}) => {
  const { product } = await getProductById({
    id: Number(slug),
  });

  const isFavoriteForCurrentUser = product.user_favorites.length > 0;

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
            images={product.image_url?.map((url: string, index) => ({
              id: index,
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
                filterKey: "SAME_DAY",
              },
              {
                description:
                  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores quisquam commodi nulla provident ea dolore asperiores minima quae, perspiciatis est.",
                icon: <HiOutlineArchive />,
                filterKey: "SAME_DAY",
              },
            ]}
          />
          <ProductInformation
            name={product.name}
            price={250}
            rateCounts={{
              1: 1,
              2: 1,
              3: 1,
              4: 1,
              5: 1,
            }}
            rating={
              product.reviews.reduce((acc, review) => acc + review.score, 0) /
              product.reviews_aggregate.aggregate.count
            }
            reviewCount={product.reviews_aggregate.aggregate.count}
            promotion="Kargo Bedava"
            discountPrice={product.price}
            discountRate={10}
            key={product.id}
            vendor={product.tenant.tenants?.[0]}
          />
          <SearchLocation className="mt-6" />
          <HourSelect className="mt-6" />
          <ProductActions
            product={{
              category: product.category,
              discount_price: product.price,
              id: product.id,
              image_url: product.image_url?.[0],
              name: product.name,
              price: product.price,
              product_customizable_areas:
                product.product_customizable_areas.map((it) => ({
                  count: it.customizable_area.count,
                  customizable_area: {
                    id: it.customizable_area.id,
                    type: it.customizable_area.type as
                      | CustomizableAreaType.IMAGE
                      | CustomizableAreaType.TEXT,
                  },
                })),
              quantity: 1,
              tenant: product.tenant,
            }}
            favorite={{
              id: product.user_favorites[0]?.id ?? null,
              isFavorite: isFavoriteForCurrentUser ?? false,
            }}
          />
        </div>
      </section>

      <section className="mt-6" id="reviews">
        <ProductDescription
          description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis, cumque. Facere quae nulla quo libero dolorem inventore! Numquam voluptate magni incidunt earum nobis molestiae ducimus aspernatur sapiente deleniti ratione, enim architecto reiciendis repellendus voluptatibus sunt harum, dolore beatae illum alias, error a. Enim iste sequi atque cumque nihil dicta ducimus fugiat voluptatum accusamus odio quisquam, quasi cum voluptates optio consequatur esse molestiae veritatis expedita numquam eveniet dolores tempore. Saepe dolores aspernatur fugit, tempora eius, quidem assumenda, dolor eum facere esse ducimus cupiditate obcaecati illo autem! Quae ex est dignissimos earum, corporis dolorem repellendus laboriosam aut officiis aspernatur corrupti laborum! Temporibus."
          notes={Array.from({ length: 5 }).map(
            (_, index) =>
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem."
          )}
          specifications={product.properties}
        />
      </section>
      <section
        className="mt-6"
        id="payment-methods"
        aria-labelledby="payment-methods"
        aria-describedby="Ödeme yöntemleri"
      >
        <PaymentMethods />
      </section>
      <section
        className="mt-6"
        id="comments"
        aria-labelledby="comments"
        aria-describedby="Ürün yorumları"
      >
        <ProductComments
          comments={Array.from({ length: 5 }).map((_, index) => ({
            comment:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
            createdAt: "2021-08-10T12:00:00.000Z",
            firstName: "John",
            lastName: "Doe",
            user_id: index,
            rate: 5,
            user_image_url: "https://picsum.photos/200/300",
            comment_id: index,
            email: "john@doe.com",
          }))}
        />
      </section>
    </div>
  );
};

export default ProductDetail;
