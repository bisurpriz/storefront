import PageTransition from "@/components/AnimatePresence/PageTransition";
import React from "react";

const Template = ({ children }: { children: React.ReactNode }) => {
  return <PageTransition>{children}</PageTransition>;
};

export default Template;
