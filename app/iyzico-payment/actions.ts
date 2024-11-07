"use server";

import axios, { AxiosResponse } from "axios";
import {
  BIN_CHECK_URL,
  INITIALIZE_3DS_URL,
  INSTALLMENT_URL,
} from "./constants";
import { generateAuthorizationHeaderV2 } from "./utils";
import {
  BinCheckRequest,
  BinCheckResponse,
  Initialize3dsPaymentRequest,
  Initialize3dsPaymentResponse,
} from "./types";
import { cookies } from "next/headers";
import { CookieTokens } from "../@auth/contants";

const iyzicoUrl = process.env.IYZICO_URL;

export const iyzico = axios.create({
  baseURL: iyzicoUrl,
});

export const post = async <T, R>(url: string, data: T) => {
  try {
    const response = await iyzico.post<T, AxiosResponse<R>>(url, data, {
      headers: {
        Authorization: generateAuthorizationHeaderV2(url, data),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in API call:", error.response?.data || error.message);
    throw error;
  }
};

export const checkBin = async (data: BinCheckRequest) => {
  return await post<BinCheckRequest, BinCheckResponse>(BIN_CHECK_URL, data);
};

export const checkInstallment = async (data: BinCheckRequest) => {
  return await post(INSTALLMENT_URL, data);
};

export const initialize3dsPayment = async (
  data: Initialize3dsPaymentRequest,
) => {
  return await post<Initialize3dsPaymentRequest, Initialize3dsPaymentResponse>(
    INITIALIZE_3DS_URL,
    data,
  );
};

export async function getConversationId(timeStamps) {
  try {
    const { get } = await cookies();
    const userId = get(CookieTokens.USER_ID)?.value;
    const guestId = get(CookieTokens.GUEST_ID)?.value;

    if (!timeStamps) {
      throw new Error("Timestamp is required");
    }

    if (userId) {
      return `${userId}-${timeStamps}`;
    } else if (guestId) {
      return `${guestId}-${timeStamps}`;
    } else {
      throw new Error("No user or guest ID found");
    }
  } catch (error) {
    console.error("Error creating conversation ID:", error);
    throw error;
  }
}
