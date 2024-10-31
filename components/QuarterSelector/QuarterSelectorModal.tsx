"use client";

import { useEffect, useState } from "react";

import Cookies from "js-cookie";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PlacesAutocomplete from "./PlacesAutocomplete";
import { CookieTokens } from "@/app/@auth/contants";

export default function QuarterSelectorModal() {
  const [mounted, setMounted] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  useEffect(() => {
    setMounted(true);

    Cookies.set(CookieTokens.HAS_SEEN_LOCATION_MODAL, "true", {
      expires: 30,
    });
  }, []);

  if (!mounted) return null;

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Gönderim Yeri Seçin
          </DialogTitle>
          <DialogDescription className="text-center">
            Siparişinizin gönderileceği adresi seçin veya arayın.
          </DialogDescription>
        </DialogHeader>
        <PlacesAutocomplete />

        <div className="flex justify-center whitespace-nowrap mt-4 gap-1 text-xs">
          <span className=" text-center text-gray-500">
            İhtiyaçlarınıza uygun ürünleri listeleyebilmemiz için
          </span>
          <strong className=" text-center text-gray-500 underline">
            adresinizi seçin
          </strong>
        </div>
      </DialogContent>
    </Dialog>
  );
}
