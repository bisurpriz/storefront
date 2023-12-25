import { ApolloWrapper } from "@/graphql/lib/apollo-wrapper";
import Main from "./components/Main";
import { getOrderItem } from "./action";

export const dynamic = "force-dynamic";

const MessagesPage = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  const orderItemId = searchParams["oid"];
  const { order_item: orderItems = [] } = await getOrderItem(Number(orderItemId));

  const orderItem = orderItems[0];
  const tenantId = orderItem?.product.tenant.id;

  return (
    <ApolloWrapper>
      <Main tenantId={tenantId} />
    </ApolloWrapper>
  );
};

export default MessagesPage;
