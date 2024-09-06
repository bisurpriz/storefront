import { boolean, object, string } from "yup";

export const OrderDetailSchema = object({
  city: object().required("İl alanı zorunludur."),
  district: object().required("İlçe alanı zorunludur."),
  quarter: object().required("Mahalle alanı zorunludur."),
  address: string().required("Adres alanı zorunludur."),
  receiver_name: string().required("Alıcı adı zorunludur."),
  receiver_phone: string().required("Alıcı telefonu zorunludur."),
  sender_name: string().required("Gönderici adı zorunludur."),
  sender_phone: string().required("Gönderici telefonu zorunludur."),
  sender_email: string()
    .required("Gönderici e-posta adresi zorunludur.")
    .email("Geçerli bir e-posta adresi giriniz."),
  address_title: string().optional().nullable(),
  saved_address: object().optional().nullable(),
  wantToSaveAddress: boolean().optional().nullable(),
  invoice_type: string()
    .default("person")
    .equals(["person", "company"], "Invalid invoice type"),
  invoice_address: string().when("invoice_type", {
    is: "person",
    then: (schema) => schema.required("Fatura adresi zorunludur."),
    otherwise: (schema) => schema.optional().nullable(),
  }),
  invoice_company_name: string().when("invoice_type", {
    is: "company",
    then: (schema) => schema.required("Firma adı zorunludur."),
    otherwise: (schema) => schema.optional().nullable(),
  }),
  invoice_company_tax_number: string().when("invoice_type", {
    is: "company",
    then: (schema) => schema.required("Vergi numarası zorunludur."),
    otherwise: (schema) => schema.optional().nullable(),
  }),
  invoice_company_tax_office: string().when("invoice_type", {
    is: "company",
    then: (schema) => schema.required("Vergi dairesi zorunludur."),
    otherwise: (schema) => schema.optional().nullable(),
  }),
  invoice_company_address: string().when("invoice_type", {
    is: "company",
    then: (schema) => schema.required("Firma adresi zorunludur."),
    otherwise: (schema) => schema.optional().nullable(),
  }),
  invoice_company_city: string().when("invoice_type", {
    is: "company",
    then: (schema) => schema.required("Firma adresi zorunludur."),
    otherwise: (schema) => schema.optional().nullable(),
  }),
  invoice_company_district: string().when("invoice_type", {
    is: "company",
    then: (schema) => schema.required("Firma adresi zorunludur."),
    otherwise: (schema) => schema.optional().nullable(),
  }),
});
