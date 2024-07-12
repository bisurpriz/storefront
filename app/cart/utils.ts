import { ProductForCart } from "@/common/types/Cart/cart";
import { OrderDetailPartialFormData } from "./components/OrderDetail/ReceiverForm";
import { calculateCommissionedAmount } from "../iyzico-payment/utils";
import { CreateOrderMutationVariables } from "@/graphql/queries/order/order.generated";

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
  const tenantGrouped = cartItems.reduce<
    {
      [key: string]: ProductForCart[];
    }[]
  >((acc, item) => {
    const tenantId = item.tenant.id;
    if (!acc[tenantId]) {
      acc[tenantId] = [];
    }
    acc[tenantId].push(item);
    return acc;
  }, {} as { [key: string]: ProductForCart[] }[]);

  const tenant_orders = Object.keys(tenantGrouped).map((key) => {
    const tenantItems: ProductForCart[] = tenantGrouped[key];
    return {
      tenant_id: key,
      order_items: {
        data: tenantItems.map((item, index) => {
          const { commission, commissionedAmount } =
            calculateCommissionedAmount(
              item.discount_price.toString(),
              item.tenant.tenants[0].commision_rate
            );
          return {
            product_id: item.id,
            quantity: item.quantity,
            amount: item.discount_price * item.quantity,
            tenant_amount: Number(commissionedAmount),
            commissioned_amount: Number(commission),
          };
        }),
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

// const getTexts = (specialInstructions) => {
//   // will return an object of texts { content: "text"}
//   if (!specialInstructions) return [];
//   const texts = Object.keys(specialInstructions)
//     .filter(
//       (key) => key.includes("text") && specialInstructions[key] !== null
//     )
//     .map((key) => ({
//       content: specialInstructions[key],
//     }));
//   return texts;
// };

// const getImages = (specialInstructions) => {
//   // will return an object of images { content: "image"}
//   if (!specialInstructions) return [];
//   const images = Object.keys(specialInstructions)
//     .filter(
//       (key) => key.includes("image") && specialInstructions[key] !== null
//     )
//     .map((key) => ({
//       image_url: specialInstructions[key],
//     }));
//   return images;
// };
