import Dropdown from "@/components/Dropdown";
import React from "react";
import SearchLocation from "./components/Layout/SearchLocation";
import Divider from "@/components/Divider";

export default async function ProductDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="p-8 mb-2 flex items-center border rounded-lg gap-8">
        <h5 className="text-base font-semibold text-gray-700">
          Lütfen Gönderim <br />
          Yerini Seçiniz
        </h5>
        <SearchLocation />
        <Divider orientation="vertical" />
      </div>
      {children}
    </div>
  );
}
