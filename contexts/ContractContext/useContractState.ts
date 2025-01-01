import { useCallback, useState } from "react";
import { DEFAULT_CONTRACT_DATA } from "./constants";
import { ContractContextState, ContractData } from "./types";

export const useContractState = () => {
  const [state, setState] = useState<ContractContextState>({
    approveContract: false,
    isModalOpen: false,
    contractData: DEFAULT_CONTRACT_DATA,
  });

  const openApproveContract = useCallback(() => {
    setState((prev) => ({ ...prev, isModalOpen: true }));
  }, []);

  const closeModal = useCallback(() => {
    setState((prev) => ({ ...prev, isModalOpen: false }));
  }, []);

  const handleApprove = useCallback(() => {
    setState((prev) => ({
      ...prev,
      approveContract: true,
      isModalOpen: false,
    }));
  }, []);

  const setApproveContract = useCallback((value: boolean) => {
    setState((prev) => ({ ...prev, approveContract: value }));
  }, []);

  const updateContractData = useCallback((data: Partial<ContractData>) => {
    setState((prev) => ({
      ...prev,
      contractData: { ...prev.contractData, ...data },
    }));
  }, []);

  return {
    state,
    openApproveContract,
    closeModal,
    handleApprove,
    setApproveContract,
    updateContractData,
  };
};
