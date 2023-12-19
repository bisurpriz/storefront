"use client";

import { BsGift } from "react-icons/bs";
import { CiDeliveryTruck, CiWarning } from "react-icons/ci";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { MdDoneAll } from "react-icons/md";
import { PiSpinnerLight } from "react-icons/pi";
import { TbShoppingCartCancel } from "react-icons/tb";
import { LiaShippingFastSolid } from "react-icons/lia";
import { OrderItemStatus } from "@/common/enums/Order/product";

const StatusIcon = ({ status }: { status: OrderItemStatus }) => {
  const icons = {
    [OrderItemStatus.Created]: MdDoneAll,
    [OrderItemStatus.Processing]: PiSpinnerLight,
    [OrderItemStatus.Shipped]: LiaShippingFastSolid,
    [OrderItemStatus.Delivered]: CiDeliveryTruck,
    [OrderItemStatus.Canceled]: TbShoppingCartCancel,
    [OrderItemStatus.Refunded]: HiOutlineReceiptRefund,
    [OrderItemStatus.Completed]: BsGift,
    [OrderItemStatus.Failed]: CiWarning,
  };

  const Icon = icons[status];

  return <Icon />;
};

export default StatusIcon;
