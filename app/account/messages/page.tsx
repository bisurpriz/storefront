import { ApolloWrapper } from "@/graphql/lib/apollo-wrapper";
import Main from "./components/Main";
import { getTenantOrderItem } from "./action";

export const dynamic = "force-dynamic";

const MessagesPage = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  const orderTenantId = searchParams["oid"];
  const { order_tenant: orderTenants = [] } = await getTenantOrderItem(Number(orderTenantId));

  const orderItem = orderTenants[0];
  const tenantId = orderItem?.tenant?.id;

  return (
    <ApolloWrapper>
      <Main tenantId={tenantId} />
    </ApolloWrapper>
  );
};

export default MessagesPage;
