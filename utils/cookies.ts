import { cookies } from "next/headers";

export const getUserIdFromCookie = () => {
  const id = cookies().get("user_id")?.value as string;
  if (id) return { id, error: null };

  return { id: null, error: "No user id found in cookie" };
};
