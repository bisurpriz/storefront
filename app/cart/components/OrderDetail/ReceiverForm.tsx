"use client";

import {
  createNewUserAddress,
  getUserAddressById,
} from "@/app/account/actions";
import {
  CityResponse,
  DistrictResponse,
  QuarterResponse,
} from "@/common/types/Addresses/addresses";
import { OrderDetailFormData } from "@/common/types/Order/order";
import AutoComplete, { AutoCompleteOption } from "@/components/Autocomplete";
import Card from "@/components/Card";
import PhoneInput from "@/components/PhoneInput";
import TextField from "@/components/TextField";
import { useUser } from "@/contexts/AuthContext";
import { useCartStep } from "@/contexts/CartContext/CartStepProvider";
import { useDiscrits } from "@/hooks/useDistricts";
import { useQuarters } from "@/hooks/useQuarters";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import { boolean, number, object, string } from "yup";
import RenderAddress from "./RenderAddress";
import Textarea from "@/components/Textarea";

const Title = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-2xl font-semibold font-mono text-zinc-600 mb-4">
    {children}
  </h3>
);

export interface OrderDetailPartialFormData
  extends Partial<OrderDetailFormData> {
  saved_address?: string;
  wantToSaveAddress?: boolean;
}

interface ReceiverFormProps {
  cities: CityResponse[];
  defaultCity?: CityResponse;
  defaultDistrict?: DistrictResponse;
  defaultQuarter?: QuarterResponse;
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
  saved_address: string().optional().nullable(),
  wantToSaveAddress: boolean().optional().nullable(),
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
  saved_address: "",
  wantToSaveAddress: false,
};

const ReceiverForm = ({
  cities,
  defaultCity,
  defaultDistrict,
  defaultQuarter,
}: ReceiverFormProps) => {
  const { user } = useUser();
  const [selectedSavedAddress, setSelectedSavedAddress] = useState(null);
  const [userAddresses, setUserAddresses] = useState(null);
  const { handleChangeStep } = useCartStep();
  const {
    control,
    reset,
    watch,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderDetailPartialFormData>({
    defaultValues,
    mode: "onChange",
    delayError: 500,
    resolver: yupResolver(OrderDetailSchema),
  });

  useEffect(() => {
    getUserAddressById().then(({ userAddresses }) => {
      setUserAddresses(userAddresses);
    });
  }, []);

  const [cityId, districtId] = useWatch({
    control,
    name: ["city_id", "district_id", "saved_address"],
  });

  useEffect(() => {
    const serializeLocale = localStorage.getItem("detail-data");
    const localStorageData = JSON.parse(serializeLocale);

    if (localStorageData) {
      reset({
        ...getValues(),
        saved_address: localStorageData.saved_address,
        city_id: defaultCity?.id ?? localStorageData.city_id,
        district_id: defaultDistrict?.id ?? localStorageData.district_id,
        quarter_id: defaultQuarter?.id ?? localStorageData.quarter_id,
        address: localStorageData.address,
        receiver_firstname: localStorageData.receiver_firstname,
        receiver_surname: localStorageData.receiver_surname,
        receiver_phone: localStorageData.receiver_phone,
        address_title: localStorageData.address_title,
      });

      if (userAddresses?.length > 0) {
        setSelectedSavedAddress(
          userAddresses.find(
            (address) => address.id === localStorageData.saved_address
          )
        );
      }

      return;
    }

    if (defaultCity && defaultDistrict && defaultQuarter) {
      reset({
        ...getValues(),
        city_id: defaultCity?.id,
        district_id: defaultDistrict?.id,
        quarter_id: defaultQuarter?.id,
      });

      return;
    }

    if (selectedSavedAddress) {
      const receiver_phone = formatPhoneNumber(
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
        receiver_phone,
        address_title: selectedSavedAddress.address_title,
      });
      return;
    } else {
      reset({
        ...getValues(),
        city_id: null,
        district_id: null,
        quarter_id: null,
        address: "",
      });
    }
  }, [selectedSavedAddress]);

  const { districts } = useDiscrits(cityId);
  const { quarters } = useQuarters(districtId);

  const onSubmit = async (values) => {
    const cartId = user?.carts[0]?.id;
    const user_id = user?.id;

    if (values) {
      if (values.wantToSaveAddress && !values.saved_address) {
        try {
          await createNewUserAddress({
            address: values.address,
            city_id: values.city_id,
            district_id: values.district_id,
            quarter_id: values.quarter_id,
            receiver_firstname: values.receiver_firstname,
            receiver_surname: values.receiver_surname,
            receiver_phone: values.receiver_phone,
            user_id,
            address_title: values.address_title,
          });
        } catch {
          toast.error("Adres kaydedilirken bir hata oluştu.", {
            duration: 4000,
          });
        }
      }

      console.log(cartId, user_id);
      localStorage.setItem("detail-data", JSON.stringify(values));
      handleChangeStep();
    }
  };

  const onError = (errors) => {
    console.log(errors);
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
                  reset({
                    saved_address: option?.value as string,
                  });

                  setSelectedSavedAddress(savedAddress);
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

  return (
    <Card>
      <Title>Teslimat Bilgileri</Title>
      <form
        id="order-detail-form"
        name="order-detail-form"
        autoComplete="off"
        className="col-span-1 md:col-span-2 flex gap-6 max-md:flex-col max-md:gap-3 font-manrope"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <div className="flex flex-col gap-3 flex-1 ">
          {renderSavedAddress()}

          <RenderAddress
            selectedSavedAddress={selectedSavedAddress}
            control={control}
            user={user}
          />

          <Controller
            control={control}
            name="city_id"
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              const selectedCity = cities.find((city) => city.id === value);

              return (
                <AutoComplete
                  value={
                    selectedCity
                      ? {
                          label: selectedCity.name,
                          value: selectedCity.id,
                        }
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
                  disabled={!!defaultCity}
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
                  disabled={!!defaultDistrict}
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
                  disabled={!!defaultQuarter}
                />
              );
            }}
          />

          <Controller
            control={control}
            name="address"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Textarea
                label="Adres"
                placeholder="Adresinizi giriniz."
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
            render={({ field: { onChange, value }, fieldState: { error } }) => (
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
