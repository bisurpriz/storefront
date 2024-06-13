import { getBrandWithTitle } from "@/utils/getBrandWithTitle";
import CartWrapper from "./components/Cart/CartWrapper/index";

export const generateMetadata = async () => {
  return {
    title: getBrandWithTitle("Sepetim"),
    description: "Sepetim",
  };
};

const Cart = async () => {
  // const response = await initialize3dsPayment({
  //   locale: Locale.TR,
  //   price: "3.2",
  //   paidPrice: "3.2",
  //   installment: 1,
  //   paymentChannel: "WEB",
  //   basketId: "B67832",
  //   paymentGroup: "PRODUCT",
  //   paymentCard: {
  //     cardHolderName: "Dev iyzico",
  //     cardNumber: "5526080000000006",
  //     expireYear: "2025",
  //     expireMonth: "11",
  //     cvc: "200",
  //   },
  //   buyer: {
  //     id: "BY789",
  //     name: "Ali",
  //     surname: "Şahin",
  //     identityNumber: "74300864791",
  //     email: "email@email.com",
  //     gsmNumber: "+905350000000",
  //     registrationDate: "2013-04-21 15:12:09",
  //     lastLoginDate: "2015-10-05 12:43:35",
  //     registrationAddress: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
  //     city: "Istanbul",
  //     country: "Turkey",
  //     zipCode: "34732",
  //     ip: "85.34.78.112",
  //   },
  //   conversationId: "deviyzico",
  //   shippingAddress: {
  //     address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
  //     zipCode: "34742",
  //     contactName: "Jane Doe",
  //     city: "Istanbul",
  //     country: "Turkey",
  //   },
  //   billingAddress: {
  //     address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
  //     zipCode: "34742",
  //     contactName: "Jane Doe",
  //     city: "Istanbul",
  //     country: "Turkey",
  //   },
  //   basketItems: [
  //     {
  //       id: "BI101",
  //       price: "1.1",
  //       name: "Binocular",
  //       category1: "Collectibles",
  //       category2: "Accessories",
  //       itemType: "PHYSICAL",
  //     },
  //     {
  //       id: "BI1012",
  //       price: "2.1",
  //       name: "Binocular",
  //       category1: "Collectibles",
  //       category2: "Accessories",
  //       itemType: "PHYSICAL",
  //     },
  //   ],
  //   currency: "TRY",
  //   callbackUrl: "https://deviyzico.com/",
  // });

  return (
    <section
      aria-label="Sepetim"
      aria-describedby="Sepetim"
      className="w-full relative col-span-1 md:col-span-2 flex flex-col gap-3"
    >
      <CartWrapper />
    </section>
  );
};

export default Cart;
