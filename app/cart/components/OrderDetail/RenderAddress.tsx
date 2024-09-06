import Checkbox from "@/components/Checkbox";
import TextField from "@/components/TextField";
import { GetUserByIdQuery } from "@/graphql/queries/account/account.generated";
import React, { FC } from "react";
import {
  Control,
  Controller,
  FieldValues,
  UseFormSetValue,
} from "react-hook-form";
import { OrderDetailPartialFormData } from "./ReceiverForm";

type RenderAddressProps = {
  selectedSavedAddress?: any;
  control: Control<FieldValues>;
  user?: GetUserByIdQuery["user_by_pk"];
  setValue?: UseFormSetValue<OrderDetailPartialFormData>;
};

const RenderAddress: FC<RenderAddressProps> = ({
  selectedSavedAddress,
  control,
  user,
  setValue,
}) => {
  return (
    <>
      {user && !selectedSavedAddress && (
        <>
          <Controller
            control={control}
            name="address_title"
            render={({
              field: { onChange, value, ref },
              fieldState: { error },
            }) => (
              <TextField
                ref={ref}
                label="Adres Başlığı"
                placeholder="Adres başlığı giriniz. (Ev, İş, Diğer)"
                fullWidth
                id="address_title"
                value={value}
                onChange={onChange}
                error={!!error}
                errorMessage={error?.message}
                disabled={!!selectedSavedAddress}
              />
            )}
          />
          {!selectedSavedAddress && (
            <Controller
              control={control}
              name="wantToSaveAddress"
              render={({ field: { onChange, value } }) => (
                <Checkbox
                  name="wantToSaveAddress"
                  checked={value}
                  onChange={(e) => {
                    onChange(e);
                    setValue("wantToSaveAddress", e);
                  }}
                  label="Sonraki alışverişlerimde bu adresi kullanmak istiyorum."
                  id="wantToSaveAddress"
                  className="text-xs"
                />
              )}
            />
          )}
        </>
      )}
    </>
  );
};

export default RenderAddress;
