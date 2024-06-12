export enum Locale {
  TR = "tr",
  EN = "en",
}

export interface BinCheckRequest {
  binNumber: string;
  price: string;
}

export interface BinCheckResponse {
  binNumber: string;
  cardType: string;
  cardAssociation: string;
  cardFamily: string;
  bankName: string;
  bankCode: number;
  commercial: number;
  status: string;
  locale: string;
  systemTime: number;
}
