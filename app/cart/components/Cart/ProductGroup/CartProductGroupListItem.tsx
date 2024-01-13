import Promotions from "@/app/products/[slug]/components/Detail/Promotions";
import { ProductForCart } from "@/common/types/Cart/cart";
import AccordionItem from "@/components/Accordion/AccordionItem";
import CustomizeGroup from "@/components/Customize/CustomizeGroup";
import QuantityInput from "@/components/NumberInput";
import Popover from "@/components/Popover";
import { IMAGE_URL } from "@/contants/urls";
import useCart from "@/store/cart";
import { faker } from "@faker-js/faker";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import { IoAccessibility, IoAirplane, IoInformation } from "react-icons/io5";

const CartProductGroupListItem = (props: ProductForCart) => {
  const {
    id,
    name,
    price,
    quantity,
    product_customizable_areas: customize,
    image_url,
    discount_price,
    category,
  } = props;

  const { updateItem, removeItem } = useCart.getState();

  return (
    <li className="py-4" key={id}>
      <div className="rounded-lg px-8 py-4 border relative max-sm:px-4">
        <div className="flex items-start justify-start gap-8 mt-2 max-md:flex-col max-xl:gap-2 max-xl:flex-wrap">
          <Image
            src={`${IMAGE_URL}/${image_url}`}
            alt="image"
            className={`object-contain aspect-square w-48 h-48 max-sm:h-32 max-sm:w-32 max-sm:self-center`}
            width={500}
            height={500}
            loading="lazy"
          />
          <div className="font-mono pr-8 max-sm:flex max-md:flex-col max-sm:flex-wrap">
            <Link href={`/${category.slug}/${name}?pid=${id}`}>
              <h3
                className="text-xl font-semibold text-gray-800 uppercase w-fit"
                title={name}
              >
                {name}
              </h3>
            </Link>

            <div>
              {discount_price && (
                <h6 className="text-base font-semibold text-error-light line-through decoration-black">
                  {discount_price?.toFixed(2)} ₺
                </h6>
              )}
              <h5 className="text-xl font-bold font-sans text-primary">
                {price?.toFixed(2)} ₺
              </h5>
            </div>
            <div className="flex items-center justify-start gap-2 mt-2">
              <span className="text-base font-semibold text-gray-600">
                Adet:
              </span>
              <QuantityInput
                value={quantity}
                onChange={(e, quantity) => {
                  updateItem({ id, quantity });
                }}
                color="primary"
              />
            </div>
          </div>

          {customize?.length * quantity > 1 ? (
            <div className="flex-1 max-2xl:w-full">
              {Array(quantity)
                .fill(0)
                .map((_, i) => (
                  <AccordionItem
                    key={i}
                    title={`Ürün Özelleştirmeleri ${i + 1}`}
                    className="mt-3 block w-full border rounded-lg text-sm font-normal font-mono"
                    content={
                      <CustomizeGroup
                        key={i}
                        customize={customize}
                        productId={id}
                        index={i}
                        quantity={quantity}
                      />
                    }
                  />
                ))}
            </div>
          ) : null}

          <span className="absolute top-2 right-2 flex gap-2 items-center">
            {customize?.length > 0 ? (
              <Popover
                contentClassName="w-[300px] shadow-md border rounded-sm"
                position="top"
                content={
                  <p className="text-xs font-normal text-gray-800">
                    Bu kısımda satıcının belirlediği ürün özelleştirmeleri yer
                    alır. Örneğin ürün üzerine yazı yazdırmak istiyorsanız bu
                    kısımdan yazı yazdırabilirsiniz.
                  </p>
                }
              >
                <IoInformation className="text-gray-500 cursor-pointer transition-all duration-200 ease-in-out w-4 h-4 rounded-full border hover:bg-7 hover:text-white hover:border-7" />
              </Popover>
            ) : null}
            <AiOutlineClose
              onClick={() => {
                removeItem(id);
              }}
              className="cursor-pointer hover:text-7 transition-all duration-200 ease-in-out"
            />
          </span>
        </div>
        <div className="mt-4">
          <Promotions
            promotions={[
              {
                description: faker.commerce.productDescription(),
                icon: <IoAccessibility />,
              },
              {
                description: faker.commerce.productDescription(),
                icon: <IoAirplane />,
              },
            ]}
          />
        </div>
      </div>
    </li>
  );
};

export default CartProductGroupListItem;
