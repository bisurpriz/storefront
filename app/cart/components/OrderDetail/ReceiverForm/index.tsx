"use client";

import {
  getAddressString,
  getAvailableDistricts,
  getAvailableNeighborhoods,
  getLocationVariables,
} from "@/app/(feed)/components/utils/validateLocation";
import { CartStepPaths } from "@/app/cart/constants";
import { IPlace } from "@/common/types/Product/product";
import { AutoCompleteOption } from "@/components/Autocomplete";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import { parseJson } from "@/utils/format";
import { yupResolver } from "@hookform/resolvers/yup";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { useForm } from "react-hook-form";
import { orderDetailSchema } from "../schema";
import { NotesStep } from "./components/NotesStep";
import { ProgressBar } from "./components/ProgressBar";
import { ReceiverInfoStep } from "./components/ReceiverInfoStep";
import { SenderInfoStep } from "./components/SenderInfoStep";
import { MOTION_VARIANTS, STEPPER_DATA } from "./constants";
import { InvoiceType, OrderDetailFormData } from "./types";

type FormFields = keyof OrderDetailFormData;

// Form adımlarındaki alanları tanımla
const STEP_FIELDS: {
  sender: FormFields[];
  company: FormFields[];
  receiver: FormFields[];
  notes: FormFields[];
} = {
  sender: [
    "sender_name",
    "sender_phone",
    "sender_email",
    "invoice_type",
    "invoice_company_address",
  ],
  company: ["invoice_company_name", "invoice_tax_number", "invoice_tax_office"],
  receiver: [
    "receiver_name",
    "receiver_phone",
    "receiver_city",
    "receiver_district",
    "receiver_neighborhood",
    "receiver_address",
  ],
  notes: ["notes"],
} as const;

const findFirstErrorStep = (errors: Record<string, any>): number => {
  const errorFields = Object.keys(errors) as FormFields[];
  if (!errorFields.length) return -1;

  // Her adımın alanlarını kontrol et
  if (
    errorFields.some((field) =>
      [...STEP_FIELDS.sender, ...STEP_FIELDS.company].includes(field),
    )
  )
    return 1;
  if (errorFields.some((field) => STEP_FIELDS.receiver.includes(field)))
    return 2;
  if (errorFields.some((field) => STEP_FIELDS.notes.includes(field))) return 3;

  return -1;
};

export default function ReceiverForm() {
  const [step, setStep] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [neighborhoods, setNeighborhoods] = useState<AutoCompleteOption[]>([]);
  const [selectedCargoLocation, setSelectedCargoLocation] = useState<IPlace>();
  const [selectedInvoiceType, setSelectedInvoiceType] =
    useState<InvoiceType>("person");

  const {
    cartState: { cartItems },
  } = useCart();
  const { push } = useRouter();

  // Lokasyon bilgilerini memo'la
  const { city, district, neighborhood, street, postal_code } = useMemo(
    () => getLocationVariables(cartItems[0].deliveryLocation),
    [cartItems, step],
  );
  // Aynı gün teslimat kontrolünü memo'la
  const hasSameDayProduct = useMemo(
    () =>
      cartItems.some(
        (item) =>
          item.delivery_type === "SAME_DAY" && item.delivery_time_ranges,
      ),
    [cartItems],
  );

  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
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
      receiver_city: city ? { label: city, value: city } : null,
      receiver_district: district ? { label: district, value: district } : null,
      receiver_neighborhood: neighborhood
        ? { label: neighborhood, value: neighborhood }
        : null,
      receiver_address: getAddressString(street, postal_code),
      place_id: selectedCargoLocation?.placeId,
    },
  });

  const placeData = useMemo(
    () =>
      parseJson(
        cartItems[0].tenant.tenants[0].tenant_shipping_places?.[0]?.places,
      ),
    [cartItems],
  );

  const availableDistricts = useMemo(
    () => getAvailableDistricts(placeData),
    [placeData],
  );

  const onSubmit = handleSubmit(async (data) => {
    try {
      const isValid = await trigger();
      if (!isValid) {
        const errorStep = findFirstErrorStep(errors);
        if (errorStep !== -1) {
          setStep(errorStep);
          toast({
            title: `Lütfen ${STEPPER_DATA[errorStep - 1].label} bilgilerini kontrol ediniz`,
            variant: "destructive",
          });
          return;
        }
      }

      startTransition(() => {
        sessionStorage.setItem("order-detail-form", JSON.stringify(data));
        push(CartStepPaths.CHECKOUT);
      });
    } catch (error) {
      toast({
        title: "Bir hata oluştu. Lütfen tekrar deneyiniz.",
        variant: "destructive",
      });
    }
  });

  useEffect(() => {
    const loadFormData = () => {
      const localData = sessionStorage.getItem("order-detail-form");
      if (localData) {
        const parsedData = JSON.parse(localData);
        Object.keys(parsedData).forEach((key) => {
          setValue(key as keyof OrderDetailFormData, parsedData[key]);
        });
      }
    };

    startTransition(loadFormData);
  }, [setValue]);

  // Mahalle listesini güncelle
  useEffect(() => {
    if (district && !neighborhood) {
      startTransition(() => {
        const availableNeighborhoods = getAvailableNeighborhoods(
          placeData,
          district,
        );
        setNeighborhoods(
          availableNeighborhoods?.map((n) => ({
            label: n,
            value: n,
          })) || [],
        );
      });
    }
  }, [district, neighborhood, placeData]);

  useEffect(() => {
    if (selectedCargoLocation?.placeId && !hasSameDayProduct) {
      const updateLocationFields = () => {
        const city = selectedCargoLocation.address_components.find((ac) =>
          ac.types.includes("administrative_area_level_1"),
        )?.short_name;
        const district = selectedCargoLocation.address_components.find((ac) =>
          ac.types.includes("administrative_area_level_2"),
        )?.short_name;
        const neighborhood = selectedCargoLocation.address_components.find(
          (ac) => ac.types.includes("administrative_area_level_4"),
        )?.short_name;

        setValue("receiver_city", { label: city, value: city });
        setValue("receiver_district", { label: district, value: district });
        setValue("receiver_neighborhood", {
          label: neighborhood,
          value: neighborhood,
        });
        setValue("receiver_address", selectedCargoLocation.label);
      };

      startTransition(updateLocationFields);
    }
  }, [selectedCargoLocation, hasSameDayProduct, setValue]);

  const getFieldsToValidate = () => {
    if (step === 1) {
      return [
        ...STEP_FIELDS.sender,
        ...(selectedInvoiceType === "company" ? STEP_FIELDS.company : []),
      ];
    }
    if (step === 2) {
      return STEP_FIELDS.receiver;
    }
    return [];
  };

  const nextStep = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      const fieldsToValidate = getFieldsToValidate();

      const isStepValid = await trigger(fieldsToValidate);

      if (!isStepValid) {
        toast({
          title: `Lütfen ${STEPPER_DATA[step - 1].label} bilgilerini eksiksiz doldurunuz`,
          variant: "destructive",
        });
        return;
      }

      setStep((prev) => Math.min(prev + 1, 3));
    },
    [step, selectedInvoiceType, trigger],
  );

  const prevStep = useCallback(() => {
    setStep((prev) => Math.max(prev - 1, 1));
  }, []);

  // Form içeriğini render et
  const renderStepContent = useCallback(
    (currentStep: number) => {
      const props = {
        control,
        setValue,
        hasSameDayProduct,
        selectedCargoLocation,
        setSelectedCargoLocation,
        placeData,
        city,
        district,
        neighborhood,
        neighborhoods,
        setNeighborhoods,
        availableDistricts,
        selectedInvoiceType,
        setSelectedInvoiceType,
      };

      return (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={MOTION_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            {currentStep === 1 && <SenderInfoStep {...props} />}
            {currentStep === 2 && <ReceiverInfoStep {...props} />}
            {currentStep === 3 && <NotesStep control={control} />}
          </motion.div>
        </AnimatePresence>
      );
    },
    [
      control,
      setValue,
      hasSameDayProduct,
      selectedCargoLocation,
      placeData,
      city,
      district,
      neighborhood,
      neighborhoods,
      availableDistricts,
      selectedInvoiceType,
    ],
  );

  return (
    <div className="relative mx-auto p-4 sm:p-6">
      {(isPending || isSubmitting) && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      )}

      <ProgressBar step={step} />

      <form onSubmit={onSubmit} className="space-y-8">
        {renderStepContent(step)}

        <div className="mt-8 flex justify-between">
          {step > 1 && (
            <Button
              type="button"
              onClick={prevStep}
              variant="outline"
              className="min-w-[120px]"
              disabled={isSubmitting}
            >
              Geri
            </Button>
          )}

          {step < 3 ? (
            <Button
              type="button"
              onClick={nextStep}
              className="ml-auto min-w-[120px]"
              disabled={isSubmitting}
            >
              İleri
            </Button>
          ) : (
            <Button
              type="submit"
              className="ml-auto min-w-[120px]"
              disabled={isPending || isSubmitting}
            >
              Ödemeye Geç
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
