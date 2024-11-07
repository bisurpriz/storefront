"use client";

import { Button } from "@/components/ui/button";
import DistanceSalesContract from "@/components/ContractPreview/DistanceSalesContract";
import React from "react";
import Modal from "@/components/Modal";

export interface ContractContextProps {
  children: React.ReactNode;
}

export interface ContractContextState {
  approveContract: boolean;
  openApproveContract: () => void;
  setApproveContract?: (value: boolean) => void;
}

export const ContractContext = React.createContext<
  ContractContextState | undefined
>(undefined);

export const ContractProvider = ({ children }: ContractContextProps) => {
  const [approveContract, setApproveContract] = React.useState<boolean>(false);
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  const openApproveContract = () => {
    setOpenModal(true);
  };

  return (
    <ContractContext.Provider
      value={{
        approveContract,
        openApproveContract,
        setApproveContract,
      }}
    >
      {children}
      <Modal
        closeOnBackdropClick={false}
        open={openModal}
        handleClose={() => setOpenModal(false)}
      >
        <div className="flex flex-col rounded-md bg-white p-4">
          <DistanceSalesContract
            aliciAdi="Ali"
            email="alisahindev@gmail.com"
            kargoTeslimSuresi="2 gün"
            kargoTutari={10}
            saticiAdi="Veli"
            saticiAdresi="İstanbul"
            saticiEmail="zynpltnkynk@gmail.com"
            saticiFaks="0212 123 45 67"
            saticiTelefonu="0212 123 45 67"
            siparisTarihi="12.12.2021"
            telefon="0212 123 45 67"
            teslimatAdresi="İstanbul"
            teslimatSuresi="2 gün"
            toplamFiyat={100}
            urun="Bilgisayar"
            urunAdet={1}
            urunFiyati={90}
            key={1}
          />
          <div className="w-full px-4">
            <p className="mb-1 text-center text-xs text-gray-500">
              Ön Bilgilendirme Koşullarını ve Mesafeli Satış Sözleşmesi'ni
              okudum.
            </p>
            <Button
              variant="default"
              className="w-full justify-center text-xl"
              onClick={() => {
                setApproveContract(true);
                setOpenModal(false);
              }}
            >
              Onaylıyorum
            </Button>
          </div>
        </div>
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
