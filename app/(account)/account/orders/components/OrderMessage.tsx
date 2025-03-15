"use client";

import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useResponsiveDialog } from "@/contexts/DialogContext/ResponsiveDialogContext";
import { GetUserOrdersQuery } from "@/graphql/queries/account/account.generated";
import { MessageSquare, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { startMessageForOrder } from "../actions";

interface OrderMessageProps {
  tenant: GetUserOrdersQuery["order"][0]["tenant_orders"][0]["tenant"];
  orderTenantId: number;
  tenantId: string;
}

const MIN_MESSAGE_LENGTH = 1;
const MAX_MESSAGE_LENGTH = 1000;

// Form submit button with automatic pending state
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="default"
      size="sm"
      disabled={pending}
      className="h-9 min-w-[100px]"
    >
      <Send className={`mr-2 h-4 w-4 ${pending ? "animate-pulse" : ""}`} />
      {pending ? "Gönderiliyor..." : "Gönder"}
    </Button>
  );
}

export default function OrderMessage({
  tenant,
  orderTenantId,
}: OrderMessageProps) {
  const router = useRouter();
  const { closeDialog } = useResponsiveDialog();

  // Define our action with useActionState
  const [error, formAction] = useActionState(async (prevState, formData) => {
    try {
      const message = formData.get("message") as string;

      if (
        !message ||
        message.trim().length < MIN_MESSAGE_LENGTH ||
        message.trim().length > MAX_MESSAGE_LENGTH
      ) {
        return "Mesaj uzunluğu geçersiz";
      }

      const response = await startMessageForOrder({
        message: message.trim(),
        receiver_id: tenant.id,
        order_tenant_id: orderTenantId,
      });

      if (response.insert_message_one.chat_thread.order_tenant_id) {
        router.push(
          `/account/messages?oid=${response.insert_message_one.chat_thread.order_tenant_id}`,
        );
        closeDialog();
      }
      return null;
    } catch (error) {
      console.error("Message sending failed:", error);
      return "Mesaj gönderilirken bir hata oluştu";
    }
  }, null);

  const tenantName = tenant.tenants?.[0]?.name;

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const form = e.currentTarget.form;
      if (form) form.requestSubmit();
    }
  }

  return (
    <div className="flex max-h-[80vh] flex-col p-1 sm:p-2">
      <DialogHeader className="px-3 pb-4 space-y-2 sm:px-2">
        <DialogTitle className="flex items-center gap-2 text-xl">
          <MessageSquare className="w-5 h-5" />
          Satıcıya Mesaj Gönder
        </DialogTitle>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{tenantName}</span> ile
          iletişime geçin
        </p>
      </DialogHeader>

      <form
        action={formAction}
        className="flex flex-col flex-1 gap-4 px-3 pb-4 sm:px-2"
      >
        {error && <div className="px-1 text-sm text-destructive">{error}</div>}

        <div className="relative flex-1">
          <textarea
            name="message"
            id="message"
            rows={4}
            className="min-h-[140px] w-full resize-none rounded-lg border bg-background p-4 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary disabled:opacity-70 sm:min-h-[120px]"
            placeholder="Mesajınızı yazın..."
            onKeyDown={handleKeyDown}
            aria-label="Mesaj içeriği"
            maxLength={MAX_MESSAGE_LENGTH}
          />
          <div className="absolute flex items-center gap-2 text-xs bottom-3 right-3">
            <div className="rounded bg-background/80 px-1.5 py-0.5 text-muted-foreground/80">
              Enter tuşu ile gönder
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={closeDialog}
            className="h-9"
          >
            İptal
          </Button>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
