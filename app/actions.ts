"use server";

import { cookies } from "next/headers";

// Bu fonksiyon async olduğu için await ile kullanılmalı veya .then ile kullanılmalı
export async function readIdFromCookies(string: string) {
  const auth = cookies();

  const id = auth.get(string);

  if (!id) null;

  return id?.value;
}
