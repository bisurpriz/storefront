import { object, string } from "yup";

export const orderDetailSchema = object({
  sender_name: string().required("Ad Soyad gereklidir"),
  sender_phone: string().required("Telefon numarası gereklidir"),
  sender_email: string()
    .email("Geçerli bir e-posta adresi giriniz")
    .required("E-posta adresi gereklidir"),
  invoice_type: string().oneOf(["person", "company"]).required(),
  invoice_company_address: string().when("invoice_type", {
    is: (value: string) => value === "company",
    then: (schema) => schema.required("Fatura adresi gereklidir"),
  }),
  receiver_name: string().required("Alıcı adı gereklidir"),
  receiver_phone: string().required("Alıcı telefon numarası gereklidir"),
  receiver_address: string().required("Açık adres girilmesi gereklidir"),
  receiver_city: object({
    label: string(),
    value: string(),
  }).required("Lütfen il seçiniz"),
  receiver_district: object({
    label: string(),
    value: string(),
  }).required("Lütfen ilçe seçiniz"),
  receiver_neighborhood: object({
    label: string(),
    value: string(),
  }).required("Lütfen mahalle seçiniz"),

  notes: string(),
}).required();
