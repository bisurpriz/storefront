import TextField from "@/components/TextField";
import Textarea from "@/components/Textarea";
import { Building2, FileDigit, Store } from "lucide-react";
import { Controller } from "react-hook-form";
import { SenderStepProps } from "../types";

export function InvoiceDetails({
  control,
  selectedInvoiceType,
}: SenderStepProps) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Controller
        name="invoice_company_address"
        control={control}
        render={({ field, fieldState: { error, isDirty } }) => (
          <Textarea
            {...field}
            error={!!error?.message}
            errorMessage={error?.message}
            label="Fatura Adresi"
            id="invoice_company_address"
            placeholder="Fatura adresi giriniz"
            inputClass="rounded-sm"
            dirtyAnimation={isDirty}
            className="col-span-full"
            rows={3}
          />
        )}
      />
      {selectedInvoiceType === "company" && (
        <>
          <Controller
            name="invoice_company_name"
            control={control}
            render={({ field, fieldState: { error, isDirty } }) => (
              <TextField
                className="h-12 rounded-sm"
                {...field}
                error={!!error?.message}
                errorMessage={error?.message}
                label="Firma Adı"
                id="invoice_company_name"
                placeholder="Firma adı giriniz"
                icon={<Store className="h-4 w-4" />}
                dirtyAnimation={isDirty}
              />
            )}
          />
          <Controller
            name="invoice_tax_number"
            control={control}
            render={({ field, fieldState: { error, isDirty } }) => (
              <TextField
                className="h-12 rounded-sm"
                {...field}
                error={!!error?.message}
                errorMessage={error?.message}
                label="Vergi Numarası"
                id="invoice_tax_number"
                placeholder="Vergi numarası giriniz"
                icon={<FileDigit className="h-4 w-4" />}
                dirtyAnimation={isDirty}
              />
            )}
          />
          <Controller
            name="invoice_tax_office"
            control={control}
            render={({ field, fieldState: { error, isDirty } }) => (
              <TextField
                className="h-12 rounded-sm"
                {...field}
                error={!!error?.message}
                errorMessage={error?.message}
                label="Vergi Dairesi"
                id="invoice_tax_office"
                placeholder="Vergi dairesi giriniz"
                icon={<Building2 className="h-4 w-4" />}
                dirtyAnimation={isDirty}
              />
            )}
          />
        </>
      )}
    </div>
  );
}
