"use client";

import { User } from "@/common/types/User/user";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Link from "next/link";
import { useState } from "react";
import { GrChatOption } from "react-icons/gr";
import { startMessageForOrder } from "../actions";
import { useRouter } from "next/navigation";

const OrderMessage = ({
  tenant,
  orderTenantId,
}: {
  tenant: User;
  orderTenantId: number;
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

      nextRouter.push(`/account/messages?oid=${response.insert_message_one.chat_thread.order_tenant_id}`);
    }
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        onClick={() => {
          setOpen(true);
        }}
        icon={<GrChatOption size={16} />}
      />

      <Modal
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
        title={
          <span>
            <Link
              href={`/vendor/${tenant.id}`}
              aria-label="Satıcıya git"
              className="text-sm text-secondary"
            >
              {tenant.nickname}
            </Link>
            <span className="text-sm text-gray-500">
              {" "}
              satıcısı ile iletişime geçin
            </span>{" "}
          </span>
        }
      >
        <div className="p-8 pt-4 font-mono">
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
            variant="fullfilled"
            color="primary"
            size="small"
            className="w-full justify-center"
            onClick={sendMessage}
          />
        </div>
      </Modal>
    </>
  );
};

export default OrderMessage;
