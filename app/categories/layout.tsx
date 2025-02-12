import DesignLayout from "@/components/Layout/DesignLayout";
import { ReactNode } from "react";

const FeedLayout = async ({ children }: { children: ReactNode }) => {
  return <DesignLayout>{children}</DesignLayout>;
};

export default FeedLayout;
