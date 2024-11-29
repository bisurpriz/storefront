"use client";

import { useEffect, useState } from "react";

import Cookies from "js-cookie";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PlacesAutocomplete from "./PlacesAutocomplete";
import { CookieTokens } from "@/app/@auth/contants";
import { Button } from "../ui/button";

export default function QuarterSelectorModal() {
  const [mounted, setMounted] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  useEffect(() => {
    setMounted(true);

    Cookies.set(CookieTokens.HAS_SEEN_LOCATION_MODAL, "true", {
      expires: new Date(new Date().getTime() + 1000 * 60 * 60),
    });
  }, []);

  if (!mounted) return null;

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}
      modal={true}
      aria-label="Quarter Selector Modal"
    >
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        className="w-full max-w-xl"
      >
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Gönderim Yeri Seçin
          </DialogTitle>
          <DialogDescription className="text-center">
            Siparişinizin gönderileceği adresi seçin veya arayın.
          </DialogDescription>
        </DialogHeader>
        <PlacesAutocomplete />

        <div className="flex flex-wrap justify-center gap-1 text-xs">
          <span className="whitespace-nowrap text-center text-gray-500">
            İhtiyaçlarınıza uygun ürünleri listeleyebilmemiz için
          </span>
          <strong className="whitespace-nowrap text-center text-gray-500 underline">
            adresinizi seçin
          </strong>
        </div>
        <DialogFooter>
          <Button
            onClick={() => setIsDialogOpen(false)}
            className="justify-self-end"
            variant="link"
          >
            Şimdi Değil
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
