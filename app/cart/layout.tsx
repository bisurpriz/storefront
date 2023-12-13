"use client";

import { FormProvider, useForm } from "react-hook-form";
import { object, number, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { OrderDetailPartialFormData } from "./components/OrderDetail/ReceiverForm";

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

const CartLayout = ({
  children,
  summary,
  steps,
}: {
  children: React.ReactNode;
  summary: React.ReactNode;
  steps: React.ReactNode;
}) => {
  const methods = useForm<OrderDetailPartialFormData>({
    defaultValues,
    mode: "onChange",
    delayError: 500,
    resolver: yupResolver(OrderDetailSchema),
  });

  return (
    <FormProvider {...methods}>
      <span className="block text-3xl mb-3">{steps}</span>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`col-span-2 md:col-span-2 flex flex-col gap-3`}>
          {children}
        </div>
        <div className="max-md:fixed max-md:w-full max-md:left-0 bg-white max-md:px-4 md:h-fit max-md:bottom-0 col-span-1 md:relative max-md:shadow-lg">
          {summary}
        </div>
      </div>
    </FormProvider>
  );
};

export default CartLayout;
