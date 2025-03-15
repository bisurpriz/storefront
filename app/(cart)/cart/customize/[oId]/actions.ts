"use server";

import { AI_API_URL } from "@/app/constants";
import axios from "axios";

type CheckAIAvailabilityResponse = {
  status: boolean;
};

export const checkAIAvailability =
  async (): Promise<CheckAIAvailabilityResponse> => {
    try {
      const response = await axios.get(
        "https://aware-lindy-bonnmarse-770961e7.koyeb.app/server/health",
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      return {
        status: response.data,
      };
    } catch (error) {
      console.error("AI service health check failed:", error);
      return { status: false };
    }
  };

export type GeneratedNote = {
  note: string;
};

type GeneratedNotesPayload = {
  product_name: string;
  product_description: string;
  user_notes: string;
  recipient: string;
  number_of_notes: number;
};

export const createGeneratedNotes: (
  payload: GeneratedNotesPayload,
) => Promise<GeneratedNote[]> = async (payload: GeneratedNotesPayload) => {
  const { product_name, product_description, user_notes, recipient } = payload;
  try {
    const response = await axios.post(`${AI_API_URL}/giftnote`, {
      product_name,
      product_description,
      user_notes,
      recipient,
      number_of_notes: 3,
    });

    return response.data;
  } catch (error) {
    console.error("Error generating notes:", error);
  }
};
