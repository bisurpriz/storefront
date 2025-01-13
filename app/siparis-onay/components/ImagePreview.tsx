"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Image } from "@/components/ui/image";
import { useResponsiveDialog } from "@/contexts/DialogContext/ResponsiveDialogContext";
import { getImageUrlFromPath } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { approveOrderImages } from "../actions";

const ImagePreview = ({
  initialImages,
  shortCode,
}: {
  initialImages: string[];
  shortCode: string;
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [note, setNote] = useState("");
  const [approveButtonDisabled, setApproveButtonDisabled] = useState(false);
  const { openDialog: openModal } = useResponsiveDialog();

  const onSubmit = async (approveStatus: boolean) => {
    if (!note && !approveStatus) {
      toast.error(
        "Lütfen ürün görseli ile ilgili itiraz nedeninizi detaylı olarak belirtiniz.",
        {
          position: "bottom-right",
          duration: 2000,
        },
      );
      return;
    }

    const response = await approveOrderImages({
      shortCode,
      note,
      status: approveStatus,
    });

    if (response.approved) {
      setApproveButtonDisabled(true);
      toast.success(
        "Ürün görselleri başarıyla onaylandı. Siparişiniz hazırlanmaya başlanacak.",
        {
          position: "bottom-right",
          duration: 2000,
        },
      );
    } else {
      toast.success(
        "İtirazınız ekibimize iletildi. En kısa sürede sizinle iletişime geçilecek.",
        {
          position: "bottom-right",
          duration: 2000,
        },
      );
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === initialImages.length - 1 ? 0 : prev + 1,
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? initialImages.length - 1 : prev - 1,
    );
  };

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    openModal(
      <div className="relative flex h-full w-full items-center justify-center bg-background">
        <DialogTitle className="sr-only">
          Sipariş Görseli {currentImageIndex + 1}
        </DialogTitle>
        <DialogDescription className="sr-only">
          {initialImages.length} görsel arasından {currentImageIndex + 1}.
          görsel. Görseller arasında gezinmek için sağ ve sol ok tuşlarını
          kullanabilirsiniz.
        </DialogDescription>
        <Button
          onClick={previousImage}
          variant="soft"
          size="icon"
          className="absolute left-4 z-10 h-10 w-10 rounded-full border-0"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <div className="w-full items-center justify-center p-4">
          <Image
            className="w-full"
            alt={`Sipariş görseli ${currentImageIndex + 1}`}
            src={getImageUrlFromPath(initialImages[currentImageIndex])}
            priority
            width={1000}
            height={1000}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
        </div>
        <Button
          onClick={nextImage}
          variant="soft"
          size="icon"
          className="absolute right-4 z-10 h-10 w-10 rounded-full border-0"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
        <Badge variant="default" className="absolute right-4 top-4">
          {currentImageIndex + 1} / {initialImages.length}
        </Badge>
      </div>,
    );
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">
          Sipariş Görselleri Onayı
        </h2>
        <Badge variant="default" className="px-3 py-1">
          {initialImages.length} Görsel
        </Badge>
      </div>

      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
        Lütfen sipariş görsellerinizi dikkatlice inceleyiniz. Görselleri
        büyütmek için üzerlerine tıklayabilirsiniz. Görsellerle ilgili herhangi
        bir sorun yoksa onaylayabilir, düzeltilmesini istediğiniz noktalar varsa
        itiraz edebilirsiniz.
      </div>

      <div className="grid auto-rows-fr grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {initialImages.map((image, index) => (
          <div
            key={image}
            className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100 shadow-sm transition-all duration-300 hover:shadow-md"
          >
            <button
              onClick={() => handleImageClick(index)}
              className="h-full w-full"
            >
              <Image
                alt={`Sipariş görseli ${index + 1}`}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                src={getImageUrlFromPath(image)}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Badge variant="default" className="text-gray-900">
                  Görseli İncele
                </Badge>
              </div>
            </button>
          </div>
        ))}
      </div>

      <div className="rounded-lg bg-gray-50 p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="note"
              className="block text-base font-medium text-gray-900"
            >
              Görsel Değerlendirmeniz
            </label>
            <p className="text-sm text-gray-600">
              Görseller ile ilgili itirazınız varsa, lütfen detaylı olarak
              belirtiniz. Bu, düzeltmelerin daha hızlı yapılmasını
              sağlayacaktır.
            </p>
            <textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="min-h-[120px] w-full resize-none rounded-lg border border-gray-200 p-4 text-gray-700 placeholder-gray-400 transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="Örnek: Ürünün rengi görselde daha koyu görünüyor, arka plan çok parlak, ürünün boyutu tam anlaşılmıyor vb."
            />
          </div>

          <div className="flex flex-col gap-4 pt-2 sm:flex-row">
            <Button
              disabled={!note}
              variant="destructive"
              onClick={() => onSubmit(false)}
              className="h-12 flex-1 text-base font-medium"
            >
              Görsellere İtiraz Et
            </Button>
            <Button
              disabled={approveButtonDisabled}
              onClick={() => onSubmit(true)}
              className="h-12 flex-1 bg-green-600 text-base font-medium hover:bg-green-700"
            >
              Görselleri Onayla
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
