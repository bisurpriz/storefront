import DistanceSalesContract from "@/components/ContractPreview/DistanceSalesContract";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { memo, useCallback } from "react";
import { ContractModalProps } from "./types";

const ContractModal = memo(
  ({ open, onClose, onApprove, contractData }: ContractModalProps) => {
    const handleApproveClick = useCallback(() => {
      onApprove();
    }, [onApprove]);

    return (
      <Modal closeOnBackdropClick={false} open={open} handleClose={onClose}>
        <div className="flex flex-col rounded-md bg-white p-4">
          <DistanceSalesContract {...contractData} />
          <div className="w-full px-4">
            <p className="mb-1 text-center text-xs text-gray-500">
              Ön Bilgilendirme Koşullarını ve Mesafeli Satış Sözleşmesi'ni
              okudum.
            </p>
            <Button
              variant="default"
              className="w-full justify-center text-xl"
              onClick={handleApproveClick}
            >
              Onaylıyorum
            </Button>
          </div>
        </div>
      </Modal>
    );
  },
);

ContractModal.displayName = "ContractModal";

export default ContractModal;
