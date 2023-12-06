export interface Address {
  id: number;
  city_id: City["id"];
  district_id: District["id"];
  quarter_id: Quarter["id"];
  address: string;
  address_title: string;
}

export interface City extends LocationCommonTypes {}

export interface District extends LocationCommonTypes {}

export interface Quarter extends LocationCommonTypes {}

export interface LocationCommonTypes {
  id: number;
  code: number;
  name: string;
  parent_id: number;
  minlongitude: string;
  minlatitude: string;
  maxlongitude: string;
  maxlatitude: string;
}
