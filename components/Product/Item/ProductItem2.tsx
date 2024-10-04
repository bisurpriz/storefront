/**
 * v0 by Vercel.
 * @see https://v0.dev/t/WALd6mN4Lpq
 */
import { Link } from "@/components/Link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ProductItem2() {
  return (
    <div className="relative group overflow-hidden rounded-lg">
      <Link className="absolute inset-0 z-10" href="#">
        <span className="sr-only">View product</span>
      </Link>
      <Image
        alt="Product"
        className="object-contain w-full h-60"
        height={300}
        width={400}
        src="/placeholder.svg"
        style={{
          aspectRatio: "400/300",
        }}
      />
      <div className=" p-4 bg-2">
        <h3 className="font-semibold text-lg md:text-xl">Product Name</h3>
        <h4 className="font-semibold text-base md:text-lg">$29.99</h4>
        <Button className="mt-2">Add to Cart</Button>
      </div>
    </div>
  );
}
