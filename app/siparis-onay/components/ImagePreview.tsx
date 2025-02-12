"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Image } from "@/components/ui/image";
import { useResponsiveDialog } from "@/contexts/DialogContext/ResponsiveDialogContext";
import { toast } from "@/hooks/use-toast";
import { getImageUrlFromPath } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
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
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();
  const onSubmit = async (approveStatus: boolean) => {
    if (!note && !approveStatus) {
      toast({
        title:
          "Lütfen ürün görseli ile ilgili itiraz nedeninizi detaylı olarak belirtiniz.",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    startTransition(async () => {
      const response = await approveOrderImages({
        shortCode,
        note,
        status: approveStatus,
      });

      console.log(response);

      if (
        response?.data?.update_order_item?.returning?.[0]?.is_images_approved
      ) {
        setApproveButtonDisabled(true);
        toast({
          title:
            "Ürün görselleri başarıyla onaylandı. Siparişiniz en kısa sürede teslim edilecektir.",
          duration: 2000,
        });
      } else {
        toast({
          title:
            "İtirazınız ekibimize iletildi. En kısa sürede sizinle iletişime geçilecektir.",
          duration: 2000,
        });
      }

      replace("/");
    });
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
      <div className="relative flex items-center justify-center w-full h-full bg-background">
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
          className="absolute z-10 w-10 h-10 border-0 rounded-full left-4"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <div className="items-center justify-center w-full p-4">
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
          className="absolute z-10 w-10 h-10 border-0 rounded-full right-4"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
        <Badge variant="default" className="absolute right-4 top-4">
          {currentImageIndex + 1} / {initialImages.length}
        </Badge>
      </div>,
    );
  };

  return (
    <div className="flex flex-col w-full gap-6">
      <div className="flex items-center justify-between my-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          Sipariş Görselleri Onayı
        </h2>
        <Badge variant="default" className="px-3 py-1">
          {initialImages.length} Görsel
        </Badge>
      </div>

      <div className="p-4 text-sm text-yellow-800 border border-yellow-200 rounded-lg bg-yellow-50">
        Lütfen sipariş görsellerinizi dikkatlice inceleyiniz. Görselleri
        büyütmek için üzerlerine tıklayabilirsiniz. Görsellerle ilgili herhangi
        bir sorun yoksa onaylayabilir, düzeltilmesini istediğiniz noktalar varsa
        itiraz edebilirsiniz.
      </div>

      <div className="grid grid-cols-1 gap-4 auto-rows-fr md:grid-cols-3 lg:grid-cols-4">
        {initialImages.map((image, index) => (
          <div
            key={image}
            className="relative overflow-hidden transition-all duration-300 bg-gray-100 rounded-lg shadow-sm group aspect-square hover:shadow-md"
          >
            <button
              onClick={() => handleImageClick(index)}
              className="w-full h-full"
            >
              <Image
                alt={`Sipariş görseli ${index + 1}`}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                src={getImageUrlFromPath(image)}
              />
              <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 bg-black/40 group-hover:opacity-100">
                <Badge variant="default" className="text-gray-900">
                  Görseli İncele
                </Badge>
              </div>
            </button>
          </div>
        ))}
      </div>

      <div className="p-6 mb-16 rounded-lg bg-gray-50 md:mb-0">
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
              disabled={!note || isPending}
              variant="destructive"
              onClick={() => onSubmit(false)}
              className="flex-1 h-12 text-base font-medium"
            >
              Görsellere İtiraz Et
            </Button>
            <Button
              disabled={approveButtonDisabled || isPending}
              onClick={() => onSubmit(true)}
              className="flex-1 h-12 text-base font-medium bg-green-600 hover:bg-green-700"
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
