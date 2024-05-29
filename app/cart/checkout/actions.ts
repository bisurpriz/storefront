import { getIpAddress } from "@/app/actions";
import { IPaymentToken } from "@/common/types/Payment/payment";
import { paymentConfig } from "@/config";
import crypto from "crypto";

export async function getPaymentToken() {
  "use server";

  const user_ip = await getIpAddress();

  const payload: IPaymentToken = {
    merchant_id: paymentConfig.merchant_id,
    merchant_key: paymentConfig.merchant_key,
    merchant_salt: paymentConfig.merchant_salt,
    merchant_ok_url: "https://www.paytr.com/",
    merchant_fail_url: "https://www.paytr.com/",
    currency: "TL",
    debug_on: 1,
    email: "enes@enes.com",
    max_installment: 0,
    merchant_oid: Math.random().toString(36).substring(7).toString(),
    no_installment: 1,
    payment_amount: 100,
    test_mode: 1,
    user_basket: "Test",
    user_ip,
    user_name: "Enes",
    user_phone: "5555555555",
    user_address: "Test address",
    paytr_token: "123456",
  };

  const hashSTR = `${payload.merchant_id}${payload.user_ip}${payload.merchant_oid}${payload.email}${payload.payment_amount}${payload.user_basket}${payload.no_installment}${payload.max_installment}${payload.currency}${payload.test_mode}`;
  const paytr_token = hashSTR + payload.merchant_salt;

  const token = crypto
    .createHmac("sha256", paymentConfig.merchant_key)
    .update(paytr_token)
    .digest("base64");

  payload.paytr_token = token;

  const formData = new FormData();

  for (const key in payload) {
    formData.append(key, payload[key]);
  }

  const response = await fetch(paymentConfig.request_url, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(payload as any).toString(),
  });

  const data = await response.json();
  return data;
}
