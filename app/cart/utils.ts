import { ProductForCart } from "@/common/types/Cart/cart";
import { calculateCommissionedAmount } from "../iyzico-payment/utils";
import { CreateOrderMutationVariables } from "@/graphql/queries/order/order.generated";
import { OrderDetailFormData } from "./components/OrderDetail/ReceiverForm";

const getOrderAddresses = (
  orderDetail: OrderDetailFormData,
  cartItems: ProductForCart[],
): CreateOrderMutationVariables["object"]["order_addresses"] => {
  const {
    receiver_address,
    receiver_city,
    receiver_district,
    receiver_name,
    receiver_phone,
    receiver_neighborhood,
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
      address: receiver_address,
      city: receiver_city.value,
      district: receiver_district.value,
      quarter: receiver_neighborhood.value,
      receiver_firstname,
      receiver_surname,
      receiver_phone,
      place_id:
        cartItems.find((i) => i.deliveryLocation.placeId)?.deliveryLocation
          ?.placeId ?? null,
    },
  ];

  return {
    data: order_addresses,
  };
};

const getTenantOrders = (
  cartItems: ProductForCart[],
): CreateOrderMutationVariables["object"]["tenant_orders"] => {
  const tenantGrouped = cartItems.reduce<
    {
      [key: string]: ProductForCart[];
    }[]
  >(
    (acc, item) => {
      const tenantId = item.tenant.id;
      if (!acc[tenantId]) {
        acc[tenantId] = [];
      }
      acc[tenantId].push(item);
      return acc;
    },
    {} as { [key: string]: ProductForCart[] }[],
  );

  const tenant_orders = Object.keys(tenantGrouped).map((key) => {
    const tenantItems: ProductForCart[] = tenantGrouped[key];
    return {
      tenant_id: key,
      order_items: {
        data: tenantItems.map((item, index) => {
          const { commission, commissionedAmount } =
            calculateCommissionedAmount(
              item.discount_price.toString(),
              item.tenant.tenants[0].commision_rate,
            );
          return {
            product_id: item.id,
            quantity: item.quantity,
            amount: item.discount_price * item.quantity,
            tenant_amount: Number(commissionedAmount),
            commissioned_amount: Number(commission),
            delivery_date: item.deliveryDate,
            delivery_time: item.deliveryTime,
            card_note: item.card_note,
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
  orderDetail: OrderDetailFormData,
): CreateOrderMutationVariables => {
  const order_addresses = getOrderAddresses(orderDetail, cartItems);
  const tenant_orders = getTenantOrders(cartItems);

  return {
    object: {
      order_addresses,
      tenant_orders,
    },
  };
};
