import { ContractProvider } from "@/contexts/ContractContext";
import React from "react";

const CartLayout = ({ children }) => (
  <ContractProvider>{children}</ContractProvider>
);

export default CartLayout;
