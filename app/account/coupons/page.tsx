import React from "react";
import CouponCard from "../components/CouponCard";

const CouponsPage = () => {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 10 }).map((_, i) => (
        <CouponCard key={i} />
      ))}
    </div>
  );
};

export default CouponsPage;
