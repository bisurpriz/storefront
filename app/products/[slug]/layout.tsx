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
      <div className="p-8 mb-4 flex items-center shadow-md border rounded-lg gap-8">
        <SearchLocation />
        <Information />
      </div>
      <div className="mb-10">{children}</div>
    </div>
  );
}
