"use client";

import {
  createNewUserAddress,
  getAvailableCitiesForProduct,
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
import { useDiscrits } from "@/hooks/useDistricts";
import { useQuarters } from "@/hooks/useQuarters";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { AnyObject, ObjectSchema } from "yup";
import RenderAddress from "./RenderAddress";
import Textarea from "@/components/Textarea";
import clsx from "clsx";
import RadioGroup from "@/components/Radio/RadioGroup";
import CompanyDetail from "./CompanyDetail";
import User from "@/components/Icons/User";
import Phone from "@/components/Icons/Phone";
import Mail from "@/components/Icons/Mail";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { OrderDetailSchema } from "./schema";

const Title = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-2xl font-semibold font-mono text-zinc-600 mb-4">
    {children}
  </h3>
);

const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h4 className="text-lg font-semibold font-mono text-zinc-600">{children}</h4>
);

export interface OrderDetailPartialFormData
  extends Partial<OrderDetailFormData> {
  saved_address?: string;
  wantToSaveAddress?: boolean;
}

interface AvailableCity {
  city_code: number;
  city_name: string;
  id: number;
}

interface ReceiverFormProps {
  cities: AvailableCity[];
  defaultCity?: CityResponse;
  defaultDistrict?: DistrictResponse;
  defaultQuarter?: QuarterResponse;
}

const defaultValues: OrderDetailPartialFormData = {
  address: "",
  address_title: "",
  city: null,
  district: null,
  quarter: null,
  receiver_name: "",
  receiver_phone: "",
  saved_address: "",
  wantToSaveAddress: false,
  sender_email: "",
  sender_name: "",
  sender_phone: "",
  invoice_type: "person",
  id: null,
  invoice_address: "",
  invoice_company_address: "",
  invoice_company_city: "",
  invoice_company_district: "",
  invoice_company_name: "",
  invoice_company_tax_number: "",
  invoice_company_tax_office: "",
  user_id: null,
};

const ReceiverForm = ({ cities }: ReceiverFormProps) => {
  const { user, userAddresses } = useUser();
  const [availableCities, setAvailableCities] = useState([]);
  const { push } = useRouter();
  const { cartState } = useCart();
  const {
    control,
    reset,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OrderDetailPartialFormData>({
    defaultValues,
    mode: "all",
    delayError: 500,
    resolver: yupResolver<OrderDetailPartialFormData>(
      OrderDetailSchema as ObjectSchema<
        OrderDetailPartialFormData,
        AnyObject,
        any,
        ""
      >
    ),
  });

  useEffect(() => {
    getAvailableCitiesForProduct(cartState?.cartItems?.[0]?.id).then(
      (cities) => {
        setAvailableCities(cities);
      }
    );
  }, []);

  const [city, district, invoice_type, savedAddressValue] = useWatch({
    control,
    name: ["city", "district", "invoice_type", "saved_address"],
  });

  const { districts } = useDiscrits(city?.id);
  const { quarters } = useQuarters(district?.id);

  const renderSavedAddress = () => {
    if (userAddresses?.length > 0) {
      return (
        <Controller
          control={control}
          name="saved_address"
          render={({ field }) => {
            const selectedAddress = userAddresses.find(
              (address) => address?.id?.toString() === field.value
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
                  field.onChange(option?.value ?? "");
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
      <Title>Teslimat Detay</Title>
      <form
        id="order-detail-form"
        name="order-detail-form"
        autoComplete="off"
        className={clsx(
          "grid grid-cols-2 w-full gap-6 max-md:grid-cols-1 max-md:gap-3",
          "text-sm font-manrope"
        )}
      >
        <div className={clsx("col-span-full", "flex flex-col gap-3 flex-1")}>
          {renderSavedAddress()}
        </div>
        <div
          className={clsx(
            "col-span-1 max-md:col-span-full",
            "flex flex-col gap-3 flex-1"
          )}
        >
          <SubTitle>Gönderici Bilgileri</SubTitle>
          <Controller
            control={control}
            name="sender_name"
            render={({
              field: { onChange, value, ref },
              fieldState: { error },
            }) => (
              <TextField
                ref={ref}
                label="Gönderici Adı Soyadı"
                placeholder="Lütfen adınızı ve soyadınızı giriniz."
                fullWidth
                id="sender_name"
                value={value}
                onChange={onChange}
                icon={<User className="text-xl" />}
                error={!!error}
                errorMessage={error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="sender_phone"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <PhoneInput
                label="Telefon Numarası"
                errorMessage={error?.message}
                error={!!error}
                onChange={(val, inputVal) => onChange(inputVal)}
                value={value}
                id="sender_phone"
                icon={<Phone className="text-xl" />}
              />
            )}
          />

          <Controller
            control={control}
            name="sender_email"
            render={({
              field: { onChange, value, ref },
              fieldState: { error },
            }) => (
              <TextField
                ref={ref}
                label="E-posta Adresi"
                placeholder="E-posta Adresi"
                fullWidth
                type="email"
                id="sender_email"
                value={value}
                onChange={onChange}
                error={!!error}
                errorMessage={error?.message}
                icon={<Mail className="text-xl" />}
              />
            )}
          />

          <Controller
            control={control}
            name="invoice_type"
            render={({ field: { onChange, value } }) => (
              <RadioGroup
                options={[
                  { label: "Kişi Adına", value: "person" },
                  { label: "Firma Adına", value: "company" },
                ]}
                name="invoice_type"
                onChange={onChange}
                value={value}
                className="flex items-center gap-4"
              />
            )}
          />
        </div>

        <div
          className={clsx(
            "col-span-1 max-md:col-span-full",
            "flex flex-col gap-3 flex-1"
          )}
        >
          <SubTitle>Alıcı Bilgileri</SubTitle>
          <Controller
            control={control}
            name="receiver_name"
            render={({
              field: { onChange, value, ref },
              fieldState: { error },
            }) => (
              <TextField
                ref={ref}
                label="Alıcı Adı"
                placeholder="Alıcı Adı"
                fullWidth
                id="receiver_name"
                value={value}
                onChange={onChange}
                error={!!error}
                errorMessage={error?.message}
                icon={<User className="text-xl" />}
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
                icon={<Phone className="text-xl" />}
              />
            )}
          />
        </div>
        {invoice_type !== "company" && (
          <Controller
            name="invoice_address"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Textarea
                label="Fatura Adresi"
                placeholder="Fatura Adresi"
                fullWidth
                id="invoice_address"
                value={value}
                onChange={onChange}
                error={!!error}
                errorMessage={error?.message}
              />
            )}
          />
        )}
        <CompanyDetail control={control} invoice_type={invoice_type} />
        <div className={clsx("col-span-full", "flex flex-col gap-3 flex-1")}>
          <SubTitle>Alıcı Adres Bilgileri</SubTitle>

          <RenderAddress
            selectedSavedAddress={savedAddressValue}
            control={control}
            user={user}
            setValue={setValue}
          />

          <Controller
            control={control}
            name="city"
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <AutoComplete
                  value={
                    value
                      ? {
                          label: value?.name,
                          value: value?.id,
                        }
                      : null
                  }
                  label="İl"
                  options={availableCities.map((city) => ({
                    label: city.city_name,
                    value: city.id,
                  }))}
                  onChange={(option: AutoCompleteOption) => {
                    onChange(option);
                    reset({
                      ...watch(),
                      city: option
                        ? {
                            code: null,
                            name: option.label as string,
                            id: option.value as number,
                          }
                        : null,
                      district: null,
                      quarter: null,
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
            name="district"
            render={({
              field: { onChange, value, ref },
              fieldState: { error },
            }) => {
              return (
                <AutoComplete
                  value={
                    value
                      ? {
                          label: value?.name,
                          value: value?.id,
                        }
                      : null
                  }
                  label="İlçe"
                  options={districts.map((district) => ({
                    label: district.name,
                    value: district.id,
                  }))}
                  onChange={(option: AutoCompleteOption) => {
                    onChange(option);
                    reset({
                      ...watch(),
                      district: option
                        ? {
                            id: option.value as number,
                            name: option.label as string,
                          }
                        : null,
                      quarter: null,
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
            name="quarter"
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <AutoComplete
                  value={
                    value
                      ? {
                          label: value?.name,
                          value: value?.id,
                        }
                      : null
                  }
                  label="Mahalle"
                  options={quarters.map((option) => ({
                    label: option.name,
                    value: option.id,
                  }))}
                  onChange={(option: AutoCompleteOption) => {
                    onChange(
                      option
                        ? {
                            id: option.value as number,
                            name: option.label as string,
                          }
                        : null
                    );
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
      </form>
    </Card>
  );
};

export default ReceiverForm;
