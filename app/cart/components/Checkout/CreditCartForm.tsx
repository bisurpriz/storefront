"use client";

import CreditCardInput from "@/components/CreditCardInput";
import CreditCardDateInput from "@/components/CreditCardInput/CreditCartDateInput";
import TextField from "@/components/TextField";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";

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
      const month = splitted[0];
      const year = splitted[1];
      if (month && year) {
        const currentYear = new Date().getFullYear().toString().slice(2);
        if (Number(year) < Number(currentYear)) {
          return false;
        }
        if (Number(month) > 12 || Number(month) < 1) {
          return false;
        }
        return true;
      }
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

const CreditCartForm = ({ ip }: { ip: string }) => {
  console.log(ip);
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const {
    clearCart,
    cartState: { cartItems },
  } = useCart();

  const { push } = useRouter();

  const onSubmit = async (data: any) => {
    if (data) {
      const serialize = localStorage.getItem("detail-data");
      const detailData = JSON.parse(serialize);
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
