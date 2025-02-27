"use client";

import { AlertCircle, MapPin } from "lucide-react";
import { useState } from "react";

import { usePathname } from "next/navigation";
import { ResponsiveDialog } from "../ui/responsive-dialog";
import PlacesAutocomplete, { useLocationChange } from "./PlacesAutocomplete";

export default function QuarterSelectorModal() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const pathname = usePathname();

  useLocationChange((location) => {
    const publicRoutes = ["/siparis-takip", "/siparis-onay", "/blog", "/account"];

    const canShow =
      !location && !publicRoutes.some((route) => pathname.includes(route));
    setIsDialogOpen(canShow);
  });

  return (
    <ResponsiveDialog
      open={isDialogOpen}
      dismissible={false}
      onOpenChange={() => {}}
      title={"Teslimat Bölgesi Seçimi"}
      description={
        <>
          Teslimat adresinizi belirlemek için <b>mahalle</b>, <b>okul</b>,{" "}
          <b>hastane</b> veya yakınınızdaki <b>referans noktalarını</b>{" "}
          kullanabilirsiniz.
        </>
      }
      className="h-[50dvh] w-full max-w-xl md:flex md:h-fit md:flex-col"
    >
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
    </ResponsiveDialog>
  );
}
