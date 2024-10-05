import Checkbox from "@/components/Checkbox";
import React, { FC } from "react";

interface CheckContractProps {
  openApproveContract: () => void;
  approveContract: boolean;
  setApproveContract?: (value: boolean) => void;
}

const CheckContract: FC<CheckContractProps> = ({
  openApproveContract,
  approveContract,
  setApproveContract,
}) => {
  const handleApproveContract = (val: boolean) => {
    if (approveContract) setApproveContract?.(val);
    else openApproveContract();
  };

  return (
    <div className="px-4 border-t">
      <Checkbox
        checked={approveContract}
        label={
          <span className="text-slate-600 text-xs">
            <strong
              onClick={openApproveContract}
              className="cursor-pointer underline hover:text-primary"
            >
              Ön Bilgilendirme Koşulları
            </strong>
            'nı ve{" "}
            <strong
              onClick={openApproveContract}
              className="cursor-pointer underline hover:text-primary"
            >
              Mesafeli Satış Sözleşmesi
            </strong>
            'ni okudum, onaylıyorum.
          </span>
        }
        onChange={(val) => handleApproveContract(val)}
      />
    </div>
  );
};

export default CheckContract;
