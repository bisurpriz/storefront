import { Link } from "@/components/Link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const CartHomePageButton = () => {
  return (
    <Link href="/" className="w-fit">
      <Button
        icon={<ArrowLeft className="mr-2 h-4 w-4" />}
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
