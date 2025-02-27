"use client";

import { AlertCircle, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ResponsiveDialog } from "../ui/responsive-dialog";
import PlacesAutocomplete, { useLocationChange } from "./PlacesAutocomplete";
import { getCookie, setCookie } from "@/utils/cookies";
import { CookieTokens } from "@/app/@auth/contants";

export default function QuarterSelectorModal() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const hasSeenModal = getCookie(CookieTokens.HAS_SEEN_LOCATION_MODAL);
    if (!hasSeenModal) {
      const publicRoutes = ["/siparis-takip", "/siparis-onay", "/blog", "/account"];
      const location = getCookie(CookieTokens.LOCATION_ID);
      
      const canShow = !location && !publicRoutes.some((route) => pathname.includes(route));
      setIsDialogOpen(canShow);
      
      if (canShow) {
        setCookie(CookieTokens.HAS_SEEN_LOCATION_MODAL, "true");
      }
    }
  }, [pathname]);

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <ResponsiveDialog
      open={isDialogOpen}
      dismissible={true}
      onOpenChange={handleClose}
      title={"Teslimat Bölgesi Seçimi"}
      description={
        <>
          Teslimat adresinizi belirlemek için <b>mahalle</b>, <b>okul</b>,{" "}
          <b>hastane</b> veya yakınınızdaki <b>referans noktalarını</b>{" "}
          kullanabilirsiniz.
        </>
      }
      className="w-full max-w-xl md:h-fit"
    >
      <div className="flex-1 overflow-y-auto px-4 py-2">
        <div className="space-y-6">
          <PlacesAutocomplete
            onSelect={(place) => {
              setIsDialogOpen(false);
            }}
          />

          <div className="flex flex-col gap-3 text-sm">
            <div className="flex items-center justify-center gap-2 rounded-lg bg-muted/50 px-4 py-3 text-muted-foreground">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span>
                Size en uygun ürün ve hizmetleri sunabilmemiz için lütfen teslimat
                bölgenizi belirleyiniz.
              </span>
            </div>
          </div>
        </div>
      </div>
    </ResponsiveDialog>
  );
}
