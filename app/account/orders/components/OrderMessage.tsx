"use client";

import { Button } from "@/components/ui/button";
import { useResponsiveDialog } from "@/contexts/DialogContext/ResponsiveDialogContext";
import { GetUserOrdersQuery } from "@/graphql/queries/account/account.generated";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import { useProgress } from "react-transition-progress";
import { startMessageForOrder } from "../actions";

const OrderMessage = ({
  tenant,
  orderTenantId,
  tenantId,
}: {
  tenant: GetUserOrdersQuery["order"][0]["tenant_orders"][0]["tenant"];
  orderTenantId: number;
  tenantId: string;
}) => {
  const [message, setMessage] = useState("");
  const nextRouter = useRouter();
  const startProgress = useProgress();
  const { closeDialog } = useResponsiveDialog();
  const sendMessage = async () => {
    startTransition(async () => {
      startProgress();
      const response = await startMessageForOrder({
        message,
        receiver_id: tenant.id,
        order_tenant_id: orderTenantId,
      });
      if (response.insert_message_one.chat_thread.order_tenant_id) {
        nextRouter.push(
          `/account/messages?oid=${response.insert_message_one.chat_thread.order_tenant_id}`,
        );
      }
      closeDialog();
    });
  };

  return (
    <div className="space-y-4">
      {/* <p className="text-sm text-gray-500">
        <strong> {tenant.tenants?.[0]?.name}</strong> satıcısına mesaj gönder
      </p> */}
      <h2 className="text-lg font-semibold">
        {tenant.tenants?.[0]?.name} satıcısına mesaj gönder
      </h2>
      <textarea
        name="review-comment"
        id="review-comment"
        rows={3}
        className="mb-2 w-full rounded-md border p-4 text-slate-500 shadow-md outline-none focus:border-transparent focus:ring-2 focus:ring-primary"
        placeholder="Mesajınızı yazın..."
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <Button
        variant="default"
        size="sm"
        className="w-full justify-center"
        onClick={sendMessage}
      >
        Mesajı Gönder
      </Button>
    </div>
  );
};

export default OrderMessage;
