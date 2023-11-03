import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button";
import { BsCart3 } from "react-icons/bs";
import { IMAGE_URL } from "@/contants/urls";

export default function ProductItem3({
  description,
  id,
  image,
  name,
  price,
  loading,
}: ProductItemProps) {
  console.log(image);
  return (
    <div className="relative group overflow-hidden rounded-lg">
      <Link className="absolute inset-0 z-10" href="#">
        <span className="sr-only">View</span>
      </Link>
      <Image
        alt={name}
        className="object-cover w-full h-64"
        height="500"
        src={`${IMAGE_URL}/${image.toString()}`}
        style={{
          aspectRatio: "400/500",
          objectFit: "cover",
        }}
        width="400"
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
        <Button className="mt-2" size="medium" icon={<BsCart3 />}>
          <span className="max-sm:hidden">Sepete Ekle</span>
        </Button>
      </div>
    </div>
  );
}
