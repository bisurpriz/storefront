import { ProductForCart } from "@/common/types/Cart/cart";
import { createHmac, randomBytes } from "crypto";
import Cookies from "js-cookie";
import { CookieTokens } from "../@auth/contants";

const COMMISSION = 0.1;

export const generateAuthorizationHeaderV2 = (uri, body) => {
  const iyziWsHeaderName = "IYZWSv2";
  const apiKey = process.env.IYZICO_API_KEY;
  const separator = ":";
  const secretKey = process.env.IYZICO_SECRET_KEY;
  const randomString = randomBytes(16).toString("hex");

  return (
    iyziWsHeaderName +
    " " +
    generateHashV2(apiKey, separator, uri, randomString, secretKey, body)
  );
};

export const generateHashV2 = (
  apiKey,
  separator,
  uri,
  randomString,
  secretKey,
  body
) => {
  const signature = createHmac("sha256", secretKey)
    .update(randomString + uri + JSON.stringify(body))
    .digest("hex");

  const authorizationParams = [
    "apiKey" + separator + apiKey,
    "randomKey" + separator + randomString,
    "signature" + separator + signature,
  ];
  return Buffer.from(authorizationParams.join("&")).toString("base64");
};

export async function getConversationId(timeStamps) {
  try {
    const userId = Cookies.get(CookieTokens.USER_ID);
    const guestId = Cookies.get(CookieTokens.GUEST_ID);

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

export const calculateCommissionedAmount = (
  amount: string,
  commissionRate: number
) => {
  const commission = (parseFloat(amount) * commissionRate).toFixed(2);
  const commissionedAmount = (
    parseFloat(amount) - parseFloat(commission)
  ).toFixed(2);

  return {
    commission,
    commissionedAmount,
  };
};

export const createBasketItems = (items: ProductForCart[]) => {
  const getPrice = (product) =>
    (product.discount_price * product.quantity)?.toFixed(2).toString() ||
    (product.price * product.quantity)?.toFixed(2).toString();

  const basketItems = items.map((product) => ({
    category1: product.category.name,
    id: product.id.toString(),
    name: product.name,
    price: getPrice(product),
    itemType: "PHYSICAL",
    subMerchantKey: product.tenant.tenants[0]?.iyzi_sub_merchant_key || "",
    subMerchantPrice: calculateCommissionedAmount(
      getPrice(product),
      product.tenant.tenants[0].commision_rate ?? COMMISSION
    ).commissionedAmount,
  }));

  return basketItems;
};
