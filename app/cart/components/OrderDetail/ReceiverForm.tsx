"use client";

import { useEffect, useState, useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  FileDigit,
  LucideCopy,
  Mail,
  Phone,
  Text,
  User,
} from "lucide-react";
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
import { orderDetailSchema } from "./schema";
import { InferType } from "yup";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CartStepPaths } from "../../constants";

const stepperData = [
  { label: "Gönderici Bilgileri", key: "sender" },
  { label: "Alıcı Bilgileri", key: "receiver" },
  { label: "Ek Notlar", key: "notes" },
];

export type OrderDetailFormData = InferType<typeof orderDetailSchema>;

export default function ReceiverForm() {
  const [step, setStep] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [neighborhoods, setNeighborhoods] = useState<AutoCompleteOption[]>([]);
  const [selectedInvoiceType, setSelectedInvoiceType] = useState<
    "person" | "company"
  >("person");

  const {
    cartState: { cartItems },
  } = useCart();

  const { city, district, neighborhood, street, postal_code } =
    getLocationVariables(cartItems[0].deliveryLocation);

  const hasSameDayProduct = cartItems.some((item) => {
    return item.delivery_type === "SAME_DAY" && item.delivery_time_ranges;
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OrderDetailFormData>({
    resolver: yupResolver(orderDetailSchema),
    mode: "onChange",
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

  const placeData = parseJson(
    cartItems[0].tenant.tenants[0].tenant_shipping_places?.[0]?.places
  );

  const availableDistricts = getAvailableDistricts(placeData);
  const { push } = useRouter();
  const onSubmit = (data: OrderDetailFormData) => {
    startTransition(() => {
      if (Object.keys(errors).length) {
        toast.error("Lütfen formu eksiksiz doldurunuz.");
        return;
      }

      sessionStorage.setItem("order-detail-form", JSON.stringify(data));
      push(CartStepPaths.CHECKOUT);
    });
  };

  useEffect(() => {
    startTransition(() => {
      const localData = sessionStorage.getItem("order-detail-form");
      if (localData) {
        const parsedData = JSON.parse(localData);
        Object.keys(parsedData).forEach((key) => {
          setValue(key as keyof OrderDetailFormData, parsedData[key]);
        });
      }
    });
  }, []);

  useEffect(() => {
    startTransition(() => {
      if (district && !neighborhood) {
        const availableNeighborhoods = getAvailableNeighborhoods(
          placeData,
          district
        );
        setNeighborhoods(
          availableNeighborhoods?.map((neighborhood) => ({
            label: neighborhood,
            value: neighborhood,
          })) || []
        );
      }
    });
  }, [district, neighborhood]);

  const nextStep = (e) => {
    e.preventDefault();
    setStep((prev) => prev + 1);
  };
  const prevStep = () => setStep((prev) => prev - 1);

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
                  render={({ field, fieldState: { error, isDirty } }) => {
                    return (
                      <div className="relative">
                        <TextField
                          className="h-12 rounded-sm"
                          {...field}
                          error={!!error?.message}
                          errorMessage={error?.message}
                          label="Ad Soyad"
                          id="sender_name"
                          placeholder="Lütfen adınızı ve soyadınızı giriniz."
                          icon={<User />}
                          dirtyAnimation={isDirty}
                        />
                      </div>
                    );
                  }}
                />
                <Controller
                  name="sender_phone"
                  control={control}
                  render={({
                    field: { name, value, onChange },
                    fieldState: { error, isDirty },
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
                      dirtyAnimation={isDirty}
                    />
                  )}
                />
                <Controller
                  name="sender_email"
                  control={control}
                  render={({ field, fieldState: { error, isDirty } }) => (
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
                      dirtyAnimation={isDirty}
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
                        onValueChange={(value: "person" | "company") => {
                          setSelectedInvoiceType(value);
                          field.onChange(value);
                        }}
                        id="invoice_type"
                        defaultValue="person"
                        defaultChecked={true}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="person" id="person" />
                          <Label
                            className="text-gray-700 text-xs lg:text-sm"
                            htmlFor="person"
                          >
                            Kişi adına
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="company" id="company" />
                          <Label
                            className="text-gray-700 text-xs lg:text-sm"
                            htmlFor="company"
                          >
                            Şirket adına
                          </Label>
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

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Controller
                  name="invoice_company_address"
                  control={control}
                  render={({ field, fieldState: { error, isDirty } }) => (
                    <Textarea
                      {...field}
                      error={!!error?.message}
                      errorMessage={error?.message}
                      label="Fatura Adresi"
                      id="invoice_company_address"
                      placeholder="Fatura Adresi"
                      inputClass="rounded-sm"
                      dirtyAnimation={isDirty}
                      className="col-span-full"
                      rows={3}
                    />
                  )}
                />
                {selectedInvoiceType === "company" && (
                  <>
                    <Controller
                      name="invoice_company_name"
                      control={control}
                      render={({ field, fieldState: { error, isDirty } }) => (
                        <TextField
                          className="h-12 rounded-sm"
                          {...field}
                          error={!!error?.message}
                          errorMessage={error?.message}
                          label="Firma Adı"
                          id="invoice_company_name"
                          placeholder="Firma Adı"
                          icon={<Text />}
                          dirtyAnimation={isDirty}
                        />
                      )}
                    />
                    <Controller
                      name="invoice_tax_number"
                      control={control}
                      render={({ field, fieldState: { error, isDirty } }) => (
                        <TextField
                          className="h-12 rounded-sm"
                          {...field}
                          error={!!error?.message}
                          errorMessage={error?.message}
                          label="Vergi Numarası"
                          id="invoice_tax_number"
                          placeholder="Vergi Numarası"
                          icon={<FileDigit />}
                          dirtyAnimation={isDirty}
                        />
                      )}
                    />
                    <Controller
                      name="invoice_tax_office"
                      control={control}
                      render={({ field, fieldState: { error, isDirty } }) => (
                        <TextField
                          className="h-12 rounded-sm"
                          {...field}
                          error={!!error?.message}
                          errorMessage={error?.message}
                          label="Vergi Dairesi"
                          id="invoice_tax_office"
                          placeholder="Vergi Dairesi"
                          icon={<Building2 />}
                          dirtyAnimation={isDirty}
                        />
                      )}
                    />
                  </>
                )}
              </div>
            </div>
          )}

          {stepNumber === 2 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <Controller
                  name="receiver_name"
                  control={control}
                  render={({ field, fieldState: { error, isDirty } }) => (
                    <TextField
                      className="h-12 rounded-sm"
                      {...field}
                      label="Alıcı Adı"
                      error={!!error?.message}
                      errorMessage={error?.message}
                      id="receiver_name"
                      placeholder="Alıcı Adı"
                      icon={<User />}
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
                      label="Telefon Numarası"
                      error={!!error?.message}
                      errorMessage={error?.message}
                      name={name}
                      placeholder="Telefon Numarası giriniz."
                      id="receiver_phone"
                      onChange={onChange}
                      value={value}
                      icon={<Phone />}
                      dirtyAnimation={isDirty}
                    />
                  )}
                />

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
              </div>
            </div>
          )}

          {stepNumber === 3 && (
            <div className="space-y-6">
              <Controller
                name="notes"
                control={control}
                render={({ field, fieldState: { error, isDirty } }) => (
                  <Textarea
                    {...field}
                    error={!!error?.message}
                    errorMessage={error?.message}
                    id="notes"
                    placeholder="Teslimat için ek notunuz varsa buraya yazabilirsiniz."
                    rows={3}
                    dirtyAnimation={isDirty}
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
    <div className="container mx-auto sm:p-4 relative">
      {isPending && (
        <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-primary" />
        </div>
      )}
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
        id="order-detail-form"
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
