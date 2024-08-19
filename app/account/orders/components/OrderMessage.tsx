"use client";

import Button from "@/components/Button";
import Link from "next/link";
import { useState } from "react";
import { startMessageForOrder } from "../actions";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/FramerModal/Modal";
import Chat from "@/components/Icons/Chat";
import { GetUserOrdersQuery } from "@/graphql/queries/account/account.generated";

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

  const sendMessage = async () => {
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
  };

  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        size="small"
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
        <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-md mx-auto flex flex-col gap-4">
          <span>
            <Link
              href={`/vendor/${tenant.tenants?.[0]?.id}`}
              aria-label="Satıcıya git"
              className="text-sm text-secondary"
            >
              {tenant.tenants?.[0]?.name}
            </Link>
            <span className="text-sm text-gray-500">
              {" "}
              satıcısı ile iletişime geçin
            </span>{" "}
          </span>
          <div className="font-mono">
            <div className="flex items-start gap-4 border-b pb-4">
              <textarea
                name="review-comment"
                id="review-comment"
                rows={3}
                className="w-full p-4 border rounded-md shadow-md text-slate-500 outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent mb-2"
                placeholder="Mesajınızı yazın..."
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
            </div>
            <Button
              label="Mesajı Gönder"
              color="primary"
              size="small"
              className="w-full justify-center"
              onClick={sendMessage}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default OrderMessage;
