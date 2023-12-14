"use client";

import Card from "@/components/Card";
import React, { useEffect, useState } from "react";
import { Controller, useWatch, useForm } from "react-hook-form";
import { OrderDetailFormData } from "@/common/types/Order/order";
import { getUserAddressById } from "@/app/account/actions";
import { useDiscrits } from "@/hooks/useDistricts";
import { useQuarters } from "@/hooks/useQuarters";
import AutoComplete, { AutoCompleteOption } from "@/components/Autocomplete";
import TextField from "@/components/TextField";
import PhoneInput from "@/components/PhoneInput";
import { CityResponse } from "@/common/types/Addresses/addresses";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { number, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Title = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-2xl font-semibold font-mono text-zinc-600 mb-4">
    {children}
  </h3>
);

export interface OrderDetailPartialFormData
  extends Partial<OrderDetailFormData> {
  saved_address?: string;
}

interface ReceiverFormProps {
  cities: CityResponse[];
}

const OrderDetailSchema = object({
  city_id: number().required("İl alanı zorunludur."),
  district_id: number().required("İlçe alanı zorunludur."),
  quarter_id: number().required("Mahalle alanı zorunludur."),
  address_title: string().required("Adres başlığı zorunludur."),
  address: string().required("Adres alanı zorunludur."),
  receiver_firstname: string().required("Alıcı adı zorunludur."),
  receiver_surname: string().required("Alıcı soyadı zorunludur."),
  receiver_phone: string().required("Alıcı telefonu zorunludur."),
  user_id: string().optional(),
  saved_address: string().optional(),
});

const defaultValues = {
  address: "",
  address_title: "",
  city_id: null,
  district_id: null,
  quarter_id: null,
  receiver_firstname: "",
  receiver_phone: "",
  receiver_surname: "",
  user_id: "",
  saved_address: "",
};

const ReceiverForm = ({ cities }: ReceiverFormProps) => {
  const [selectedSavedAddress, setSelectedSavedAddress] = useState(null);
  const [userAddresses, setUserAddresses] = useState(null);
  const [user_id, setUser_id] = useState(null);
  const { push } = useRouter();
  const { control, reset, watch, getValues, handleSubmit } =
    useForm<OrderDetailPartialFormData>({
      defaultValues,
      mode: "onChange",
      delayError: 500,
      resolver: yupResolver(OrderDetailSchema),
    });

  useEffect(() => {
    getUserAddressById().then(({ userAddresses, user_id }) => {
      setUser_id(user_id);
      setUserAddresses(userAddresses);
    });
  }, []);

  const [cityId, districtId] = useWatch({
    control,
    name: ["city_id", "district_id"],
  });

  useEffect(() => {
    if (selectedSavedAddress) {
      const formattedPhone = formatPhoneNumber(
        selectedSavedAddress.receiver_phone
      );
      reset({
        ...getValues(),
        city_id: selectedSavedAddress.city.id,
        district_id: selectedSavedAddress.district.id,
        quarter_id: selectedSavedAddress.quarter.id,
        address: selectedSavedAddress.address,
        receiver_firstname: selectedSavedAddress.receiver_firstname,
        receiver_surname: selectedSavedAddress.receiver_surname,
        receiver_phone: formattedPhone,
        user_id,
        address_title: selectedSavedAddress.address_title,
      });
    } else {
      reset({
        ...getValues(),
        city_id: null,
        district_id: null,
        quarter_id: null,
        address: "",
        user_id,
      });
    }
  }, [selectedSavedAddress]);

  const { districts } = useDiscrits(cityId);
  const { quarters } = useQuarters(districtId);

  const onSubmit = (values) => {
    console.log(values);
    if (values) {
      toast.success("Siparişiniz başarıyla oluşturuldu.", {
        icon: "👏",
        position: "bottom-right",
      });
      push("/cart/checkout");
    }
  };

  const renderSavedAddress = () => {
    if (userAddresses?.length > 0) {
      return (
        <Controller
          control={control}
          name="saved_address"
          render={({ field }) => {
            const selectedAddress = userAddresses.find(
              (address) => address.id === field.value
            );

            return (
              <AutoComplete
                value={
                  selectedAddress
                    ? {
                        label: selectedAddress.address_title,
                        value: selectedAddress.id,
                      }
                    : null
                }
                label="Kayıtlı Adresler"
                getOptionLabel={(option) => option.label}
                options={userAddresses.map((address) => ({
                  label: address.address_title,
                  value: address.id,
                }))}
                onChange={(option: AutoCompleteOption) => {
                  const savedAddress = userAddresses.find(
                    (address) => address.id === option?.value
                  );

                  setSelectedSavedAddress(savedAddress);
                  reset({
                    ...watch(),
                    saved_address: option?.value as string,
                  });
                }}
                placeholder="Kayıtlı adres seçiniz"
                id="saved_address"
              />
            );
          }}
        />
      );
    }
    return null;
  };

  const renderAddressTitle = () => {
    if (!selectedSavedAddress) {
      return (
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
              placeholder="Ev Adresi"
              fullWidth
              id="address_title"
              value={value}
              onChange={onChange}
              error={!!error}
              errorMessage={error?.message}
            />
          )}
        />
      );
    }
    return null;
  };

  return (
    <Card>
      <Title>Teslimat Bilgileri</Title>
      <form
        id="order-detail-form"
        name="order-detail-form"
        autoComplete="off"
        className="col-span-1 md:col-span-2 flex gap-6 max-md:flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-3 flex-1 ">
          {renderSavedAddress()}

          {renderAddressTitle()}

          <Controller
            control={control}
            name="city_id"
            render={({
              field: { onChange, value, ref },
              fieldState: { error },
            }) => {
              const selectedCity = cities.find((city) => city.id === value);

              return (
                <AutoComplete
                  value={
                    selectedCity
                      ? { label: selectedCity.name, value: selectedCity.id }
                      : null
                  }
                  label="İl"
                  options={cities.map((city) => ({
                    label: city.name,
                    value: city.id,
                  }))}
                  onChange={(option: AutoCompleteOption) => {
                    onChange(option?.value);
                    reset({
                      ...watch(),
                      city_id: option?.value as number,
                      district_id: null,
                      quarter_id: null,
                    });
                  }}
                  placeholder="İl Seçiniz"
                  id="city"
                  error={!!error}
                  errorMessage={error?.message}
                  autoComplete="off"
                />
              );
            }}
          />

          <Controller
            control={control}
            name="district_id"
            render={({
              field: { onChange, value, ref },
              fieldState: { error },
            }) => {
              const selectedDistrict = districts.find(
                (district) => district.id === value
              );
              return (
                <AutoComplete
                  value={
                    selectedDistrict
                      ? {
                          label: selectedDistrict.name,
                          value: selectedDistrict.id,
                        }
                      : null
                  }
                  label="İlçe"
                  options={districts.map((district) => ({
                    label: district.name,
                    value: district.id,
                  }))}
                  onChange={(option: AutoCompleteOption) => {
                    onChange(option?.value);
                    reset({
                      ...watch(),
                      district_id: option?.value as number,
                      quarter_id: null,
                    });
                  }}
                  placeholder="İlçe Seçiniz"
                  id="district"
                  error={!!error}
                  errorMessage={error?.message}
                />
              );
            }}
          />

          <Controller
            control={control}
            name="quarter_id"
            render={({
              field: { onChange, value, ref },
              fieldState: { error },
            }) => {
              const selectedQuarter = quarters.find(
                (quarter) => quarter.id === value
              );

              return (
                <AutoComplete
                  value={
                    selectedQuarter
                      ? {
                          label: selectedQuarter.name,
                          value: selectedQuarter.id,
                        }
                      : null
                  }
                  label="Mahalle"
                  options={quarters.map((quarter) => ({
                    label: quarter.name,
                    value: quarter.id,
                  }))}
                  onChange={(option: AutoCompleteOption) => {
                    onChange(option?.value);
                  }}
                  placeholder="Mahalle Seçiniz"
                  id="quarter"
                  error={!!error}
                  errorMessage={error?.message}
                />
              );
            }}
          />

          <Controller
            control={control}
            name="address"
            render={({
              field: { onChange, value, ref },
              fieldState: { error },
            }) => (
              <TextField
                ref={ref}
                label="Adres"
                placeholder="Adres"
                fullWidth
                id="address"
                value={value}
                onChange={onChange}
                error={!!error}
                errorMessage={error?.message}
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-3 flex-1">
          <Controller
            control={control}
            name="receiver_firstname"
            render={({
              field: { onChange, value, ref },
              fieldState: { error },
            }) => (
              <TextField
                ref={ref}
                label="Alıcı Adı"
                placeholder="Alıcı Adı"
                fullWidth
                id="receiver_firstname"
                value={value}
                onChange={onChange}
                error={!!error}
                errorMessage={error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="receiver_surname"
            render={({
              field: { onChange, value, ref },
              fieldState: { error },
            }) => (
              <TextField
                ref={ref}
                label="Alıcı Soyadı"
                placeholder="Alıcı Soyadı"
                fullWidth
                id="receiver_surname"
                value={value}
                onChange={onChange}
                error={!!error}
                errorMessage={error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="receiver_phone"
            render={({
              field: { onChange, value, ref },
              fieldState: { error },
            }) => (
              <PhoneInput
                label="Telefon Numarası"
                errorMessage={error?.message}
                error={!!error}
                onChange={(val, inputVal) => onChange(inputVal)}
                value={value}
                id="receiver_phone"
              />
            )}
          />
        </div>
      </form>
    </Card>
  );
};

export default ReceiverForm;
