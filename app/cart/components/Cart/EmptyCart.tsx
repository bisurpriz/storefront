import { Button } from "@/components/ui/button";
import { Link } from "@/components/Link";
import { ShoppingCart } from "lucide-react";

const EmptyCart = () => {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="space-y-4 text-center">
          <div className="mx-auto flex w-fit items-center justify-center rounded-full bg-primary-foreground p-4 ring-[3px] ring-primary">
            <ShoppingCart className="mx-auto h-12 w-12 text-primary" />
          </div>
          <h3 className="text-base font-medium text-gray-800">
            Sepetinizde ürün bulunmamaktadır
          </h3>
          <p className="text-sm text-gray-500">
            Alışverişe başlamak için aşağıdaki butona tıklayın
          </p>

          <Button variant="default" onClick={(e) => e.preventDefault()}>
            <Link href="/">Alışverişe Başla</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
