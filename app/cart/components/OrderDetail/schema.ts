import { object, string } from "yup";

const phone_regex = new RegExp("^(0[1-9][0-9]{9})$|^(\\+90[1-9][0-9]{9})$");

export const orderDetailSchema = object({
  sender_name: string().required("Ad Soyad gereklidir"),
  sender_phone: string()
    .matches(phone_regex, "Geçerli bir telefon numarası giriniz")
    .required("Telefon numarası gereklidir"),
  sender_email: string()
    .email("Geçerli bir e-posta adresi giriniz")
    .required("E-posta adresi gereklidir"),
  invoice_type: string().oneOf(["person", "company"]).required(),
  invoice_company_address: string().when("invoice_type", {
    is: (value: string) => value === "company",
    then: (schema) => schema.required("Fatura adresi gereklidir"),
  }),
  invoice_company_name: string().when("invoice_type", {
    is: (value: string) => value === "company",
    then: (schema) => schema.required("Firma adı gereklidir"),
  }),
  invoice_tax_number: string().when("invoice_type", {
    is: (value: string) => value === "company",
    then: (schema) => schema.required("Vergi numarası gereklidir"),
  }),
  invoice_tax_office: string().when("invoice_type", {
    is: (value: string) => value === "company",
    then: (schema) => schema.required("Vergi dairesi gereklidir"),
  }),
  receiver_name: string().required("Alıcı adı gereklidir"),
  receiver_phone: string()
    .matches(phone_regex, "Geçerli bir telefon numarası giriniz")
    .required("Telefon numarası gereklidir"),
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
  place_id: string().nullable(),
}).required();
