import { getAvailableNeighborhoods } from "@/app/(feed)/components/utils/validateLocation";
import AutoComplete, { AutoCompleteOption } from "@/components/Autocomplete";
import Textarea from "@/components/Textarea";
import { Controller } from "react-hook-form";
import { AddressFieldsProps } from "../types";

export function AddressFields({
  control,
  setValue,
  city,
  district,
  neighborhood,
  neighborhoods,
  setNeighborhoods,
  availableDistricts,
  placeData,
  hasSameDayProduct,
  selectedCargoLocation,
}: AddressFieldsProps) {
  return (
    <>
      <Controller
        name="receiver_city"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <AutoComplete
            {...field}
            buttonClass="h-12 rounded-sm border-2 py-1 px-3 focus-visible:ring-2"
            id="receiver_city"
            label="Şehir"
            placeholder="Şehir seçiniz"
            error={!!error}
            errorMessage={error?.message}
            disabled
            variant={!!error ? "error" : "default"}
            onChange={field.onChange}
            value={
              field?.value && {
                label: field?.value?.label,
                value: field?.value?.value,
              }
            }
            options={
              city
                ? [
                    {
                      label: city,
                      value: city,
                    },
                  ]
                : []
            }
          />
        )}
      />
      <Controller
        name="receiver_district"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <AutoComplete
            {...field}
            buttonClass="h-12 rounded-sm border-2 py-1 px-3 focus-visible:ring-2"
            id="receiver_district"
            label="İlçe"
            placeholder="İlçe seçiniz"
            error={!!error}
            errorMessage={error?.message}
            disabled={!!district}
            variant={!!error ? "error" : "default"}
            onChange={(value: AutoCompleteOption) => {
              if (value) {
                setValue("receiver_neighborhood", null);
              }

              const availableNeighborhoods = getAvailableNeighborhoods(
                placeData,
                value?.value as string,
              );
              setNeighborhoods(
                availableNeighborhoods?.map((neighborhood) => ({
                  label: neighborhood,
                  value: neighborhood,
                })) || [],
              );

              field.onChange(value);
            }}
            value={
              field?.value && {
                label: field?.value?.label,
                value: field?.value?.value,
              }
            }
            options={
              district
                ? [
                    {
                      label: district,
                      value: district,
                    },
                  ]
                : availableDistricts?.map((district) => ({
                    label: district,
                    value: district,
                  })) || []
            }
          />
        )}
      />
      <Controller
        name="receiver_neighborhood"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <AutoComplete
            {...field}
            buttonClass="h-12 rounded-sm border-2 py-1 px-3 focus-visible:ring-2"
            id="receiver_neighborhood"
            label="Mahalle"
            placeholder="Mahalle seçiniz"
            onChange={field.onChange}
            error={!!error}
            errorMessage={error?.message}
            variant={!!error ? "error" : "default"}
            disabled={
              !!neighborhood ||
              (!hasSameDayProduct && Boolean(selectedCargoLocation?.placeId))
            }
            value={
              field?.value && {
                label: field?.value?.label,
                value: field?.value?.value,
              }
            }
            options={
              neighborhood
                ? [
                    {
                      label: neighborhood,
                      value: neighborhood,
                    },
                  ]
                : neighborhoods || []
            }
          />
        )}
      />

      <Controller
        name="receiver_address"
        control={control}
        render={({ field, fieldState: { error, isDirty } }) => (
          <Textarea
            {...field}
            error={!!error?.message}
            errorMessage={error?.message}
            label="Açık adres"
            id="receiver_address"
            placeholder="Mahalle, Sokak, Kapı No"
            inputClass="rounded-sm"
            dirtyAnimation={isDirty}
          />
        )}
      />
    </>
  );
}
