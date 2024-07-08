import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button";
import { IMAGE_URL } from "@/contants/urls";
import { ProductItemProps } from ".";
import Basket from "@/components/Icons/Basket";

export default function ProductItem3({
  description,
  id,
  image_url: image,
  name,
  price,
  loading,
}: ProductItemProps) {
  return (
    <div className="relative group overflow-hidden rounded-lg">
      <Link className="absolute inset-0 z-10" href="#">
        <span className="sr-only">View</span>
      </Link>
      <Image
        alt={name}
        className="object-contain w-full h-64"
        height="500"
        width="400"
        src={`${IMAGE_URL}/${image.toString()}`}
        style={{
          aspectRatio: "400/500",
        }}
      />
      <div className=" p-4 bg-2">
        <h3 className="font-semibold text-lg md:text-xl">
          {loading ? "Loading..." : name}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {loading ? "Loading..." : description}
        </p>
        <h4 className="font-semibold text-base md:text-lg">
          {loading ? "Loading..." : price}
        </h4>
        <Button className="mt-2" size="medium" icon={<Basket />}>
          <span className="max-sm:hidden">Sepete Ekle</span>
        </Button>
      </div>
    </div>
  );
}
