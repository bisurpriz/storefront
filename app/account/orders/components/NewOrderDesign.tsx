"use client";

import { OrderItemStatus } from "@/common/enums/Order/product";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useOrderCustomizableModal } from "@/contexts/OrderCustomizableModal";
import { GetUserOrdersQuery } from "@/graphql/queries/account/account.generated";
import { localeFormat } from "@/utils/format";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import Image from "next/image";
import { useState } from "react";

export default function GuncellenmisSiparislerimSayfasi({
  order,
}: {
  order: GetUserOrdersQuery["order"];
}) {
  const [selectedOrder, setSelectedOrder] = useState<
    GetUserOrdersQuery["order"][0]["tenant_orders"][0]["order_items"][0] | null
  >(null);
  const { onOpen } = useOrderCustomizableModal();

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">Siparişlerim</h1>
      {order.map((order) => (
        <Card key={order.id} className="mb-6">
          <CardHeader>
            <CardTitle className="flex w-full items-start justify-between">
              <p>
                {localeFormat(new Date(order.created_at), "dd MMMM Yyyy HH:mm")}{" "}
                tarihli sipariş
              </p>
              #{order.order_no}
            </CardTitle>

            <p className="text-sm text-muted-foreground">
              Toplam Tutar: {order.total_amount} ₺
            </p>
          </CardHeader>
          <CardContent>
            {order.tenant_orders.map((tenantOrder) => (
              <div key={tenantOrder.id} className="mb-4">
                <h3 className="mb-2 font-semibold">
                  Satıcı: {tenantOrder.tenant.tenants[0]?.name}
                </h3>
                <StatusBadge
                  status={tenantOrder.order_status?.value as OrderItemStatus}
                />
                {tenantOrder.order_items.map((item) => (
                  <div
                    key={item.id}
                    className="my-4 flex items-start space-x-4 border-t pt-4"
                  >
                    {item.product.image_url &&
                      item.product.image_url.length > 0 && (
                        <Image
                          src={getImageUrlFromPath(item.product.image_url[0])}
                          alt={item.product.name}
                          width={100}
                          height={100}
                          className="rounded-md"
                        />
                      )}
                    <div className="w-full flex-1">
                      <h4 className="font-semibold">{item.product.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Adet: {item.quantity}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Kategori:{" "}
                        {item.product.product_categories[0]?.category.name ||
                          "Belirtilmemiş"}
                      </p>
                      <div className="flex w-full items-start justify-start">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="soft"
                              size="sm"
                              className="mt-2"
                              onClick={() => setSelectedOrder(item)}
                            >
                              Detayları Görüntüle
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            <DialogHeader>
                              <DialogTitle>Sipariş Detayları</DialogTitle>
                            </DialogHeader>
                            <Tabs defaultValue="details">
                              <TabsList>
                                <TabsTrigger value="details">
                                  Ürün Detayları
                                </TabsTrigger>
                                <TabsTrigger value="customization">
                                  Özelleştirmeler
                                </TabsTrigger>
                              </TabsList>
                              <TabsContent value="details">
                                <div className="mt-4">
                                  <h4 className="mb-2 font-semibold">
                                    {selectedOrder?.product.name}
                                  </h4>
                                  <p>
                                    Sipariş Numarası:{" "}
                                    {selectedOrder?.order_item_no ||
                                      "Belirtilmemiş"}
                                  </p>
                                  <p>Miktar: {selectedOrder?.quantity}</p>
                                  <p>
                                    Stok Durumu:{" "}
                                    {selectedOrder?.product.quantity ||
                                      "Belirtilmemiş"}
                                  </p>
                                  <h5 className="mb-2 mt-4 font-semibold">
                                    Ürün Kategorileri:
                                  </h5>
                                  <ul>
                                    {selectedOrder?.product.product_categories.map(
                                      (category, index) => (
                                        <li key={index}>
                                          {category.category.name}
                                        </li>
                                      ),
                                    )}
                                  </ul>
                                </div>
                              </TabsContent>
                              <TabsContent value="customization">
                                <div className="mt-4">
                                  <h5 className="mb-2 font-semibold">
                                    Özel Metinler:
                                  </h5>
                                  {selectedOrder?.order_item_special_texts.map(
                                    (text) => (
                                      <p key={text.id}>{text.content}</p>
                                    ),
                                  )}
                                  <h5 className="mb-2 mt-4 font-semibold">
                                    Özel Görseller:
                                  </h5>
                                  <div className="grid grid-cols-2 gap-4">
                                    {selectedOrder?.order_item_special_images.map(
                                      (image) => (
                                        <Image
                                          key={image.id}
                                          src={getImageUrlFromPath(
                                            image.image_url,
                                          )}
                                          alt="Özel görsel"
                                          width={150}
                                          height={150}
                                          className="rounded-md"
                                        />
                                      ),
                                    )}
                                  </div>
                                </div>
                              </TabsContent>
                            </Tabs>
                          </DialogContent>
                        </Dialog>
                        {order.tenant_orders.find(
                          (to) =>
                            to.order_items.reduce((acc, oi) => {
                              return (
                                acc +
                                oi.product.product_customizable_areas.reduce(
                                  (acc2, area) => acc2 + area.count,
                                  0,
                                )
                              );
                            }, 0) !==
                            to.order_items.reduce((acc, oi) => {
                              return (
                                acc +
                                oi.order_item_special_images.length +
                                oi.order_item_special_texts.length
                              );
                            }, 0),
                        )?.id ? (
                          <Button
                            variant="link"
                            size="sm"
                            className="mt-2"
                            onClick={() => onOpen(order)}
                          >
                            Özelleştirmeyi Tamamla
                          </Button>
                        ) : (
                          <Button
                            variant="link"
                            size="sm"
                            className="mt-2"
                            disabled
                          >
                            Özelleştirme Tamamlandı
                          </Button>
                        )}
                        <Button
                          variant="secondary"
                          size="sm"
                          className="ml-auto"
                        >
                          Ürünü Değerlendir
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
