import PhoneInput from "@/components/PhoneInput";
import TextField from "@/components/TextField";
import { Mail, Phone, User } from "lucide-react";
import { Controller } from "react-hook-form";
import { SenderStepProps } from "../types";
import { InvoiceDetails } from "./InvoiceDetails";
import { InvoiceTypeSelector } from "./InvoiceTypeSelector";

export function SenderInfoStep(props: SenderStepProps) {
  const { control } = props;

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <Controller
          name="sender_name"
          control={control}
          render={({ field, fieldState: { error, isDirty } }) => (
            <TextField
              className="h-12 rounded-sm"
              {...field}
              error={!!error?.message}
              errorMessage={error?.message}
              label="Ad Soyad"
              id="sender_name"
              placeholder="Lütfen adınızı ve soyadınızı giriniz"
              icon={<User className="h-4 w-4" />}
              dirtyAnimation={isDirty}
            />
          )}
        />
        <Controller
          name="sender_phone"
          control={control}
          render={({
            field: { name, value, onChange },
            fieldState: { error, isDirty },
          }) => (
            <PhoneInput
              className="h-12 rounded-sm"
              name={name}
              error={!!error?.message}
              errorMessage={error?.message}
              label="Telefon Numarası"
              id="sender_phone"
              placeholder="Telefon numarası giriniz"
              onChange={onChange}
              value={value}
              icon={<Phone className="h-4 w-4" />}
              dirtyAnimation={isDirty}
            />
          )}
        />
        <Controller
          name="sender_email"
          control={control}
          render={({ field, fieldState: { error, isDirty } }) => (
            <TextField
              className="h-12 rounded-sm"
              {...field}
              error={!!error?.message}
              errorMessage={error?.message}
              label="E-posta Adresi"
              id="sender_email"
              type="email"
              placeholder="E-posta adresi giriniz"
              icon={<Mail className="h-4 w-4" />}
              dirtyAnimation={isDirty}
            />
          )}
        />
      </div>

      <InvoiceTypeSelector {...props} />
      <InvoiceDetails {...props} />
    </div>
  );
}
