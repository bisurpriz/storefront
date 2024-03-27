"use client";

import { useState } from "react";
import { getPaymentToken } from "../actions";
import CreditCartForm from "../components/Checkout/CreditCartForm";
import Script from "next/script";

const CartCheckout = () => {
  const [token, setToken] = useState<string>("");

  const handlePayment = async () => {
    const result = await getPaymentToken();
    console.log(result, "result");
    setToken(result.token);
  };

  return (
    <div className="w-full relative">
      <section
        aria-labelledby="cart-checkout"
        aria-describedby="cart-checkout-description"
        aria-label="Ödeme Bilgileri"
      >
        <form action={handlePayment}>
          <button type="submit">Ödeme Yap</button>
        </form>
        {token && (
          <>
            <Script src="https://www.paytr.com/js/iframeResizer.min.js"></Script>
            <Script id="resizer">{`iFrameResize({},'#paytriframe');`}</Script>
            <iframe
              src={`https://www.paytr.com/odeme/guvenli/${token}`}
              id="paytriframe"
              style={{ width: "100%", height: "100vh" }}
            ></iframe>
          </>
        )}
        <CreditCartForm />
      </section>
    </div>
  );
};

export default CartCheckout;
