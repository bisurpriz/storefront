"use client";

import { useEffect, useState } from "react";

import { CookieTokens } from "@/app/@auth/contants";

import Cookies from "js-cookie";
import { Button } from "../ui/button";
import PlacesAutocomplete from "./PlacesAutocomplete";
import { ResponsiveDialog } from "../ui/responsive-dialog";

export default function QuarterSelectorModal() {
  const [mounted, setMounted] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const [renderCondition, setRenderCondition] = useState(false);

  useEffect(() => {
    setMounted(true);

    const selectedLocation = Cookies.get(CookieTokens.LOCATION_ID);

    if (!selectedLocation) {
      setRenderCondition(true);
    }
  }, []);

  if (!mounted || !renderCondition) return null;

  return (
    <ResponsiveDialog
      open={isDialogOpen}
      onOpenChange={() => {}}
      title="Gönderim Yeri Seçin"
      description="Mahalle, okul, hastane gibi yakınınızdaki önemli noktaları aratarak gönderim adresinizi seçebilirsiniz."
      className="h-[50%] w-full max-w-xl"
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
