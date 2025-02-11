"use client";

import {
  getAddressString,
  getAvailableDistricts,
  getAvailableNeighborhoods,
  getLocationVariables,
} from "@/app/(feed)/components/utils/validateLocation";
import { IPlace } from "@/common/types/Product/product";
import { AutoCompleteOption } from "@/components/Autocomplete";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import { parseJson } from "@/utils/format";
import { yupResolver } from "@hookform/resolvers/yup";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { useForm } from "react-hook-form";
import { orderDetailSchema } from "../schema";
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

  return -1;
};

export default function ReceiverForm() {
  const [isPending, startTransition] = useTransition();
  const [neighborhoods, setNeighborhoods] = useState<AutoCompleteOption[]>([]);
  const [selectedCargoLocation, setSelectedCargoLocation] = useState<IPlace>();
  const [selectedInvoiceType, setSelectedInvoiceType] =
    useState<InvoiceType>("person");

  const searchParams = useSearchParams();
  const router = useRouter();
  const step = Number(searchParams.get("step") || "1");

  const {
    cartState: { cartItems },
  } = useCart();

  const updateStep = useCallback(
    (newStep: number) => {
      const params = new URLSearchParams(searchParams);
      params.set("step", newStep.toString());
      router.replace(`?${params.toString()}`);
    },
    [router, searchParams],
  );

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
    getValues,
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

  const onSubmit = handleSubmit(async (data) => {
    try {
      const fieldsToValidate = getFieldsToValidate();
      const isValid = await trigger(fieldsToValidate);

      if (!isValid) {
        toast({
          title: `Lütfen ${STEPPER_DATA[step - 1].label} bilgilerini eksiksiz doldurunuz`,
          variant: "destructive",
        });
        return;
      }

      if (step === 2) {
        startTransition(() => {
          sessionStorage.setItem("order-detail-form", JSON.stringify(data));
        });
      }
    } catch (error) {
      toast({
        title: "Bir hata oluştu. Lütfen tekrar deneyiniz.",
        variant: "destructive",
      });
    }
  });

  // Her adımın validasyonunu kontrol et
  const validateStep = useCallback(async () => {
    const fieldsToValidate = getFieldsToValidate();
    const isValid = await trigger(fieldsToValidate);

    if (!isValid) {
      const errorMessages = Object.entries(errors)
        .filter(([key]) => fieldsToValidate.includes(key as FormFields))
        .map(([_, value]) => value.message)
        .join(", ");

      toast({
        title: `Lütfen eksik alanları doldurunuz`,
        description: errorMessages,
        variant: "destructive",
      });
      return false;
    }

    return true;
  }, [errors, getFieldsToValidate, trigger]);

  const nextStep = useCallback(async () => {
    const isStepValid = await validateStep();
    if (!isStepValid) return false;

    if (step === 1) {
      updateStep(2);
      return true;
    }

    if (step === 2) {
      startTransition(() => {
        sessionStorage.setItem(
          "order-detail-form",
          JSON.stringify(getValues()),
        );
      });
      return true;
    }

    return false;
  }, [step, validateStep, getValues, updateStep]);

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

  const prevStep = useCallback(() => {
    if (step > 1) {
      updateStep(step - 1);
    }
  }, [step, updateStep]);

  // Expose current step and nextStep function through window
  useEffect(() => {
    (window as any).handleReceiverFormNextStep = nextStep;
    (window as any).currentFormStep = step;
    return () => {
      delete (window as any).handleReceiverFormNextStep;
      delete (window as any).currentFormStep;
    };
  }, [nextStep, step]);

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
    <div className="relative p-4 mx-auto sm:p-6">
      {(isPending || isSubmitting) && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm">
          <div className="w-16 h-16 border-4 rounded-full animate-spin border-primary border-t-transparent" />
        </div>
      )}

      <ProgressBar step={step} />

      <form onSubmit={onSubmit} className="space-y-8" id="order-detail-form">
        {renderStepContent(step)}

        <div className="flex justify-between mt-8">
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
        </div>
      </form>
    </div>
  );
}
