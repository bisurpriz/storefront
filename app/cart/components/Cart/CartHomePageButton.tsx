import Button from "@/components/Button";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";

const CartHomePageButton = () => {
  return (
    <Link href="/">
      <Button
        icon={<AiOutlineArrowLeft />}
        type="button"
        size="small"
        variant="link"
        className="gap-2 !px-0 !font-normal"
      >
        Alışverişe Devam Et
      </Button>
    </Link>
  );
};

export default CartHomePageButton;
