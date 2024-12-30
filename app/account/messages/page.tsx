import { getTenantOrderItem } from "./action";
import AdvancedChatScreen from "./components/Chatv2";
import Listener from "./components/Listener";

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
      <AdvancedChatScreen />
      <Listener />
    </>
  );
};

export default MessagesPage;
