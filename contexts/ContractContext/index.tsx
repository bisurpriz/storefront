"use client";

import { createContext, useContext } from "react";
import ContractModal from "./ContractModal";
import { ContractContextProps, ContractContextValue } from "./types";
import { useContractState } from "./useContractState";

const ContractContext = createContext<ContractContextValue | undefined>(
  undefined,
);

export const ContractProvider = ({ children }: ContractContextProps) => {
  const {
    state,
    openApproveContract,
    closeModal,
    handleApprove,
    setApproveContract,
    updateContractData,
  } = useContractState();

  return (
    <ContractContext.Provider
      value={{
        ...state,
        openApproveContract,
        setApproveContract,
        updateContractData,
      }}
    >
      {children}
      <ContractModal
        open={state.isModalOpen}
        onClose={closeModal}
        onApprove={handleApprove}
        contractData={state.contractData}
      />
    </ContractContext.Provider>
  );
};

export const useContract = () => {
  const context = useContext(ContractContext);
  if (context === undefined) {
    throw new Error("useContract must be used within a ContractProvider");
  }
  return context;
};
