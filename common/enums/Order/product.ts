export enum CustomizableAreaType {
  TEXT = "special_text",
  IMAGE = "special_image",
}

export enum OrderItemStatus {
  Created = "Created",
  Processing = "Processing",
  Shipped = "Shipped",
  Delivered = "Delivered",
  Canceled = "Canceled",
  Completed = "Completed",
  Failed = "Failed",
  Refunded = "Refunded",
}

export const OrderItemStatusTranslations = {
  [OrderItemStatus.Created]: "Siparişiniz alındı",
  [OrderItemStatus.Processing]: "Siparişiniz hazırlanıyor",
  [OrderItemStatus.Shipped]: "Siparişiniz kargoya verildi",
  [OrderItemStatus.Delivered]: "Siparişiniz teslim edildi",
  [OrderItemStatus.Canceled]: "Siparişiniz iptal edildi",
  [OrderItemStatus.Refunded]: "Siparişiniz iade edildi",
  [OrderItemStatus.Completed]: "Siparişiniz tamamlandı",
  [OrderItemStatus.Failed]: "Siparişiniz başarısız oldu",
};
