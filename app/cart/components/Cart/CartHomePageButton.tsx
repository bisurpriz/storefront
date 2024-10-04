import { Button } from "@/components/ui/button";
import ArrowLeft from "@/components/Icons/ArrowLeft";
import { Link } from "@/components/Link";

const CartHomePageButton = () => {
  return (
    <Link href="/">
      <Button icon={<ArrowLeft />} type="button" size="sm" variant="link">
        Alışverişe Devam Et
      </Button>
    </Link>
  );
};

export default CartHomePageButton;
