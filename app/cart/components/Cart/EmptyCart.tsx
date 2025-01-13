import { Link } from "@/components/Link";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

const EmptyCart = () => {
  return (
    <div className="flex min-h-[400px] items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="mx-auto w-full max-w-md space-y-8 text-center">
        <div className="relative">
          <div className="absolute inset-0 flex animate-pulse items-center justify-center opacity-20">
            <div className="h-32 w-32 rounded-full bg-primary/10" />
          </div>
          <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/5 ring-2 ring-primary/20 transition-all duration-300 hover:ring-primary sm:h-32 sm:w-32">
            <ShoppingCart className="h-12 w-12 text-primary/80 sm:h-16 sm:w-16" />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 sm:text-2xl">
            Sepetinizde ürün bulunmamaktadır
          </h3>

          <p className="text-base text-gray-600 sm:text-lg">
            Alışverişe başlamak için aşağıdaki butona tıklayın
          </p>

          <Button
            variant="default"
            className="mt-6 rounded-xl px-8 py-6 text-lg transition-transform duration-300 hover:scale-105"
            onClick={(e) => e.preventDefault()}
          >
            <Link href="/" className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Alışverişe Başla
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
