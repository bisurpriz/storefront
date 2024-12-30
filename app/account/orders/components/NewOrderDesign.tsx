"use client";

import { OrderItemStatus } from "@/common/enums/Order/product";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useResponsiveDialog } from "@/contexts/DialogContext/ResponsiveDialogContext";
import { useOrderCustomizableModal } from "@/contexts/OrderCustomizableModal";
import { GetUserOrdersQuery } from "@/graphql/queries/account/account.generated";
import { cn } from "@/lib/utils";
import { localeFormat } from "@/utils/format";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import { endOfDay, format, startOfDay } from "date-fns";
import { tr } from "date-fns/locale";
import { CalendarIcon, FileText, FilterIcon, Image as ImageIcon, PenLine, Search, Type, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { createReview } from "../../reviews/actions";
import CreateReview from "../../reviews/components/CreateReview/CreateReview";
import OrderMessage from "./OrderMessage";

const ShowDetailModal = ({ selectedOrder }) => {
  const hasCustomizations = selectedOrder?.product.product_customizable_areas.length > 0;

  return (
    <div className="max-h-[80vh] overflow-y-auto px-1">
      <DialogHeader className="space-y-2 pb-4">
        <DialogTitle className="text-xl">Sipariş Detayları</DialogTitle>
        <p className="text-sm text-muted-foreground">
          Sipariş No: <span className="font-medium text-foreground">{selectedOrder?.order_item_no || "Belirtilmemiş"}</span>
        </p>
      </DialogHeader>

      <Tabs defaultValue="details" className="mt-4">
        <TabsList className={hasCustomizations ? "grid w-full grid-cols-2" : "w-full"}>
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
              {selectedOrder?.product.image_url && selectedOrder?.product.image_url.length > 0 && (
                <div className="relative aspect-square w-full max-w-[200px] overflow-hidden rounded-xl border sm:w-[200px]">
                  <Image
                    src={getImageUrlFromPath(selectedOrder.product.image_url[0])}
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
                    {selectedOrder?.product.product_categories.map((category, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                      >
                        {category.category.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 rounded-lg bg-muted/5 p-4 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-muted-foreground">Sipariş Miktarı</p>
                      <p className="font-medium">{selectedOrder?.quantity} adet</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Stok Durumu</p>
                      <p className="font-medium">{selectedOrder?.product.quantity || "Belirtilmemiş"}</p>
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
              {(selectedOrder?.order_item_special_texts?.length > 0 || selectedOrder?.order_item_special_images?.length > 0) ? (
                <>
                  {selectedOrder?.order_item_special_texts?.length > 0 && (
                    <div>
                      <div className="mb-4 flex items-center gap-2">
                        <Type className="h-4 w-4" />
                        <h5 className="font-medium">Özel Metinler</h5>
                      </div>
                      <div className="grid">
                        {selectedOrder?.order_item_special_texts.map((text, index) => (
                          <div
                            key={text.id}
                            className="group relative rounded-lg bg-muted/5 p-4 transition-colors hover:bg-muted/10"
                          >
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                              {index + 1}
                            </div>
                            <p className="pl-4 text-sm">{text.content}</p>
                          </div>
                        ))}
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
                        {selectedOrder?.order_item_special_images.map((image, index) => (
                          <div key={image.id} className="group relative aspect-square">
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
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex min-h-[200px] flex-col items-center justify-center gap-2 rounded-lg bg-muted/5">
                  <PenLine className="h-6 w-6 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Henüz özelleştirme eklenmemiş</p>
                </div>
              )}
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default function GuncellenmisSiparislerimSayfasi({
  order,
}: {
  order: GetUserOrdersQuery["order"];
}) {
  const [selectedOrder, setSelectedOrder] = useState<
    GetUserOrdersQuery["order"][0]["tenant_orders"][0]["order_items"][0] | null
  >(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { onOpen } = useOrderCustomizableModal();
  const { openDialog, closeDialog } = useResponsiveDialog();
  const { push } = useRouter();

  // Sort and filter orders
  const filteredOrders = useMemo(() => {
    let filtered = [...order].sort((a, b) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((order) => {
        const hasMatchingOrderNo = String(order.order_no).toLowerCase().includes(query);
        const hasMatchingProduct = order.tenant_orders.some((to) =>
          to.order_items.some((item) =>
            item.product.name.toLowerCase().includes(query)
          )
        );
        return hasMatchingOrderNo || hasMatchingProduct;
      });
    }

    // Apply status filter
    if (selectedStatus && selectedStatus !== 'ALL') {
      filtered = filtered.filter((order) =>
        order.tenant_orders.some((to) => to.order_status?.value === selectedStatus)
      );
    }

    // Apply date filter
    if (dateFrom || dateTo) {
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.created_at);
        if (dateFrom && dateTo) {
          return orderDate >= startOfDay(dateFrom) && orderDate <= endOfDay(dateTo);
        }
        if (dateFrom) {
          return orderDate >= startOfDay(dateFrom);
        }
        if (dateTo) {
          return orderDate <= endOfDay(dateTo);
        }
        return true;
      });
    }

    return filtered;
  }, [order, searchQuery, selectedStatus, dateFrom, dateTo]);

  const handleCreateReview = async ({
    product_id,
    score,
    comment,
  }: {
    product_id: number;
    score: number;
    comment: string;
  }) => {
    const response = await createReview({
      product_id,
      score,
      comment,
    });
    if (response?.created_at) {
      closeDialog();
      toast.success("Değerlendirme başarıyla eklendi.");
    }
    push("/account/reviews");
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedStatus("ALL");
    setDateFrom(undefined);
    setDateTo(undefined);
  };

  const hasActiveFilters = searchQuery || (selectedStatus && selectedStatus !== 'ALL') || dateFrom || dateTo;

  return (
    <div className="container mx-auto space-y-6 p-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Siparişlerim</h1>
          <Button
            variant="outline"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <FilterIcon className="mr-2 h-4 w-4" />
            Filtrele
          </Button>
        </div>

        <div className={cn(
          "flex flex-col gap-4 lg:flex-row lg:items-center",
          !isFilterOpen && "hidden lg:flex"
        )}>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Sipariş no veya ürün adı ile ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <div className="flex flex-1 flex-col lg:flex-row gap-2 lg:max-w-[500px]">
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full lg:w-[180px]">
                <SelectValue placeholder="Sipariş durumu" />
              </SelectTrigger>
              <SelectContent position="popper" sideOffset={4} align="start">
                <SelectItem value="ALL">Tümü</SelectItem>
                {Object.values(OrderItemStatus).map((status) => (
                  <SelectItem key={status} value={status}>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={status} />
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex flex-col lg:flex-row gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full lg:w-[140px] justify-start text-left font-normal",
                      !dateFrom && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFrom ? (
                      format(dateFrom, "dd LLL", { locale: tr })
                    ) : (
                      <span>Başlangıç</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateFrom}
                    onSelect={setDateFrom}
                    initialFocus
                    locale={tr}
                    className="rounded-md border"
                    classNames={{
                      day_today: "bg-accent text-accent-foreground",
                      day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                      day_outside: "text-muted-foreground opacity-50",
                      day_disabled: "text-muted-foreground opacity-50",
                      day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                      day_hidden: "invisible",
                      nav_button_previous: "absolute left-1",
                      nav_button_next: "absolute right-1",
                      head_cell: "text-muted-foreground font-normal text-[0.8rem]",
                      cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                      day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                      table: "w-full border-collapse",
                      head_row: "flex",
                      row: "flex w-full mt-2",
                      caption: "flex justify-center pt-1 relative items-center",
                      caption_label: "text-sm font-medium",
                      nav: "space-x-1 flex items-center",
                    }}
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full lg:w-[140px] justify-start text-left font-normal",
                      !dateTo && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateTo ? (
                      format(dateTo, "dd LLL", { locale: tr })
                    ) : (
                      <span>Bitiş</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateTo}
                    onSelect={setDateTo}
                    initialFocus
                    disabled={(date) => dateFrom ? date < dateFrom : false}
                    locale={tr}
                    className="rounded-md border"
                    classNames={{
                      day_today: "bg-accent text-accent-foreground",
                      day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                      day_outside: "text-muted-foreground opacity-50",
                      day_disabled: "text-muted-foreground opacity-50",
                      day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                      day_hidden: "invisible",
                      nav_button_previous: "absolute left-1",
                      nav_button_next: "absolute right-1",
                      head_cell: "text-muted-foreground font-normal text-[0.8rem]",
                      cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                      day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                      table: "w-full border-collapse",
                      head_row: "flex",
                      row: "flex w-full mt-2",
                      caption: "flex justify-center pt-1 relative items-center",
                      caption_label: "text-sm font-medium",
                      nav: "space-x-1 flex items-center",
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="lg:px-2"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <Card key={order.id}>
              <CardHeader className="bg-muted/5 pb-0">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                        #{order.order_no}
                      </span>
                      <time className="text-sm font-normal text-muted-foreground">
                        {localeFormat(new Date(order.created_at), "dd MMMM yyyy HH:mm")}
                      </time>
                    </CardTitle>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-sm font-medium">
                      Toplam: <span className="text-base font-bold">{order.total_amount} ₺</span>
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="grid gap-6 p-4">
                {order.tenant_orders.map((tenantOrder) => {
                  return (
                  <div key={tenantOrder.id}>
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <StatusBadge
                          status={tenantOrder.order_status?.value as OrderItemStatus}
                        />
                      </div>
                    </div>

                    <div className="grid gap-4">
                      {tenantOrder.order_items.map((item) => (
                        <div
                          key={item.id}
                          className="relative flex flex-col gap-4 rounded-lg bg-muted/5 sm:flex-row"
                        >
                          <div className="shrink-0 overflow-hidden rounded-md">
                            {item.product.image_url && item.product.image_url.length > 0 && (
                              <Image
                                src={getImageUrlFromPath(item.product.image_url[0])}
                                alt={item.product.name}
                                width={120}
                                height={120}
                                className="aspect-square rounded-md bg-background object-cover m-auto"
                              />
                            )}
                          </div>

                          <div className="flex flex-1 flex-col">
                            <div className="mb-2 flex-1">
                              <h4 className="mb-1 font-medium">{item.product.name}</h4>
                              <div className="space-y-1 text-sm text-muted-foreground">
                                <p>Adet: {item.quantity}</p>
                                <p>
                                  Kategori:{" "}
                                  {item.product.product_categories[0]?.category.name ||
                                    "Belirtilmemiş"}
                                </p>
                              </div>
                            </div>

                            <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                              <div className="flex flex-wrap gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => openDialog(<ShowDetailModal selectedOrder={item} />)}
                                  className="h-8"
                                >
                                  Detayları Görüntüle
                                </Button>

                                {item.product.product_customizable_areas.length > 0 && 
                                  (item.order_item_special_images.length + item.order_item_special_texts.length) < 
                                  item.product.product_customizable_areas.reduce((acc, area) => acc + area.count, 0) ? (
                                  <Button
                                    variant="link"
                                    size="sm"
                                    onClick={() => onOpen(order)}
                                    className="h-8"
                                  >
                                    Özelleştirmeyi Tamamla
                                  </Button>
                                ) : item.product.product_customizable_areas.length > 0 ? (
                                  <Button
                                    variant="link"
                                    size="sm"
                                    disabled
                                    className="h-8"
                                  >
                                    Özelleştirme Tamamlandı
                                  </Button>
                                ) : null}
                              </div>

                              <div className="flex flex-wrap gap-2">
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  onClick={() =>
                                    openDialog(
                                      <OrderMessage
                                        orderTenantId={tenantOrder.id}
                                        tenant={tenantOrder.tenant}
                                        tenantId={tenantOrder.tenant.tenants[0].id}
                                      />,
                                    )
                                  }
                                  className="h-8"
                                >
                                  Satıcıya Mesaj
                                </Button>
                                {tenantOrder.order_status?.value === OrderItemStatus.Delivered && (
                                  <Button
                                    variant="default"
                                    size="sm"
                                    onClick={() =>
                                      openDialog(
                                        <CreateReview
                                          handleCreateReview={handleCreateReview}
                                          selectedProduct={item.product}
                                        />,
                                      )
                                    }
                                    className="h-8"
                                  >
                                    Değerlendir
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )})}
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="flex min-h-[200px] flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed">
            <div className="text-muted-foreground">
              {hasActiveFilters ? "Filtrelere uygun sipariş bulunamadı" : "Henüz sipariş bulunmuyor"}
            </div>
            {hasActiveFilters && (
              <Button
                variant="link"
                size="sm"
                onClick={clearFilters}
                className="mt-2"
              >
                Filtreleri Temizle
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
