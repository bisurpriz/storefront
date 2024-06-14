import { post } from "@/app/iyzico-payment/actions";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const url = await request.text();

  const params = new URLSearchParams(url);

  const paramsObject = {};
  params.forEach((value, key) => {
    paramsObject[key] = value;
  });

  // post to https://api.iyzipay.com/payment/3dsecure/auth

  const response: any = await post("/payment/3dsecure/auth", {
    paymentId: paramsObject["paymentId"],
    conversationData: paramsObject["conversationData"],
  });

  if (response.status === "success") {
    return NextResponse.redirect(request.url + "/cart/complete");
  }

  console.log(response, "response");

  console.log(paramsObject, "paramsObject");
}
