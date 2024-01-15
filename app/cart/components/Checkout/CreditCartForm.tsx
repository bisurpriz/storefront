"use client";

import CreditCardInput from "@/components/CreditCardInput";
import CreditCardDateInput from "@/components/CreditCardInput/CreditCartDateInput";
import TextField from "@/components/TextField";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { createOrderAction, removeCartWithRedis } from "../../actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const schema = object().shape({
  creditCartNumber: string().test(
    "test-number",
    "Geçersiz kart numarası",
    (value) => {
      if (value) {
        return value.replace(/\s+/g, "").length === 16;
      } else {
        return false;
      }
    }
  ),
  creditCartName: string().required("Kart üzerindeki isim zorunludur"),
  creditCartDate: string().test("test-date", "Geçersiz tarih", (value) => {
    const splitted = value?.split("/");
    if (splitted) {
      const month = parseInt(splitted[0]);
      const year = parseInt(splitted[1]);
      const date = new Date();
      const currentYear = date.getFullYear().toString().slice(-2);
      if (year > parseInt(currentYear) && month <= 12) {
        return true;
      }

      return false;
    }
  }),
  creditCartCvv: string()
    .required("CVV zorunludur")
    .test("test-cvv", "Geçersiz CVV", (value) => {
      if (value) {
        return value.replace(/\s+/g, "").length === 3;
      } else {
        return false;
      }
    }),
});

const CreditCartForm = () => {
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const { push } = useRouter();

  const onSubmit = async (data: any) => {
    if (data) {
      const serialize = localStorage.getItem("detail-data");

      const detailData = JSON.parse(serialize);
      // TODO: cartItems
      const cartItems = [];
      toast
        .promise(
          createOrderAction(cartItems, detailData),
          {
            loading: "Ödeme yapılıyor...",
            success: "Ödeme başarılı",
            error: "Ödeme başarısız",
          },
          {
            icon: "💳",
            style: {
              minWidth: "250px",
            },
          }
        )
        .then(() => {
          localStorage.removeItem("detail-data");
          removeCartWithRedis();
          push("/cart/complete");
        });
    }
  };

  return (
    <form
      id="credit-card-form"
      name="credit-card-form"
      onSubmit={handleSubmit(onSubmit)}
      className="w-full relative flex flex-col justify-center items-center px-4 py-8 bg-white shadow-lg rounded-lg border border-gray-200 gap-4"
    >
      <Controller
        name="creditCartNumber"
        control={control}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <CreditCardInput
            onChange={onChange}
            error={!!error}
            errorMessage={error?.message}
          />
        )}
      />
      <div className="flex flex-col md:flex-row md:justify-start md:items-start w-full gap-4">
        <Controller
          name="creditCartName"
          control={control}
          render={({ field: { onChange }, fieldState: { error } }) => (
            <TextField
              fullWidth
              label="Kart Üzerindeki İsim"
              placeholder="Kart Üzerindeki İsim"
              onChange={onChange}
              error={!!error}
              errorMessage={error?.message}
            />
          )}
        />
        <Controller
          name="creditCartDate"
          control={control}
          render={({ field: { onChange }, fieldState: { error } }) => (
            <CreditCardDateInput
              error={!!error}
              errorMessage={error?.message}
              onChange={(e, val) => onChange(val)}
            />
          )}
        />
        <Controller
          name="creditCartCvv"
          control={control}
          render={({ field: { onChange }, fieldState: { error } }) => (
            <TextField
              label="CVV"
              placeholder="123"
              maxLength={3}
              onChange={(e) => {
                const inputValue = e.target.value.replace(/\D/g, "");
                onChange(inputValue);
              }}
              error={!!error}
              errorMessage={error?.message}
            />
          )}
        />
      </div>
    </form>
  );
};

export default CreditCartForm;
