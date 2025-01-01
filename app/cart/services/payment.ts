import { CookieTokens } from "@/app/@auth/contants";
import { getIpAddress } from "@/app/actions";
import {
  getConversationId,
  initialize3dsPayment,
} from "@/app/iyzico-payment/actions";
import { Locale } from "@/app/iyzico-payment/types";
import { createBasketItems } from "@/app/iyzico-payment/utils";
import { ProductForCart } from "@/common/types/Cart/cart";
import { GetUserByIdQuery } from "@/graphql/queries/account/account.generated";
import Cookies from "js-cookie";
import { createOrderAction } from "../actions";
import { CreditCardForm } from "../components/Checkout/validation";
import { OrderDetailFormData } from "../components/OrderDetail/ReceiverForm/types";

interface InitializePaymentParams {
  cartItems: ProductForCart[];
  detailData: OrderDetailFormData;
  cardData: CreditCardForm;
  user: GetUserByIdQuery["user_by_pk"] | null;
  totalPrice: number;
  isTablet: boolean;
  couponInfo?: {
    code: string;
    guest_id?: string;
  };
}

export const initializePayment = async ({
  cartItems,
  detailData,
  cardData,
  user,
  totalPrice,
  isTablet,
  couponInfo,
}: InitializePaymentParams) => {
  try {
    const senderNames = detailData.sender_name.trim().split(" ");
    const timeStamps = Date.now();

    const [conversationId, ip] = await Promise.all([
      getConversationId(timeStamps),
      getIpAddress(),
    ]);

    if (!ip) {
      throw new Error("IP Adresi alınamadı");
    }

    const basketId = `${user?.carts[0]?.id ?? Cookies.get(CookieTokens.GUEST_ID)}-${timeStamps}`;

    const orderRes = await createOrderAction(
      cartItems,
      detailData,
      conversationId,
      couponInfo,
    );

    if (orderRes.status === "error") {
      throw new Error(orderRes.message || "Sipariş oluşturulamadı");
    }

    const orderId = orderRes.data?.insert_order_one?.id;

    const [month, year] = cardData.creditCardDate.split("/");
    const paymentRes = await initialize3dsPayment({
      basketId,
      basketItems: createBasketItems(cartItems),
      billingAddress: {
        address: detailData.invoice_company_address,
        city: detailData.invoice_company_address,
        contactName: detailData.sender_name,
        country: "Türkiye",
      },
      shippingAddress: {
        address: detailData.receiver_address,
        city: detailData.receiver_city.label,
        country: "Türkiye",
        contactName: detailData.receiver_name,
      },
      buyer: {
        city: detailData.receiver_city.label,
        country: "Türkiye",
        email: detailData.sender_email,
        gsmNumber: detailData.sender_phone,
        identityNumber: "11111111111",
        ip,
        name: senderNames[0],
        surname: senderNames[senderNames.length - 1],
        registrationAddress: detailData.receiver_address,
        id: user?.id ?? Cookies.get(CookieTokens.GUEST_ID),
      },
      paymentChannel: isTablet ? "WEB" : "MOBILE_WEB",
      callbackUrl: process.env.NEXT_PUBLIC_IYZICO_CALLBACK_URL,
      conversationId,
      currency: "TRY",
      locale: Locale.TR,
      paidPrice: totalPrice.toString(),
      price: totalPrice.toString(),
      paymentCard: {
        cardHolderName: cardData.creditCardName,
        cardNumber: cardData.creditCardNumber.replace(/\s+/g, ""),
        cvc: cardData.creditCardCvv,
        expireMonth: month,
        expireYear: `20${year}`,
      },
      installment: 1,
    });

    if (paymentRes.errorMessage) {
      throw new Error(paymentRes.errorMessage);
    }

    return {
      orderId,
      htmlContent: paymentRes.threeDSHtmlContent,
    };
  } catch (error) {
    throw new Error(error.message || "Ödeme başlatılamadı");
  }
};
