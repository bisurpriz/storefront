import { Button } from "@/components/ui/button";
import ArrowLeft from "@/components/Icons/ArrowLeft";
import { Link } from "@/components/Link";

const CartHomePageButton = () => {
  return (
    <Link href="/">
      <Button
        icon={<ArrowLeft />}
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
