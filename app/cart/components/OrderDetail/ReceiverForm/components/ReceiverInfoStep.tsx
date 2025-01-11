import PhoneInput from "@/components/PhoneInput";
import PlacesAutocomplete from "@/components/QuarterSelector/PlacesAutocomplete";
import TextField from "@/components/TextField";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Package2, Phone, User } from "lucide-react";
import { Controller } from "react-hook-form";
import { ReceiverStepProps } from "../types";
import { AddressFields } from "./AddressFields";

export function ReceiverInfoStep({
  control,
  setValue,
  hasSameDayProduct,
  selectedCargoLocation,
  setSelectedCargoLocation,
  ...props
}: ReceiverStepProps) {
  console.log(selectedCargoLocation, "selectedCargoLocation", props);
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Controller
          name="receiver_name"
          control={control}
          render={({ field, fieldState: { error, isDirty } }) => (
            <TextField
              className="h-12 rounded-sm"
              {...field}
              error={!!error?.message}
              errorMessage={error?.message}
              label="Alıcı Adı"
              id="receiver_name"
              placeholder="Alıcı adı giriniz"
              icon={<User className="h-4 w-4" />}
              dirtyAnimation={isDirty}
            />
          )}
        />
        <Controller
          name="receiver_phone"
          control={control}
          render={({
            field: { onChange, name, value },
            fieldState: { error, isDirty },
          }) => (
            <PhoneInput
              className="h-12 rounded-sm"
              name={name}
              error={!!error?.message}
              errorMessage={error?.message}
              label="Telefon Numarası"
              id="receiver_phone"
              placeholder="Telefon numarası giriniz"
              onChange={onChange}
              value={value}
              icon={<Phone className="h-4 w-4" />}
              dirtyAnimation={isDirty}
            />
          )}
        />

        <Alert variant="informative" className="mt-2">
          <Package2 className="h-4 w-4" />
          <AlertTitle>Dikkat!</AlertTitle>
          <AlertDescription>
            Bilgiler seçtiğiniz gönderim yerine göre otomatik olarak
            doldurulmuştur. Lütfen kontrol ediniz.
          </AlertDescription>
        </Alert>

        {!hasSameDayProduct && (
          <PlacesAutocomplete
            placeholder="Lütfen mahalle, sokak, kapı numarası giriniz"
            onSelect={(prediction) => {
              if (prediction === null) {
                setValue("receiver_city", null);
                setValue("receiver_district", null);
                setValue("receiver_neighborhood", null);
                setValue("receiver_address", "");
                setValue("place_id", prediction?.placeId);
              }
              setSelectedCargoLocation(prediction);
            }}
            dontChangeCookie
            defaultValue={selectedCargoLocation}
          />
        )}

        <AddressFields
          control={control}
          setValue={setValue}
          hasSameDayProduct={hasSameDayProduct}
          selectedCargoLocation={selectedCargoLocation}
          {...props}
        />
      </div>
    </div>
  );
}
