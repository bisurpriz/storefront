import { ProductForCart } from "@/common/types/Cart/cart";
import { CreateOrderMutationVariables } from "@/graphql/generated";
import { FaCartPlus } from "react-icons/fa";
import { IoInformationCircle } from "react-icons/io5";
import { MdOutlineConfirmationNumber, MdPayments } from "react-icons/md";
import { OrderDetailPartialFormData } from "./components/OrderDetail/ReceiverForm";

export enum CartStepPaths {
  CART = "/cart",
  ORDER_DETAIL = "/cart/order-detail",
  CHECKOUT = "/cart/checkout",
  COMPLETE = "/cart/complete",
}

export const cartStepperPaths = [
  {
    path: CartStepPaths.CART,
    label: "Sepet",
    icon: <FaCartPlus />,
  },
  {
    path: CartStepPaths.ORDER_DETAIL,
    label: "Teslimat Bilgileri",
    icon: <IoInformationCircle />,
  },
  {
    path: CartStepPaths.CHECKOUT,
    label: "Ödeme",
    icon: <MdPayments />,
  },
  {
    path: CartStepPaths.COMPLETE,
    label: "Onay",
    icon: <MdOutlineConfirmationNumber />,
  },
];

const getOrderAddresses = (
  orderDetail: OrderDetailPartialFormData
): CreateOrderMutationVariables["object"]["order_addresses"] => {
  const {
    address,
    address_title,
    city,
    district,
    quarter,
    receiver_name,
    receiver_phone,
  } = orderDetail;

  const getReceiverFirstLastName = (receiver_name: string) => {
    const receiver = receiver_name.split(" ");

    const receiver_surname = receiver.pop();

    const receiver_firstname = receiver.join(" ");

    return {
      receiver_firstname,
      receiver_surname,
    };
  };

  const { receiver_firstname, receiver_surname } =
    getReceiverFirstLastName(receiver_name);

  const order_addresses = [
    {
      address,
      address_title,
      city_id: city.id,
      district_id: district.id,
      quarter_id: quarter.id,
      receiver_firstname,
      receiver_surname,
      receiver_phone,
    },
  ];

  return {
    data: order_addresses,
  };
};

const getTenantOrders = (
  cartItems: ProductForCart[]
): CreateOrderMutationVariables["object"]["tenant_orders"] => {
  const tenantGrouped = cartItems.reduce((acc, item) => {
    // owner id from user table
    const tenantId = item.tenant.id;
    if (!acc[tenantId]) {
      acc[tenantId] = [];
    }
    acc[tenantId].push(item);
    return acc;
  }, {});
  const getTexts = (specialInstructions) => {
    // will return an object of texts { content: "text"}
    if (!specialInstructions) return [];
    const texts = Object.keys(specialInstructions)
      .filter(
        (key) => key.includes("text") && specialInstructions[key] !== null
      )
      .map((key) => ({
        content: specialInstructions[key],
      }));

    return texts;
  };

  const getImages = (specialInstructions) => {
    // will return an object of images { content: "image"}
    if (!specialInstructions) return [];
    const images = Object.keys(specialInstructions)
      .filter(
        (key) => key.includes("image") && specialInstructions[key] !== null
      )
      .map((key) => ({
        image_url: specialInstructions[key],
      }));
    return images;
  };

  const tenant_orders = Object.keys(tenantGrouped).map((key) => {
    const tenantItems = tenantGrouped[key];
    return {
      tenant_id: key,
      order_items: {
        data: tenantItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          order_item_special_texts: {
            data: item.specialInstructions
              ? item.specialInstructions.flatMap((instruction) =>
                  getTexts(instruction)
                )
              : [],
          },
          order_item_special_images: {
            data: item.specialInstructions
              ? item.specialInstructions.flatMap((instruction) =>
                  getImages(instruction)
                )
              : [],
          },
        })),
      },
    };
  });

  return {
    data: tenant_orders,
  };
};

export const createOrderDataMapper = (
  cartItems: ProductForCart[],
  orderDetail: OrderDetailPartialFormData
): CreateOrderMutationVariables => {
  // TODO: delivery_date, delivery_time should be added to orderDetail
  const order_addresses = getOrderAddresses(orderDetail);
  const tenant_orders = getTenantOrders(cartItems);

  return {
    object: {
      order_addresses,
      tenant_orders,
    },
  };
};
