import { OrderItemStatus } from "@/common/enums/Order/product";

type StatusBadgeProps = {
  status: OrderItemStatus;
};

const colors = {
  [OrderItemStatus.Created]: "bg-green-100 text-green-800",
  [OrderItemStatus.Processing]: "bg-yellow-100 text-yellow-800",
  [OrderItemStatus.Shipped]: "bg-blue-100 text-blue-800",
  [OrderItemStatus.Delivered]: "bg-green-100 text-green-800",
  [OrderItemStatus.Canceled]: "bg-red-100 text-red-800",
  [OrderItemStatus.Refunded]: "bg-red-100 text-red-800",
  [OrderItemStatus.Completed]: "bg-green-100 text-green-800",
  [OrderItemStatus.Failed]: "bg-red-100 text-red-800",
};

const translations = {
  [OrderItemStatus.Created]: "Siparişiniz oluşturuldu",
  [OrderItemStatus.Processing]: "Siparişiniz hazırlanıyor",
  [OrderItemStatus.Shipped]: "Siparişiniz kargoya verildi",
  [OrderItemStatus.Delivered]: "Siparişiniz teslim edildi",
  [OrderItemStatus.Canceled]: "Siparişiniz iptal edildi",
  [OrderItemStatus.Refunded]: "Siparişiniz iade edildi",
  [OrderItemStatus.Completed]: "Siparişiniz tamamlandı",
  [OrderItemStatus.Failed]: "Siparişiniz başarısız oldu",
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <span
      className={`${colors[status]} text-sm font-medium me-2 px-2.5 py-1.5 rounded dark:bg-green-900 dark:text-green-300`}
    >
      {translations[status]}
    </span>
  );
};

export default StatusBadge;
