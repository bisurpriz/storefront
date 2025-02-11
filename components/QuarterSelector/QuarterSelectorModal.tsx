"use client";

import { useState } from "react";

import { ResponsiveDialog } from "../ui/responsive-dialog";
import PlacesAutocomplete, { useLocationChange } from "./PlacesAutocomplete";

export default function QuarterSelectorModal() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useLocationChange((location) => {
    setIsDialogOpen(!location);
  });

  return (
    <ResponsiveDialog
      open={isDialogOpen}
      dismissible={false}
      onOpenChange={() => {}}
      title="Gönderim Yeri Seçin"
      description="Mahalle, okul, hastane gibi yakınızdaki önemli noktaları aratarak gönderim adresinizi seçebilirsiniz."
      className="h-[50dvh] w-full max-w-xl md:flex md:h-fit md:flex-col"
    >
      <PlacesAutocomplete
        onSelect={(place) => {
          setIsDialogOpen(false);
        }}
      />
      <div className="gap-1 mt-4 text-sm text-gray-500 md:mt-2">
        <span className="text-center">
          Gönderim adresinize göre en uygun ürünleri listeleyebilmemiz için
          lütfen adresinizi seçin
        </span>
        <span className="text-center">
          Şuan sadece Ankara içi gönderim yapıyoruz.
        </span>
      </div>
    </ResponsiveDialog>
  );
}
