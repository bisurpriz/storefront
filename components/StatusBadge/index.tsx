import { OrderItemStatus } from "@/common/enums/Order/product";
import StatusIcon from "./StatusIcon";

type StatusBadgeProps = {
  status: OrderItemStatus;
};

const colors = {
  [OrderItemStatus.Created]:
    "bg-indigo-100 text-indigo-700 border border-indigo-200",
  [OrderItemStatus.Processing]:
    "bg-yellow-100 text-yellow-700 border border-yellow-200",
  [OrderItemStatus.Shipped]: "bg-blue-100 text-blue-700 border border-blue-200",
  [OrderItemStatus.Delivered]:
    "bg-green-100 text-green-700 border border-green-200",
  [OrderItemStatus.Canceled]: "bg-red-100 text-red-700 border border-red-200",
  [OrderItemStatus.Refunded]: "bg-red-100 text-red-700 border border-red-200",
  [OrderItemStatus.Completed]:
    "bg-green-100 text-green-700 border border-green-200",
  [OrderItemStatus.Failed]: "bg-red-100 text-red-700 border border-red-200",
};

const translations = {
  [OrderItemStatus.Created]: "Siparişiniz alındı",
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
      className={`${colors[status]} text-xs leading-none font-light me-2 px-2 py-1.5 rounded-md flex gap-1 items-center
      `}
    >
      <StatusIcon status={status} />
      {translations[status]}
    </span>
  );
};

export default StatusBadge;
