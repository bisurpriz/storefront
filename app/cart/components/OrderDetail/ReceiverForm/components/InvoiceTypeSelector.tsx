import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Controller } from "react-hook-form";
import { InvoiceType, SenderStepProps } from "../types";

export function InvoiceTypeSelector({
  control,
  selectedInvoiceType,
  setSelectedInvoiceType,
}: SenderStepProps) {
  return (
    <Controller
      name="invoice_type"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="space-y-2">
          <Label
            htmlFor="invoice_type"
            className="text-sm font-medium text-neutral-700"
          >
            Fatura Türü
          </Label>
          <RadioGroup
            {...field}
            onValueChange={(value: InvoiceType) => {
              setSelectedInvoiceType(value);
              field.onChange(value);
            }}
            id="invoice_type"
            defaultValue="person"
            className="flex gap-4"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="person" id="person" />
              <Label htmlFor="person" className="text-sm text-neutral-600">
                Bireysel
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="company" id="company" />
              <Label htmlFor="company" className="text-sm text-neutral-600">
                Kurumsal
              </Label>
            </div>
          </RadioGroup>
          {error && (
            <p className="mt-1 text-sm text-red-500">{error.message}</p>
          )}
        </div>
      )}
    />
  );
}
