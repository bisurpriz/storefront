import { OrderItemStatus } from "@/common/enums/Order/product";
import Gift from "../Icons/Gift";
import Truck from "../Icons/Truck";
import ShippingFast from "../Icons/ShippingFast";
import Spinner from "../Icons/Spinner";
import DoneAll from "../Icons/DoneAll";
import ShoppingCartCancel from "../Icons/ShoppingCartCancel";
import ReceiptRefund from "../Icons/ReceiptRefund";
import Warning from "../Icons/Warning";

const StatusIcon = ({ status }: { status: OrderItemStatus }) => {
  const icons = {
    [OrderItemStatus.Created]: DoneAll,
    [OrderItemStatus.Processing]: Spinner,
    [OrderItemStatus.Shipped]: ShippingFast,
    [OrderItemStatus.Delivered]: Truck,
    [OrderItemStatus.Canceled]: ShoppingCartCancel,
    [OrderItemStatus.Refunded]: ReceiptRefund,
    [OrderItemStatus.Completed]: Gift,
    [OrderItemStatus.Failed]: Warning,
  };

  const Icon = icons[status];

  return <Icon />;
};

export default StatusIcon;
