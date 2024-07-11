import Promotions from "@/app/(feed)/[category-slug]/components/Detail/Promotions";
import { ProductForCart } from "@/common/types/Cart/cart";
import AccordionItem from "@/components/Accordion/AccordionItem";
import CustomizeGroup from "@/components/Customize/CustomizeGroup";
import PriceTag from "@/components/PriceTag";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import Image from "next/image";
import Link from "next/link";
import CartProductGroupListQuantityInput from "./CartProductGroupListQuantityInput";
import ProductGroupListItemInfo from "./ProductGroupListItemInfo";
import Accesibility from "@/components/Icons/Accesibility";

const CartProductGroupListItem = (product: ProductForCart) => {
  const {
    id,
    name,
    price,
    quantity,
    product_customizable_areas: customize,
    image_url,
    discount_price,
    category,
  } = product;

  const image = getImageUrlFromPath(image_url?.[0]);

  return (
    <li className="py-4" key={id}>
      <div className="rounded-lg px-8 py-4 relative max-sm:px-4">
        <div className="flex items-start justify-start gap-8 mt-2 max-xl:gap-2 max-xs:flex-col mb-4">
          <Image
            src={image}
            alt="image"
            className={`object-contain aspect-square w-32 h-32 max-sm:h-24 max-sm:w-24 max-sm:self-center`}
            width={500}
            height={500}
          />
          <div className="flex flex-col gap-4">
            <Link
              className="text-base font-semibold text-gray-800 uppercase max-md:text-xs"
              href={`/${category.slug}/${name}?pid=${id}`}
            >
              <h3 title={name}>{name}</h3>
            </Link>
            <div className="flex flex-col gap-4">
              <PriceTag price={price} discount={discount_price} />
              <CartProductGroupListQuantityInput id={id} quantity={quantity} />
            </div>
          </div>

          <ProductGroupListItemInfo customize={customize} id={id} />
        </div>
        <Promotions
          promotions={[
            {
              description: "Kategori İndirimi",
              icon: <Accesibility />,
              filterKey: "category",
            },
          ]}
        />
        {customize?.length ? (
          <div className="flex-1 max-2xl:w-full min-w-[300px] mb-4">
            {Array(quantity)
              .fill(0)
              .map((_, i) => (
                <AccordionItem
                  key={i}
                  title={`Ürün Özelleştirmeleri ${i + 1}`}
                  className="mt-3 block w-full border rounded-lg text-sm font-normal font-mono"
                  content={
                    <CustomizeGroup key={i} index={i} product={product} />
                  }
                />
              ))}
          </div>
        ) : null}
      </div>
    </li>
  );
};

export default CartProductGroupListItem;
