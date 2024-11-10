import { getTenantOrderItem } from "./action";
import Listener from "./components/Listener";
import Main from "./components/Main";

const MessagesPage = async (props: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const orderTenantId = searchParams["oid"];
  const { order_tenant: orderTenants = [] } = await getTenantOrderItem(
    Number(orderTenantId ?? 0),
  );

  const orderItem = orderTenants?.[0];
  const tenantId = orderItem?.tenant?.id;

  return (
    <>
      <Main tenantId={tenantId} />
      <Listener />
    </>
  );
};

export default MessagesPage;
