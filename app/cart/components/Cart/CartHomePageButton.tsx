import { Button } from "@/components/ui/button";
import ArrowLeft from "@/components/Icons/ArrowLeft";
import { Link } from "@/components/Link";

const CartHomePageButton = () => {
  return (
    <Link href="/" className="w-fit">
      <Button
        icon={<ArrowLeft className="w-4 h-4 mr-2" />}
        type="button"
        size="sm"
        variant="link"
      >
        Alışverişe Devam Et
      </Button>
    </Link>
  );
};

export default CartHomePageButton;
