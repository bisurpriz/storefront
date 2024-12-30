"use client";

import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useResponsiveDialog } from "@/contexts/DialogContext/ResponsiveDialogContext";
import { GetUserOrdersQuery } from "@/graphql/queries/account/account.generated";
import { MessageSquare, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState, useTransition } from "react";
import { useProgress } from "react-transition-progress";
import { startMessageForOrder } from "../actions";

interface OrderMessageProps {
  tenant: GetUserOrdersQuery["order"][0]["tenant_orders"][0]["tenant"];
  orderTenantId: number;
  tenantId: string;
}

const MIN_MESSAGE_LENGTH = 1;
const MAX_MESSAGE_LENGTH = 1000;

export default function OrderMessage({ tenant, orderTenantId }: OrderMessageProps) {
  const [message, setMessage] = useState("");
  const [isPending, startMessageTransition] = useTransition();
  const nextRouter = useRouter();
  const startProgress = useProgress();
  const { closeDialog } = useResponsiveDialog();

  // Memoize tenant name to prevent unnecessary re-renders
  const tenantName = useMemo(() => tenant.tenants?.[0]?.name, [tenant.tenants]);

  // Memoize message validation
  const isMessageValid = useMemo(() => {
    const trimmedLength = message.trim().length;
    return trimmedLength >= MIN_MESSAGE_LENGTH && trimmedLength <= MAX_MESSAGE_LENGTH;
  }, [message]);

  const handleMessageChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_MESSAGE_LENGTH) {
      setMessage(value);
    }
  }, []);

  const handleSendMessage = useCallback(async () => {
    if (!isMessageValid) return;

    startMessageTransition(async () => {
      try {
        startProgress();
        const response = await startMessageForOrder({
          message: message.trim(),
          receiver_id: tenant.id,
          order_tenant_id: orderTenantId,
        });

        if (response.insert_message_one.chat_thread.order_tenant_id) {
          nextRouter.push(
            `/account/messages?oid=${response.insert_message_one.chat_thread.order_tenant_id}`,
          );
          closeDialog();
        }
      } catch (error) {
        console.error('Message sending failed:', error);
        // Here you might want to show an error toast or message
      }
    });
  }, [message, tenant.id, orderTenantId, startProgress, nextRouter, closeDialog, isMessageValid]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  const remainingChars = useMemo(() => 
    MAX_MESSAGE_LENGTH - message.length
  , [message.length]);

  return (
    <div className="flex max-h-[80vh] flex-col p-1 sm:p-2">
      <DialogHeader className="space-y-2 pb-4 px-3 sm:px-2">
        <DialogTitle className="flex items-center gap-2 text-xl">
          <MessageSquare className="h-5 w-5" />
          Satıcıya Mesaj Gönder
        </DialogTitle>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{tenantName}</span> ile iletişime geçin
        </p>
      </DialogHeader>

      <div className="flex flex-1 flex-col gap-4 px-3 sm:px-2 pb-4">
        <div className="relative flex-1">
          <textarea
            name="message"
            id="message"
            rows={4}
            className="min-h-[140px] sm:min-h-[120px] w-full resize-none rounded-lg border bg-background p-4 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary disabled:opacity-70"
            placeholder="Mesajınızı yazın..."
            value={message}
            onChange={handleMessageChange}
            onKeyDown={handleKeyDown}
            disabled={isPending}
            aria-label="Mesaj içeriği"
            maxLength={MAX_MESSAGE_LENGTH}
          />
          <div className="absolute bottom-3 right-3 flex items-center gap-2 text-xs">
            <span className="text-muted-foreground/80">
              {remainingChars} karakter kaldı
            </span>
            <div className="bg-background/80 px-1.5 py-0.5 rounded text-muted-foreground/80">
              Enter tuşu ile gönder
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={closeDialog}
            className="h-9"
            disabled={isPending}
          >
            İptal
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={handleSendMessage}
            disabled={!isMessageValid || isPending}
            className="h-9 min-w-[100px]"
          >
            <Send className={`mr-2 h-4 w-4 ${isPending ? 'animate-pulse' : ''}`} />
            {isPending ? 'Gönderiliyor...' : 'Gönder'}
          </Button>
        </div>
      </div>
    </div>
  );
}
