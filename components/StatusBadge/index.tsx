import { OrderItemStatus } from "@/common/enums/Order/product";
import StatusIcon from "./StatusIcon";

type StatusBadgeProps = {
  status: OrderItemStatus;
};

const colors = {
  [OrderItemStatus.Created]:
    "bg-indigo-100 text-indigo-800 border border-indigo-300",
  [OrderItemStatus.Processing]:
    "bg-yellow-100 text-yellow-800 border border-yellow-300",
  [OrderItemStatus.Shipped]: "bg-blue-100 text-blue-800 border border-blue-300",
  [OrderItemStatus.Delivered]:
    "bg-green-100 text-green-800 border border-green-300",
  [OrderItemStatus.Canceled]: "bg-red-100 text-red-800 border border-red-300",
  [OrderItemStatus.Refunded]: "bg-red-100 text-red-800 border border-red-300",
  [OrderItemStatus.Completed]:
    "bg-green-100 text-green-800 border border-green-300",
  [OrderItemStatus.Failed]: "bg-red-100 text-red-800 border border-red-300",
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
      className={`${colors[status]} text-sm font-medium me-2 px-2.5 py-1.5 rounded-md flex gap-1 items-center
      `}
    >
      <StatusIcon status={status} />
      {translations[status]}
    </span>
  );
};

export default StatusBadge;
