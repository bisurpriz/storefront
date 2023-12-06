"use client";

import ReceiverForm from "../components/OrderDetail/ReceiverForm";

const OrderDetail = (props: any) => {
  return (
    <div className="w-full relative">
      <section
        aria-labelledby="order-detail"
        aria-describedby="order-detail-description"
        aria-label="Sipariş Detayı"
      >
        <ReceiverForm />
      </section>
    </div>
  );
};

export default OrderDetail;
