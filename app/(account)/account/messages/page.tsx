import { getTenantOrderItem } from "./action";

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
      {/* <AdvancedChatScreen />
      <Listener /> */}
      <div className="flex h-full w-full items-center justify-center">
        Satıcı mesaj sayfamız yapım aşamasındadır.
      </div>
    </>
  );
};

export default MessagesPage;
