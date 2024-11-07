import AccordionItem from "@/components/Accordion/AccordionItem";
import TextField from "@/components/TextField";
import Textarea from "@/components/Textarea";
import clsx from "clsx";
import React, { FC } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";

type Props = {
  invoice_type: "person" | "company";
  control: Control<FieldValues>;
};
const CompanyDetail: FC<Props> = ({ control, invoice_type }) => {
  if (invoice_type === "person") return null;

  return (
    <div className={clsx("col-span-full", "flex flex-1 flex-col gap-3")}>
      <AccordionItem
        title="Firma Bilgileri"
        bordered
        isOpen
        className="rounded-lg"
        content={
          <div className={clsx("grid grid-cols-2 gap-3", "max-md:grid-cols-1")}>
            <Controller
              control={control}
              name="invoice_company_name"
              render={({
                field: { onChange, value, ref },
                fieldState: { error },
              }) => (
                <TextField
                  ref={ref}
                  label="Firma Adı"
                  placeholder="Firma Adı"
                  fullWidth
                  id="invoice_company_name"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  errorMessage={error?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="invoice_company_tax_number"
              render={({
                field: { onChange, value, ref },
                fieldState: { error },
              }) => (
                <TextField
                  ref={ref}
                  label="Vergi Numarası"
                  placeholder="Vergi Numarası"
                  fullWidth
                  id="invoice_company_tax_number"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  errorMessage={error?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="invoice_company_tax_office"
              render={({
                field: { onChange, value, ref },
                fieldState: { error },
              }) => (
                <TextField
                  ref={ref}
                  label="Vergi Dairesi"
                  placeholder="Vergi Dairesi"
                  fullWidth
                  id="invoice_company_tax_office"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  errorMessage={error?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="invoice_company_city"
              render={({
                field: { onChange, value, ref },
                fieldState: { error },
              }) => (
                <TextField
                  ref={ref}
                  label="Firma İli"
                  placeholder="Firma İli"
                  fullWidth
                  id="invoice_company_city"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  errorMessage={error?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="invoice_company_district"
              render={({
                field: { onChange, value, ref },
                fieldState: { error },
              }) => (
                <TextField
                  ref={ref}
                  label="Firma İlçe"
                  placeholder="Firma İlçe"
                  fullWidth
                  id="invoice_company_district"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  errorMessage={error?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="invoice_company_address"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Textarea
                  label="Firma Adresi"
                  placeholder="Firma Adresi"
                  fullWidth
                  id="invoice_company_address"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  errorMessage={error?.message}
                />
              )}
            />
          </div>
        }
      />
    </div>
  );
};

export default CompanyDetail;
