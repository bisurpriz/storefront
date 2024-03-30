import { Address, City, District, Quarter } from "../Addresses/addresses";

export interface UserAddressesResponse {
  id: Address["id"];
  district: Pick<District, "name" | "id">;
  quarter: Pick<Quarter, "name" | "id">;
  city: Pick<City, "name" | "id">;
  address: Address["address"];
  address_title: Address["address_title"];
}
