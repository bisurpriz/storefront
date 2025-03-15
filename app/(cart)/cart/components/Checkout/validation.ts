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
    .test("test-cvv", "CVV geçersiz", function (value) {
      if (!value) return false;

      // Get the credit card number from the form values
      const { creditCardNumber } = this.parent;

      if (!creditCardNumber) return /^\d{3}$/.test(value); // Default to 3 digits

      const cleanNumber = creditCardNumber.replace(/\s+/g, "");

      // American Express cards have 4-digit CVV
      if (cleanNumber.startsWith("34") || cleanNumber.startsWith("37")) {
        return /^\d{4}$/.test(value);
      }

      // Other cards have 3-digit CVV
      return /^\d{3}$/.test(value);
    }),
});

export type CreditCardForm = InferType<typeof creditCardSchema>;
export { creditCardSchema };
