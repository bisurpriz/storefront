import { getClient } from "@/graphql/lib/client";
import { CREATE_ORDER } from "@/graphql/queries/order/mutation";

export const createOrderAction = async (tenantGrouped: any, totalPrice: any) => {
  let userId = "";
  const id = "";

  if (id) {
    userId = id;
  }

  const tenant_orders = Object.keys(tenantGrouped).map((key) => {
    const tenantItems = tenantGrouped[key];
    return {
      tenant_id: key,
      order_items: {
        data: tenantItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          user_id: userId,
        })),
      },
    };
  });

  const variables = {
    user_id: userId,
    total_amount: totalPrice,
    tenant_orders: { data: tenant_orders },
  };

  console.log(variables, "variables");

  const response = await getClient().mutate({
    mutation: CREATE_ORDER,
    variables,
  });
  return response;
};
