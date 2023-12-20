import type { UserAddressesResponse } from "@/common/types/User/user";
import AccordionItem from "@/components/Accordion/AccordionItem";
import React from "react";
import AddressContent from "./AddressContent";

const Address = ({ address }: { address: UserAddressesResponse }) => {
  return (
    <AccordionItem
      bordered={true}
      title={address.address_title}
      isOpen={false}
      content={<AddressContent address={address} />}
      className="rounded-md"
    />
  );
};

export default Address;
