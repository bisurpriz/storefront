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
    const publicRoutes = ["/siparis-takip", "/siparis-onay", "/blog"];

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
        "Teslimat adresinizi belirlemek için mahalle, okul, hastane veya yakınınızdaki referans noktalarını kullanabilirsiniz."
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
          <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-muted/50 text-muted-foreground">
            <MapPin className="flex-shrink-0 w-4 h-4" />
            <span>
              Size en uygun ürün ve hizmetleri sunabilmemiz için lütfen teslimat
              bölgenizi belirleyiniz.
            </span>
          </div>

          <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-destructive/10 text-destructive">
            <AlertCircle className="flex-shrink-0 w-4 h-4" />
            <span>
              Teslimat hizmetlerimiz şu an yalnızca <strong>Ankara</strong> ili
              sınırları içerisinde mevcuttur.
            </span>
          </div>
        </div>
      </div>
    </ResponsiveDialog>
  );
}
