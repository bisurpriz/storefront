import { InferType, object, string } from "yup";

const creditCardSchema = object({
  creditCardNumber: string()
    .required("Kart numarası zorunludur")
    .test("test-number", "Geçersiz kart numarası", (value) => {
      if (!value) return false;
      const cleanNumber = value.replace(/\s+/g, "");
      return cleanNumber.startsWith("34") || cleanNumber.startsWith("37")
        ? cleanNumber.length === 15
        : cleanNumber.length === 16;
    }),
  creditCardName: string()
    .required("Kart üzerindeki isim zorunludur")
    .min(5, "İsim en az 5 karakter olmalıdır")
    .matches(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, "Sadece harf kullanılabilir"),
  creditCardDate: string()
    .required("Son kullanma tarihi geçersiz")
    .test("test-date", "Geçersiz tarih", (value) => {
      if (!value) return false;
      const [month, year] = value.split("/");
      if (!month || !year) return false;

      const currentYear = new Date().getFullYear() % 100;
      const monthNum = Number(month);
      const yearNum = Number(year);

      return (
        yearNum >= currentYear &&
        monthNum >= 1 &&
        monthNum <= 12 &&
        (yearNum > currentYear ||
          (yearNum === currentYear && monthNum >= new Date().getMonth() + 1))
      );
    }),
  creditCardCvv: string()
    .required("CVV zorunludur")
    .matches(/^\d{3}$/, "CVV 3 haneli olmalıdır"),
});

export type CreditCardForm = InferType<typeof creditCardSchema>;
export { creditCardSchema };
