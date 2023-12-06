import ProductItemSkeleton from "./ProductItemSkeleton";
import ProductItemImage from "../ProductItemImage/ProductItemImage";
import AddCartButton from "./components/AddCartButton";
import { ProductItemProps } from ".";

function ProductItem4({
  description,
  id,
  image_url: image,
  name,
  price,
  loading,
}: ProductItemProps) {
  return !loading ? (
    <div
      className="flex flex-col border border-primary-200 dark:border-primary-800 p-4 rounded-lg w-full max-w-sm mx-auto overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
      key={id}
    >
      <ProductItemImage
        alt="Product Image"
        className="w-full h-64"
        height={256}
        width={256}
        src={`${image}`}
        id={id}
      />
      <div className="mt-4 flex flex-col">
        <h2 className="text-xl font-bold line-clamp-2" title={name}>
          {name}
        </h2>
        <p
          className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 truncate"
          title={description}
        >
          {description}
        </p>
      </div>
      <div className="flex justify-between items-end mt-4 max-2xl:flex-col max-2xl:justify-start max-2xl:items-start max-2xl:gap-4 grow">
        <div className="text-2xl font-bold">{price} ₺</div>
        <AddCartButton
          description={description}
          id={id}
          image_url={image}
          name={name}
          price={price}
          loading={loading}
        />
      </div>
    </div>
  ) : (
    <ProductItemSkeleton />
  );
}

export default ProductItem4;
