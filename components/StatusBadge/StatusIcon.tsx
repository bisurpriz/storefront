import { OrderItemStatus } from "@/common/enums/Order/product";
import {
  AlertTriangle,
  Boxes,
  CheckCheck,
  CircleX,
  Gift,
  PackageCheck,
  Redo,
  Truck,
} from "lucide-react";

const StatusIcon = ({ status }: { status: OrderItemStatus }) => {
  const icons = {
    [OrderItemStatus.Created]: CheckCheck,
    [OrderItemStatus.Processing]: Boxes,
    [OrderItemStatus.Shipped]: Truck,
    [OrderItemStatus.Delivered]: PackageCheck,
    [OrderItemStatus.Canceled]: CircleX,
    [OrderItemStatus.Refunded]: Redo,
    [OrderItemStatus.Completed]: Gift,
    [OrderItemStatus.Failed]: AlertTriangle,
  };

  const Icon = icons[status];

  return <Icon className="w-4 h-4" />;
};

export default StatusIcon;
