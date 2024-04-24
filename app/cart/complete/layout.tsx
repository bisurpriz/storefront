import { getBrandWithTitle } from "@/utils/getBrandWithTitle";

export const generateMetadata = async () => {
  return {
    title: getBrandWithTitle("Sipariş Tamamlandı"),
    description: "Sipariş tamamlandı sayfası",
  };
};

const CartCompleteLayout = ({ children }) => children;

export default CartCompleteLayout;
