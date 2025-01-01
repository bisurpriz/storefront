export interface ContractContextProps {
  children: React.ReactNode;
}

export interface ContractContextState {
  approveContract: boolean;
  isModalOpen: boolean;
  contractData: ContractData;
}

export interface ContractContextValue extends ContractContextState {
  openApproveContract: () => void;
  setApproveContract: (value: boolean) => void;
  updateContractData: (data: Partial<ContractData>) => void;
}

export interface ContractModalProps {
  open: boolean;
  onClose: () => void;
  onApprove: () => void;
  contractData: ContractData;
}

export interface ContractData {
  aliciAdi: string;
  email: string;
  kargoTeslimSuresi: string;
  kargoTutari: number;
  saticiAdi: string;
  saticiAdresi: string;
  saticiEmail: string;
  saticiFaks: string;
  saticiTelefonu: string;
  siparisTarihi: string;
  telefon: string;
  teslimatAdresi: string;
  teslimatSuresi: string;
  toplamFiyat: number;
  urun: string;
  urunAdet: number;
  urunFiyati: number;
}
