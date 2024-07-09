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
import { AnyObject, ObjectSchema, boolean, object, string } from "yup";
import RenderAddress from "./RenderAddress";
import Textarea from "@/components/Textarea";
import clsx from "clsx";
import RadioGroup from "@/components/Radio/RadioGroup";
import CompanyDetail from "./CompanyDetail";
import User from "@/components/Icons/User";
import Phone from "@/components/Icons/Phone";
import Mail from "@/components/Icons/Mail";

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

interface ReceiverFormProps {
  cities: CityResponse[];
  defaultCity?: CityResponse;
  defaultDistrict?: DistrictResponse;
  defaultQuarter?: QuarterResponse;
}

const OrderDetailSchema = object({
  city: object().required("İl alanı zorunludur."),
  district: object().required("İlçe alanı zorunludur."),
  quarter: object().required("Mahalle alanı zorunludur."),
  address: string().required("Adres alanı zorunludur."),
  receiver_name: string().required("Alıcı adı zorunludur."),
  receiver_phone: string().required("Alıcı telefonu zorunludur."),
  sender_name: string().required("Gönderici adı zorunludur."),
  sender_phone: string().required("Gönderici telefonu zorunludur."),
  sender_email: string()
    .required("Gönderici e-posta adresi zorunludur.")
    .email("Geçerli bir e-posta adresi giriniz."),
  address_title: string().optional().nullable(),
  saved_address: string().optional().nullable(),
  wantToSaveAddress: boolean().optional().nullable(),
  invoice_type: string()
    .default("person")
    .equals(["person", "company"], "Invalid invoice type"),
  invoice_address: string().when("invoice_type", {
    is: "person",
    then: (schema) => schema.required("Fatura adresi zorunludur."),
    otherwise: (schema) => schema.optional().nullable(),
  }),
  invoice_company_name: string().when("invoice_type", {
    is: "company",
    then: (schema) => schema.required("Firma adı zorunludur."),
    otherwise: (schema) => schema.optional().nullable(),
  }),
  invoice_company_tax_number: string().when("invoice_type", {
    is: "company",
    then: (schema) => schema.required("Vergi numarası zorunludur."),
    otherwise: (schema) => schema.optional().nullable(),
  }),
  invoice_company_tax_office: string().when("invoice_type", {
    is: "company",
    then: (schema) => schema.required("Vergi dairesi zorunludur."),
    otherwise: (schema) => schema.optional().nullable(),
  }),
  invoice_company_address: string().when("invoice_type", {
    is: "company",
    then: (schema) => schema.required("Firma adresi zorunludur."),
    otherwise: (schema) => schema.optional().nullable(),
  }),
  invoice_company_city: string().when("invoice_type", {
    is: "company",
    then: (schema) => schema.required("Firma adresi zorunludur."),
    otherwise: (schema) => schema.optional().nullable(),
  }),
  invoice_company_district: string().when("invoice_type", {
    is: "company",
    then: (schema) => schema.required("Firma adresi zorunludur."),
    otherwise: (schema) => schema.optional().nullable(),
  }),
});

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
  const { control, reset, watch, getValues, handleSubmit } =
    useForm<OrderDetailPartialFormData>({
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
    getUserAddressById().then(({ userAddresses }) => {
      setUserAddresses(userAddresses);
    });
  }, []);

  const [city, district, invoice_type] = useWatch({
    control,
    name: ["city", "district", "invoice_type"],
  });

  useEffect(() => {
    const serializeLocale = localStorage.getItem("detail-data");
    const localStorageData = JSON.parse(serializeLocale);

    if (localStorageData) {
      reset({
        ...getValues(),
        saved_address: localStorageData.saved_address,
        city: defaultCity ?? localStorageData.city,
        district: defaultDistrict ?? localStorageData.district,
        quarter: defaultQuarter ?? localStorageData.quarter,
        address: localStorageData.address,
        receiver_name: localStorageData.receiver_name,
        receiver_phone: localStorageData.receiver_phone,
        address_title: localStorageData.address_title,
        sender_email: localStorageData.sender_email,
        sender_phone: localStorageData.sender_phone,
        sender_name: localStorageData.sender_name,
        invoice_type: localStorageData.invoice_type,
        invoice_address: localStorageData.invoice_address,
        invoice_company_address: localStorageData.invoice_company_address,
        invoice_company_city: localStorageData.invoice_company_city,
        invoice_company_district: localStorageData.invoice_company_district,
        invoice_company_name: localStorageData.invoice_company_name,
        invoice_company_tax_number: localStorageData.invoice_company_tax_number,
        invoice_company_tax_office: localStorageData.invoice_company_tax_office,
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
        city: defaultCity,
        district: defaultDistrict,
        quarter: defaultQuarter,
      });

      return;
    }

    if (selectedSavedAddress) {
      const receiver_phone = formatPhoneNumber(
        selectedSavedAddress.receiver_phone
      );
      reset({
        ...getValues(),
        city: selectedSavedAddress.city,
        district: selectedSavedAddress.district,
        quarter: selectedSavedAddress.quarter,
        address: selectedSavedAddress.address,
        receiver_name:
          selectedSavedAddress.receiver_firstname +
          " " +
          selectedSavedAddress.receiver_surname,
        receiver_phone,
        address_title: selectedSavedAddress.address_title,
      });
      return;
    } else {
      reset({
        ...getValues(),
        city: null,
        district: null,
        quarter: null,
        address: "",
      });
    }
  }, [selectedSavedAddress]);

  const { districts } = useDiscrits(city?.id);
  const { quarters } = useQuarters(district?.id);

  const onSubmit = async (values) => {
    const cartId = user?.carts[0]?.id;
    const user_id = user?.id;

    if (values) {
      if (values.wantToSaveAddress && !values.saved_address) {
        try {
          await createNewUserAddress({
            address: values.address,
            city_id: values.city?.id,
            district_id: values.district?.id,
            quarter_id: values.quarter?.id,
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

      localStorage.setItem("detail-data", JSON.stringify(values));
      handleChangeStep();
    }
  };

  const onError = (errors) => {};

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
      <Title>Teslimat Detay</Title>
      <form
        id="order-detail-form"
        name="order-detail-form"
        autoComplete="off"
        className={clsx(
          "grid grid-cols-2 w-full gap-6 max-md:grid-cols-1 max-md:gap-3",
          "text-sm font-manrope"
        )}
        onSubmit={handleSubmit(onSubmit, onError)}
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
          tabIndex={0}
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
            selectedSavedAddress={selectedSavedAddress}
            control={control}
            user={user}
          />

          <Controller
            control={control}
            name="city"
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              const selectedCity = cities.find((city) => city.id === value?.id);

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
                    onChange(option);
                    reset({
                      ...watch(),
                      city: {
                        code: null,
                        name: option.label as string,
                        id: option.value as number,
                      },
                      district: null,
                      quarter: null,
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
            name="district"
            render={({
              field: { onChange, value, ref },
              fieldState: { error },
            }) => {
              const selectedDistrict = districts.find(
                (district) => district.id === value?.id
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
                    onChange(option);
                    reset({
                      ...watch(),
                      district: {
                        id: option.value as number,
                        name: option.label as string,
                      },
                      quarter: null,
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
            name="quarter"
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              const selectedQuarter = quarters.find(
                (quarter) => quarter.id === value?.id
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
                  options={quarters.map((option) => ({
                    label: option.name,
                    value: option.id,
                  }))}
                  onChange={(option: AutoCompleteOption) => {
                    onChange({
                      id: option.value as number,
                      name: option.label as string,
                    });
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
      </form>
    </Card>
  );
};

export default ReceiverForm;
