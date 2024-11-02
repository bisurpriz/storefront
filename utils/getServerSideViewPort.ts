import { headers } from "next/headers";
import { userAgent } from "next/server";

export const getServerSideViewPort = async () => {
  const agent = userAgent({
    headers: await headers(),
  });

  const { device } = agent;

  const viewport = device.type === "mobile" ? "mobile" : "desktop";
  return viewport;
};
