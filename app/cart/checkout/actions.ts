import { getIpAddress } from "@/app/actions";
import { microtime } from "@/utils/microtime";
import axios from "axios";
import crypto from "crypto";

type Props = {
  email: string;
  payment_amount: number;
  non_3d: boolean;
  cc_owner: string;
  cc_number: string;
  expiry_month: string;
  expiry_year: string;
  cvv: string;
  user_address: string;
  user_basket: string;
  user_name: string;
  user_phone: string;
  card_type?: RequestPayload["card_type"];
};

interface TokenPayload {
  merchant_id: string;
  user_ip: string;
  merchant_oid: string;
  email: string;
  payment_amount: number;
  payment_type: string;
  installment_count: number;
  currency: string;
  test_mode: number;
  non_3d: boolean;
  request_exp_date: number;
}

interface RequestPayload extends TokenPayload {
  paytr_token: string;
  card_type?:
    | "advantage"
    | "axess"
    | "combo"
    | "bonus"
    | "cardfinans"
    | "maximum"
    | "paraf"
    | "world"
    | "saglamkart"
    | "";
  client_lang?: "tr" | "en";
  non3d_test_failed?: 0 | 1;
  cc_owner: string;
  cc_number: string;
  expiry_month: string;
  expiry_year: string;
  cvv: string;
  merchant_ok_url: string;
  merchant_fail_url: string;
  user_name: string;
  user_address: string;
  user_phone: string;
  user_basket: string;
  debug_on: 1 | 0;
  sync_mode: 1 | 0;
  token: string;
}

const CURRENCY = "TL";

export async function payment({
  email,
  payment_amount,
  non_3d,
  cc_number,
  cc_owner,
  cvv,
  expiry_month,
  expiry_year,
  user_address,
  user_basket,
  user_name,
  user_phone,
  card_type = "",
}: Props) {
  "use server";

  const user_ip =
    process.env.NODE_ENV === "development" ? "127.0.0.1" : await getIpAddress();

  const merchant_oid = "IN" + microtime();

  const request_exp_date = Math.floor(Date.now() / 1000) + 300;
  const merchant_id = process.env.MERCHANT_ID;

  const tokenPayload: TokenPayload = {
    merchant_id,
    user_ip,
    merchant_oid,
    email,
    payment_amount,
    payment_type: "card",
    installment_count: 0,
    currency: CURRENCY,
    test_mode: 1,
    non_3d,
    request_exp_date,
  };

  const { paytr_token, token } = createPaymentToken(tokenPayload);

  const requestPayload: RequestPayload = {
    ...tokenPayload,
    paytr_token,
    cc_number,
    cc_owner,
    expiry_month,
    expiry_year,
    cvv,
    debug_on: 1,
    merchant_fail_url: process.env.MERCHANT_FAIL_URL,
    merchant_ok_url: process.env.MERCHANT_OK_URL,
    sync_mode: 0,
    user_address,
    user_basket,
    user_name,
    user_phone,
    card_type,
    client_lang: "tr",
    // Non 3D işlemde, başarısız işlem durumunu test etmek için 1 gönderilir
    // (test_mode ve non_3d değerleri 1 ise dikkate alınır!)
    non3d_test_failed: 1,
    token,
  };
  console.log(requestPayload);
  try {
    const response = await axios.post(
      process.env.PAYTR_PAYMENT_URL,
      requestPayload
    );

    return response.data;
  } catch (error) {
    return {
      error: error.message,
    };
  }
}

const createPaymentToken = (data: TokenPayload) => {
  const {
    merchant_id,
    user_ip,
    merchant_oid,
    email,
    payment_amount,
    non_3d,
    request_exp_date,
    currency,
    installment_count,
    payment_type,
    test_mode,
  } = data;

  const merchant_key = process.env.MERCHANT_KEY;
  const merchant_salt = process.env.MERCHANT_SALT;

  const hashSTR = `${merchant_id}${user_ip}${merchant_oid}${email}${payment_amount}${payment_type}${installment_count}${currency}${test_mode}${non_3d}${request_exp_date}`;

  const paytr_token = hashSTR + merchant_salt;

  const token = crypto
    .createHmac("sha256", merchant_key)
    .update(paytr_token)
    .digest("base64");

  return {
    paytr_token,
    token,
  };
};
