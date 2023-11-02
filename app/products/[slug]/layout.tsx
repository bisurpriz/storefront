import React from "react";
import SearchLocation from "./components/Layout/SearchLocation";
import Information from "./components/Layout/Information";

export default async function ProductDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-10">{children}</div>
    </div>
  );
}
