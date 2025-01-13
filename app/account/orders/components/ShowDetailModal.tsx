import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getImageUrlFromPath } from "@/lib/utils";
import { FileText, ImageIcon, PenLine, Type } from "lucide-react";
import Image from "next/image";

type ShowDetailModalProps = {
  selectedOrder: any; // TODO: Add proper type
};

export const ShowDetailModal = ({ selectedOrder }: ShowDetailModalProps) => {
  const hasCustomizations =
    selectedOrder?.product.product_customizable_areas.length > 0;

  return (
    <div className="max-h-[80vh] overflow-y-auto px-1 max-sm:px-4">
      <DialogHeader className="space-y-2 pb-4">
        <DialogTitle className="text-xl">Sipariş Detayları</DialogTitle>
        <p className="text-sm text-muted-foreground">
          Sipariş No:{" "}
          <span className="font-medium text-foreground">
            {selectedOrder?.order_item_no || "Belirtilmemiş"}
          </span>
        </p>
      </DialogHeader>

      <Tabs defaultValue="details" className="mt-4">
        <TabsList
          className={hasCustomizations ? "grid w-full grid-cols-2" : "w-full"}
        >
          <TabsTrigger value="details" className="flex-1">
            <div className="flex items-center gap-2 px-2">
              <FileText className="h-4 w-4" />
              Ürün Detayları
            </div>
          </TabsTrigger>
          {hasCustomizations && (
            <TabsTrigger value="customization">
              <div className="flex items-center gap-2 px-2">
                <PenLine className="h-4 w-4" />
                Özelleştirmeler
              </div>
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="details" className="mt-6">
          <div className="space-y-6">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              {selectedOrder?.product.image_url &&
                selectedOrder?.product.image_url.length > 0 && (
                  <div className="relative aspect-square w-full max-w-[200px] overflow-hidden rounded-xl border sm:w-[200px]">
                    <Image
                      src={getImageUrlFromPath(
                        selectedOrder.product.image_url[0],
                      )}
                      alt={selectedOrder.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              <div className="flex-1 space-y-4">
                <div>
                  <h4 className="text-xl font-semibold">
                    {selectedOrder?.product.name}
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedOrder?.product.product_categories.map(
                      (category: any, index: number) => (
                        <span
                          key={index}
                          className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                        >
                          {category.category.name}
                        </span>
                      ),
                    )}
                  </div>
                </div>

                <div className="grid gap-4 rounded-lg bg-muted/5 p-4 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-muted-foreground">Sipariş Miktarı</p>
                      <p className="font-medium">
                        {selectedOrder?.quantity} adet
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Stok Durumu</p>
                      <p className="font-medium">
                        {selectedOrder?.product.quantity || "Belirtilmemiş"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {hasCustomizations && (
          <TabsContent value="customization" className="mt-6">
            <div className="space-y-6">
              {selectedOrder?.order_item_special_texts?.length > 0 ||
              selectedOrder?.order_item_special_images?.length > 0 ? (
                <>
                  {selectedOrder?.order_item_special_texts?.length > 0 && (
                    <div>
                      <div className="mb-4 flex items-center gap-2">
                        <Type className="h-4 w-4" />
                        <h5 className="font-medium">Özel Metinler</h5>
                      </div>
                      <div className="grid">
                        {selectedOrder?.order_item_special_texts.map(
                          (text: any, index: number) => (
                            <div
                              key={text.id}
                              className="group relative rounded-lg bg-muted/5 p-4 transition-colors hover:bg-muted/10"
                            >
                              <div className="absolute left-0 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                                {index + 1}
                              </div>
                              <p className="pl-4 text-sm">{text.content}</p>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}

                  {selectedOrder?.order_item_special_images?.length > 0 && (
                    <div>
                      <div className="mb-4 flex items-center gap-2">
                        <ImageIcon className="h-4 w-4" />
                        <h5 className="font-medium">Özel Görseller</h5>
                      </div>
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                        {selectedOrder?.order_item_special_images.map(
                          (image: any, index: number) => (
                            <div
                              key={image.id}
                              className="group relative aspect-square"
                            >
                              <div className="absolute -left-2 -top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                                {index + 1}
                              </div>
                              <div className="relative h-full w-full overflow-hidden rounded-lg border">
                                <Image
                                  src={getImageUrlFromPath(image.image_url)}
                                  alt="Özel görsel"
                                  fill
                                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex min-h-[200px] flex-col items-center justify-center gap-2 rounded-lg bg-muted/5">
                  <PenLine className="h-6 w-6 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Henüz özelleştirme eklenmemiş
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};
