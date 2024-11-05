"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/components/Link";
import { useState, startTransition } from "react";
import { startMessageForOrder } from "../actions";
import { useRouter } from "next/navigation";
import Chat from "@/components/Icons/Chat";
import { GetUserOrdersQuery } from "@/graphql/queries/account/account.generated";
import { useProgress } from "react-transition-progress";
import Modal from "@/components/Modal";

const OrderMessage = ({
  tenant,
  orderTenantId,
  tenantId,
}: {
  tenant: GetUserOrdersQuery["order"][0]["tenant_orders"][0]["tenant"];
  orderTenantId: number;
  tenantId: string;
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const nextRouter = useRouter();
  const startProgress = useProgress();
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
          `/account/messages?oid=${response.insert_message_one.chat_thread.order_tenant_id}`
        );
      }
      setOpen(false);
    });
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          setOpen(true);
        }}
        icon={<Chat className="text-base" />}
      />

      <Modal
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            <strong> {tenant.tenants?.[0]?.name}</strong> satıcısına mesaj
            gönder
          </p>
          <textarea
            name="review-comment"
            id="review-comment"
            rows={3}
            className="w-full p-4 border rounded-md shadow-md text-slate-500 outline-none focus:ring-2 focus:ring-primary focus:border-transparent mb-2"
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
      </Modal>
    </>
  );
};

export default OrderMessage;
