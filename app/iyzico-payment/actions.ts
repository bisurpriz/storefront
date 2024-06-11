"use server";

import axios, { AxiosResponse } from "axios";
import { BIN_CHECK_URL, INSTALLMENT_URL } from "./constants";
import { generateAuthorizationHeaderV2 } from "./utils";
import { BinCheckRequest, BinCheckResponse } from "./types";

const iyzicoUrl = process.env.IYZICO_URL;

const iyzico = axios.create({
  baseURL: iyzicoUrl,
});

const post = async <T, R>(url: string, data: T) => {
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
