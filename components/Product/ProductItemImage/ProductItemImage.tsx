import Image from "next/image";
import Link from "next/link";
import { ProductItemProps } from "../Item";

interface ProductItemImageProps extends Pick<ProductItemProps, "id"> {
  style?: React.CSSProperties;
  className?: string;
  alt: string;
  src: string;
  width: number;
  height: number;
}

const ProductItemImage = ({
  alt,
  height,
  src,
  width,
  className,
  style,
  id,
}: ProductItemImageProps) => {
  const baseStyle =
    "w-full object-cover aspect-square cursor-pointer hover:opacity-90 hover:scale-105 transition-all duration-300";

  return (
    <Link href={`/products/${id}`} className="min-w-fit">
      <Image
        alt={alt}
        src={src}
        width={width}
        height={height}
        className={`${baseStyle} ${className}`}
        style={style}
      />
    </Link>
  );
};

export default ProductItemImage;
