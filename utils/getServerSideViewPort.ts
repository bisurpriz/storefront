import { headers } from "next/headers";
import { userAgent } from "next/server";

export const getServerSideViewPort = async () => {
  const { device } = userAgent({
    headers: headers(),
  });
  const viewport = device.type === "mobile" ? "mobile" : "desktop";
  return viewport;
};
