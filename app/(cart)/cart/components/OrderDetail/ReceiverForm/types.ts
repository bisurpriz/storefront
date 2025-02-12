import { IPlace } from "@/common/types/Product/product";
import { AutoCompleteOption } from "@/components/Autocomplete";
import { Control } from "react-hook-form";
import { InferType } from "yup";
import { orderDetailSchema } from "../schema";

export type OrderDetailFormData = InferType<typeof orderDetailSchema>;

export type InvoiceType = "person" | "company";

export type StepData = {
  label: string;
  key: "sender" | "receiver" | "notes";
};

export interface BaseStepProps {
  control: Control<OrderDetailFormData>;
}

export interface SenderStepProps extends BaseStepProps {
  selectedInvoiceType: InvoiceType;
  setSelectedInvoiceType: (type: InvoiceType) => void;
}

export interface AddressFieldsProps extends BaseStepProps {
  setValue: (key: keyof OrderDetailFormData, value: any) => void;
  city: string | null;
  district: string | null;
  neighborhood: string | null;
  neighborhoods: AutoCompleteOption[];
  setNeighborhoods: (neighborhoods: AutoCompleteOption[]) => void;
  availableDistricts: string[];
  placeData: any;
  hasSameDayProduct: boolean;
  selectedCargoLocation: IPlace | undefined;
}

export interface ReceiverStepProps extends AddressFieldsProps, SenderStepProps {
  setSelectedCargoLocation: (location: IPlace | undefined) => void;
}
