import Checkbox from "@/components/Checkbox";
import { memo, useCallback } from "react";

interface CheckContractProps {
  openApproveContract: () => void;
  approveContract: boolean;
  setApproveContract?: (value: boolean) => void;
}

const CheckContract = memo(
  ({
    openApproveContract,
    approveContract,
    setApproveContract,
  }: CheckContractProps) => {
    const handleApproveContract = useCallback(
      (val: boolean) => {
        if (approveContract) {
          setApproveContract?.(val);
        } else {
          openApproveContract();
        }
      },
      [approveContract, setApproveContract, openApproveContract],
    );

    const handleOpenContract = useCallback(
      (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        openApproveContract();
      },
      [openApproveContract],
    );

    return (
      <div className="border-t px-4" role="region" aria-label="Sözleşme Onayı">
        <Checkbox
          checked={approveContract}
          label={
            <span className="text-xs text-slate-600">
              <button
                type="button"
                onClick={handleOpenContract}
                className="font-bold underline hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Ön Bilgilendirme Koşullarını görüntüle"
              >
                Ön Bilgilendirme Koşulları
              </button>
              'nı ve{" "}
              <button
                type="button"
                onClick={handleOpenContract}
                className="font-bold underline hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Mesafeli Satış Sözleşmesini görüntüle"
              >
                Mesafeli Satış Sözleşmesi
              </button>
              'ni okudum, onaylıyorum.
            </span>
          }
          onChange={handleApproveContract}
          aria-required="true"
          aria-label="Sözleşmeleri okudum ve onaylıyorum"
        />
      </div>
    );
  },
);

CheckContract.displayName = "CheckContract";

export default CheckContract;
