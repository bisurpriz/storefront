"use client";

import DistanceSalesContract from "@/components/ContractPreview/DistanceSalesContract";
import Modal from "@/components/Modal/FramerModal/Modal";
import React from "react";

export interface ContractContextProps {
  children: React.ReactNode;
}

export interface ContractContextState {
  preliminaryInformation: boolean;
  distanceSalesContract: boolean;
  openPreliminaryInformation: () => void;
  openDistanceSalesContract: () => void;
}

export const ContractContext = React.createContext<
  ContractContextState | undefined
>(undefined);

export const ContractProvider = ({ children }: ContractContextProps) => {
  const [state, setState] = React.useState({
    preliminaryInformation: false,
    distanceSalesContract: false,
  });

  const openPreliminaryInformation = () => {
    setState({ ...state, preliminaryInformation: true });
  };

  const openDistanceSalesContract = () => {
    setState({ ...state, distanceSalesContract: true });
  };

  return (
    <ContractContext.Provider
      value={{
        preliminaryInformation: state.preliminaryInformation,
        distanceSalesContract: state.distanceSalesContract,
        openPreliminaryInformation,
        openDistanceSalesContract,
      }}
    >
      {children}
      <Modal
        open={state.distanceSalesContract || state.preliminaryInformation}
        handleClose={() => {
          setState({
            preliminaryInformation: false,
            distanceSalesContract: false,
          });
        }}
      >
        {state.preliminaryInformation ? (
          <DistanceSalesContract
            customer={{
              address: "İstanbul",
              name: "John Doe",
              orderDate: "2021-10-10",
              orderNumber: "123456",
            }}
          />
        ) : (
          <DistanceSalesContract
            customer={{
              address: "İstanbul",
              name: "John Doe",
              orderDate: "2021-10-10",
              orderNumber: "123456",
            }}
          />
        )}
      </Modal>
    </ContractContext.Provider>
  );
};

export const useContract = () => {
  const context = React.useContext(ContractContext);
  if (context === undefined) {
    throw new Error("useContract must be used within a ContractProvider");
  }
  return context;
};
