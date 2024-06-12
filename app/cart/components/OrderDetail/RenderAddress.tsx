import Checkbox from "@/components/Checkbox";
import TextField from "@/components/TextField";
import { GetUserByIdQuery } from "@/graphql/generated";
import React, { FC } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";

type RenderAddressProps = {
  selectedSavedAddress?: any;
  control: Control<FieldValues>;
  user?: GetUserByIdQuery["user_by_pk"];
};

const RenderAddress: FC<RenderAddressProps> = ({
  selectedSavedAddress,
  control,
  user,
}) => {
  return (
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
      {!selectedSavedAddress ||
        (!user && (
          <Controller
            control={control}
            name="wantToSaveAddress"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Checkbox
                checked={value}
                onChange={onChange}
                label="Sonraki alışverişlerimde bu adresi kullanmak istiyorum."
                id="wantToSaveAddress"
                className="text-xs"
              />
            )}
          />
        ))}
    </>
  );
};

export default RenderAddress;
