import Checkbox from "@/components/Checkbox";
import React, { FC } from "react";

interface CheckContractProps {
  distanceSalesContract: boolean;
  openDistanceSalesContract: () => void;
  openPreliminaryInformation: () => void;
  preliminaryInformation: boolean;
}

const CheckContract: FC<CheckContractProps> = ({
  distanceSalesContract,
  openDistanceSalesContract,
  openPreliminaryInformation,
  preliminaryInformation,
}) => {
  return (
    <div className="px-4 border-t">
      <Checkbox
        checked={distanceSalesContract || preliminaryInformation}
        label={
          <span className="text-slate-600 text-xs">
            <strong
              onClick={openPreliminaryInformation}
              className="cursor-pointer underline hover:text-primary-dark"
            >
              Ön Bilgilendirme Koşulları
            </strong>
            'nı ve{" "}
            <strong
              onClick={openDistanceSalesContract}
              className="cursor-pointer underline hover:text-primary-dark"
            >
              Mesafeli Satış Sözleşmesi
            </strong>
            'ni okudum, kabul onaylıyorum.
          </span>
        }
        onChange={() => {}}
      />
    </div>
  );
};

export default CheckContract;
