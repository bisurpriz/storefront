import { getBrandWithTitle } from "@/utils/getBrandWithTitle";

export const generateMetadata = () => {
  return {
    title: getBrandWithTitle("Ödeme Sayfası"),
    description: "Ödeme sayfası",
  };
};

const CheckoutLayout = ({ children }) => children;

export default CheckoutLayout;
