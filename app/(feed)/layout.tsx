import Breadcrumb from "@/components/Layout/Breadcrumb";
import { ReactNode } from "react";

export const revalidate = 3600;

const FeedLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Breadcrumb />
      {children}
    </div>
  );
};

export default FeedLayout;
