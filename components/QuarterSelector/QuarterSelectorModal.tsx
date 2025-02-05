"use client";

import { useState } from "react";

import PlacesAutocomplete, { useLocationChange } from "./PlacesAutocomplete";
import { ResponsiveDialog } from "../ui/responsive-dialog";

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
      className="h-[50%] w-full max-w-xl md:flex md:flex-col"
    >
      <PlacesAutocomplete
        onSelect={(place) => {
          setIsDialogOpen(false);
        }}
      />
      <div className="mt-4 gap-1 text-sm text-gray-500 md:mt-2">
        <span className="text-center">
          Gönderim adresinize göre en uygun ürünleri listeleyebilmemiz için
          lütfen adresinizi seçin
        </span>
      </div>
    </ResponsiveDialog>
  );
}
