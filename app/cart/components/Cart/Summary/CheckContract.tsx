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
  return (
    <div className="px-4 border-t">
      <Checkbox
        checked={approveContract}
        label={
          <span className="text-slate-600 text-xs">
            <strong
              onClick={openApproveContract}
              className="cursor-pointer underline hover:text-primary-dark"
            >
              Ön Bilgilendirme Koşulları
            </strong>
            'nı ve{" "}
            <strong
              onClick={openApproveContract}
              className="cursor-pointer underline hover:text-primary-dark"
            >
              Mesafeli Satış Sözleşmesi
            </strong>
            'ni okudum, kabul onaylıyorum.
          </span>
        }
        onChange={(val) => setApproveContract && setApproveContract(val)}
      />
    </div>
  );
};

export default CheckContract;
