"use client";

import Modal from "@/components/Modal";
import { GetUserOrdersQuery } from "@/graphql/queries/account/account.generated";
import { toast } from "@/hooks/use-toast";
import { ReactNode, createContext, useContext, useState } from "react";
import OrderCustomize from "./OrderCustomize";

interface OrderCustomizableModalType {
  onOpen: (orderItem: GetUserOrdersQuery["order"][0]) => void;
  onOrderCustomizeModalClose?: () => void;
}

export const OrderCustomizableModal = createContext<OrderCustomizableModalType>(
  {
    onOpen: () => {},
    onOrderCustomizeModalClose: () => {},
  },
);

export const OrderCustomizableModalProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const onOpen = (orderItem) => {
    setSelectedOrder(orderItem);
  };

  const onOrderCustomizeModalClose = () => {
    setSelectedOrder(null);
  };

  const onStatusChange = (status: "succes" | "fail") => {
    if (status === "succes") {
      toast({
        title: "Siparişiniz başarıyla özelleştirildi.",
      });
      setSelectedOrder(null);
    }

    if (status === "fail") {
      toast({
        title: "Sipariş özelleştirme işlemi başarısız oldu.",
        variant: "destructive",
      });
    }
  };

  return (
    <OrderCustomizableModal.Provider
      value={{
        onOpen,
        onOrderCustomizeModalClose,
      }}
    >
      <Modal
        open={Boolean(selectedOrder)}
        handleClose={onOrderCustomizeModalClose}
        closeOnBackdropClick={false}
        title={`Sipariş Özelleştirmeleri - #${selectedOrder?.order_no}`}
      >
        {selectedOrder && (
          <OrderCustomize
            order={selectedOrder}
            onStatusChange={onStatusChange}
          />
        )}
      </Modal>

      {children}
    </OrderCustomizableModal.Provider>
  );
};

export const useOrderCustomizableModal = () => {
  if (!OrderCustomizableModal) {
    throw new Error(
      "useOrderCustomizableModal must be used within a OrderCustomizableModalProvider",
    );
  }

  return useContext(OrderCustomizableModal);
};
