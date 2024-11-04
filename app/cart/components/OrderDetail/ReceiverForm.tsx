"use client";

import { useEffect, useState, useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { Locate, LucideCopy, Mail, Phone, Route, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import TextField from "@/components/TextField";
import { PhoneInput } from "@/components/PhoneInput";
import Textarea from "@/components/Textarea";
import { useCart } from "@/contexts/CartContext";
import {
  getAddressString,
  getAvailableDistricts,
  getAvailableNeighborhoods,
  getLocationVariables,
} from "@/app/(feed)/[category-slug]/components/utils/validateLocation";
import AutoComplete, { AutoCompleteOption } from "@/components/Autocomplete";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { parseJson } from "@/utils/format";

const stepperData = [
  { label: "Gönderici Bilgileri", key: "sender" },
  { label: "Alıcı Bilgileri", key: "receiver" },
  { label: "Ek Notlar", key: "notes" },
];

const schema = yup
  .object({
    sender_name: yup.string().required("Ad Soyad gereklidir"),
    sender_phone: yup.string().required("Telefon numarası gereklidir"),
    sender_email: yup
      .string()
      .email("Geçerli bir e-posta adresi giriniz")
      .required("E-posta adresi gereklidir"),
    invoice_type: yup.string().oneOf(["person", "company"]).required(),
    invoice_company_address: yup.string().when("invoice_type", {
      is: (value: string) => value === "company",
      then: (schema) => schema.required("Fatura adresi gereklidir"),
    }),
    receiver_name: yup.string().required("Alıcı adı gereklidir"),
    receiver_phone: yup.string().required("Alıcı telefon numarası gereklidir"),
    receiver_address: yup.string().required("Açık adres girilmesi gereklidir"),
    receiver_city: yup
      .object({
        label: yup.string(),
        value: yup.string(),
      })
      .required(),
    receiver_district: yup
      .object({
        label: yup.string(),
        value: yup.string(),
      })
      .required(),
    receiver_neighborhood: yup.object({
      label: yup.string(),
      value: yup.string(),
    }),
    notes: yup.string(),
  })
  .required();

export type OrderDetailFormData = yup.InferType<typeof schema>;

export default function ReceiverForm() {
  const [step, setStep] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [neighborhoods, setNeighborhoods] = useState<AutoCompleteOption[]>([]);

  const {
    cartState: { cartItems },
  } = useCart();

  const { city, district, neighborhood, street, postal_code } =
    getLocationVariables(cartItems[0].deliveryLocation);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<OrderDetailFormData>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      sender_name: "",
      sender_phone: "",
      sender_email: "",
      invoice_type: "person",
      invoice_company_address: "",
      receiver_name: "",
      receiver_phone: "",
      notes: "",
      receiver_city: city
        ? {
            label: city,
            value: city,
          }
        : null,
      receiver_district: district
        ? {
            label: district,
            value: district,
          }
        : null,
      receiver_neighborhood: neighborhood
        ? {
            label: neighborhood,
            value: neighborhood,
          }
        : null,
      receiver_address: getAddressString(street, postal_code),
    },
  });

  const invoiceType = watch("invoice_type");

  const placeData = parseJson(
    cartItems[0].tenant.tenants[0].tenant_shipping_places?.[0]?.places
  );

  const availableDistricts = getAvailableDistricts(placeData);

  const onSubmit = (data: OrderDetailFormData) => {
    console.log(data);
    // Handle form submission
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const renderStepContent = (stepNumber: number) => {
    const variants = {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 50 },
    };

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={stepNumber}
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          {stepNumber === 1 && (
            <div className="space-y-4">
              <div className="space-y-4">
                <Controller
                  name="sender_name"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      className="h-12 rounded-sm"
                      {...field}
                      error={!!error?.message}
                      errorMessage={error?.message}
                      label="Ad Soyad"
                      id="sender_name"
                      placeholder="Lütfen adınızı ve soyadınızı giriniz."
                      icon={<User />}
                    />
                  )}
                />
                <Controller
                  name="sender_phone"
                  control={control}
                  render={({
                    field: { name, value, onChange },
                    fieldState: { error },
                  }) => (
                    <PhoneInput
                      className="h-12 rounded-sm"
                      name={name}
                      error={!!error?.message}
                      errorMessage={error?.message}
                      label="Telefon Numarası"
                      id="sender_phone"
                      placeholder="Telefon numarası giriniz."
                      onChange={onChange}
                      value={value}
                      icon={<Phone />}
                    />
                  )}
                />
                <Controller
                  name="sender_email"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      className="h-12 rounded-sm"
                      {...field}
                      error={!!error?.message}
                      errorMessage={error?.message}
                      label="E-posta Adresi"
                      id="sender_email"
                      type="email"
                      placeholder="E-posta Adresi"
                      icon={<Mail />}
                    />
                  )}
                />
              </div>

              <Controller
                name="invoice_type"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <div>
                    <Label
                      htmlFor="invoice_type"
                      className="mt-0 text-gray-700"
                    >
                      Fatura Türü
                    </Label>
                    <div className="space-x-2">
                      <RadioGroup
                        {...field}
                        onValueChange={field.onChange}
                        id="invoice_type"
                        defaultValue="person"
                        defaultChecked={true}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="person" id="person" />
                          <Label htmlFor="person">Bireysel</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="company" id="company" />
                          <Label htmlFor="company">Kurumsal</Label>
                        </div>
                      </RadioGroup>
                      {error && (
                        <div className="text-red-500 text-sm mt-2">
                          {error.message}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              />

              {invoiceType === "company" && (
                <Controller
                  name="invoice_company_address"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <Textarea
                      {...field}
                      error={!!error?.message}
                      errorMessage={error?.message}
                      label="Fatura Adresi"
                      id="invoice_company_address"
                      placeholder="Fatura Adresi"
                      inputClass="rounded-sm"
                    />
                  )}
                />
              )}
            </div>
          )}

          {stepNumber === 2 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <Controller
                  name="receiver_name"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      className="h-12 rounded-sm"
                      {...field}
                      label="Alıcı Adı"
                      error={!!error?.message}
                      errorMessage={error?.message}
                      id="receiver_name"
                      placeholder="Alıcı Adı"
                      icon={<User />}
                    />
                  )}
                />
                <Controller
                  name="receiver_phone"
                  control={control}
                  render={({
                    field: { onChange, name, value },
                    fieldState: { error },
                  }) => (
                    <PhoneInput
                      className="h-12 rounded-sm"
                      label="Telefon Numarası"
                      error={!!error?.message}
                      errorMessage={error?.message}
                      name={name}
                      placeholder="Telefon Numarası giriniz."
                      id="receiver_phone"
                      onChange={onChange}
                      value={value}
                      icon={<Phone />}
                    />
                  )}
                />

                <Controller
                  name="receiver_city"
                  control={control}
                  render={({ field }) => (
                    <AutoComplete
                      {...field}
                      buttonClass="h-12 rounded-sm border-2 py-1 px-3 focus-visible:ring-2"
                      id="receiver_city"
                      label="Şehir"
                      placeholder="Şehir seçiniz"
                      disabled
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
                  render={({ field }) => (
                    <AutoComplete
                      {...field}
                      buttonClass="h-12 rounded-sm border-2 py-1 px-3 focus-visible:ring-2"
                      id="receiver_district"
                      label="İlçe"
                      placeholder="İlçe seçiniz"
                      disabled={!!district}
                      onChange={(value: AutoCompleteOption) => {
                        if (value) {
                          setValue("receiver_neighborhood", null);
                        }

                        const availableNeighborhoods =
                          getAvailableNeighborhoods(
                            placeData,
                            value?.value as string
                          );
                        setNeighborhoods(
                          availableNeighborhoods?.map((neighborhood) => ({
                            label: neighborhood,
                            value: neighborhood,
                          })) || []
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
                  render={({ field }) => (
                    <AutoComplete
                      {...field}
                      buttonClass="h-12 rounded-sm border-2 py-1 px-3 focus-visible:ring-2"
                      id="receiver_neighborhood"
                      label="Mahalle"
                      placeholder="Mahalle seçiniz"
                      onChange={field.onChange}
                      disabled={!!neighborhood}
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
                <Alert variant="informative" className="mt-2">
                  <LucideCopy />
                  <AlertTitle>Dikkat !</AlertTitle>
                  <AlertDescription>
                    Bilgiler seçtiğiniz gönderim yerine göre otomatik olarak
                    doldurulmuştur. Lütfen kontrol ediniz.
                  </AlertDescription>
                </Alert>
                <Controller
                  name="receiver_address"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <Textarea
                      {...field}
                      error={!!error?.message}
                      errorMessage={error?.message}
                      label="Açık adres"
                      id="receiver_address"
                      placeholder="Açık adres giriniz."
                      inputClass="rounded-sm"
                    />
                  )}
                />
              </div>
            </div>
          )}

          {stepNumber === 3 && (
            <div className="space-y-6">
              <Controller
                name="notes"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Textarea
                    {...field}
                    error={!!error?.message}
                    errorMessage={error?.message}
                    id="notes"
                    placeholder="Teslimat için ek notunuz varsa buraya yazabilirsiniz."
                    rows={4}
                  />
                )}
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="container mx-auto sm:p-4">
      <div className="mb-8">
        <div className="flex justify-between">
          {stepperData.map((data, i) => (
            <div
              key={data.key}
              className={`w-1/3 text-center select-none lg:text-base text-sm flex gap-1 justify-center whitespace-nowrap ${
                i < step ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {data.label.split(" ").map((word, j) => (
                <div
                  key={j}
                  className={
                    word === "Bilgileri"
                      ? "hidden lg:inline-block"
                      : "inline-block"
                  }
                >
                  {word}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="w-full bg-muted h-2 mt-2 rounded-full overflow-hidden">
          <div
            className="bg-primary h-full transition-all duration-300 ease-in-out"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:grid lg:grid-cols-3 lg:gap-8"
      >
        <div className="lg:col-span-3 space-y-8">
          {renderStepContent(step)}

          <div className="flex justify-between mt-8">
            {step > 1 && (
              <Button type="button" onClick={prevStep} variant="outline">
                Geri
              </Button>
            )}
            {step < 3 ? (
              <Button type="button" onClick={nextStep} className="ml-auto">
                İleri
              </Button>
            ) : (
              <Button type="submit" className="ml-auto">
                Ödemeye Geç
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
