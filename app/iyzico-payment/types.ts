export enum Locale {
  TR = "tr",
  EN = "en",
}

export interface BinCheckRequest {
  binNumber: string;
  price?: string;
}

export type CardAssociation =
  | "VISA"
  | "MASTER_CARD"
  | "TROY"
  | "AMERICAN_EXPRESS";
export interface BinCheckResponse {
  binNumber: string;
  cardType: string;
  cardAssociation: CardAssociation;
  cardFamily: string;
  bankName: string;
  bankCode: number;
  commercial: number;
  status: string;
  locale: string;
  systemTime: number;
}

export interface BasketItem {
  id: string;
  name: string;
  category1: string;
  category2: string;
  itemType: string;
  price: string;
}

export interface ShippingOrBillingAddress {
  contactName: string;
  city: string;
  country: string;
  address: string;
  zipCode?: string;
}

export interface Buyer {
  registrationAddress: string;
  ip: string;
  email: string;
  country: string;
  city: string;
  identityNumber: string;
  surname: string;
  name: string;
  id: string;
  zipCode?: string;
  lastLoginDate?: string;
  registrationDate?: string;
  gsmNumber: string;
}

export interface PaymentCard {
  cardHolderName: string;
  cardNumber: string;
  expireYear: string;
  expireMonth: string;
  cvc: string;
}
export interface Initialize3dsPaymentRequest {
  price: string;
  billingAddress: ShippingOrBillingAddress;
  buyer: Buyer;
  locale: Locale;
  paymentCard: PaymentCard;
  installment: number;
  currency: string;
  paidPrice: string;
  shippingAddress: ShippingOrBillingAddress;
  basketItems: BasketItem[];
  paymentSource?:
    | "SHOPIFY"
    | "MAGENTO"
    | "PRESTASHOP"
    | "WOOCOMMERCE"
    | "OPENCART";
  callbackUrl: string;
  paymentGroup?: "PRODUCT" | "LISTING" | "SUBSCRIPTION";
  paymentChannel?:
    | "WEB"
    | "MOBILE"
    | "MOBILE_WEB"
    | "MOBILE_IOS"
    | "MOBILE_ANDROID"
    | "MOBILE_WINDOWS"
    | "MOBILE_TABLET"
    | "MOBILE_PHONE";
  basketId: string;
  conversationId: string;
  registerCard?: number;
  cardAlias?: number;
  subMerchantKey?: string;
  subMerchantPrice?: string;
}

export interface Initialize3dsPaymentResponse {
  status: string;
  errorCode: string;
  errorMessage: string;
  errorGroup: string;
  locale: string;
  systemTime: number;
  conversationId: string;
  threeDSHtmlContent: string;
}
