import CustomizeCartItem from "./CustomizeCartItem";
import Button from "../Button";
import { getBase64Image } from "@/utils/getBase64Image";
import { ProductForCart } from "@/common/types/Cart/cart";
import { updateCartItemWithRedis } from "@/app/cart/actions";

interface CustomizeGroupProps {
  index: number;
  quantity: ProductForCart["quantity"];
  product: ProductForCart;
}

const CustomizeGroup = ({ product, index, quantity }: CustomizeGroupProps) => {
  const handleFormSubmit = async (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());
    const keys = Object.keys(data);
    // Image var mı kontrol et
    const hasImages = keys?.find((item) => item.includes("special_image"));
    const image = data[hasImages];
    // image file to base64
    if (image instanceof File) {
      const base64 = (await getBase64Image(image)) as string;
      if (image.name && base64) {
        data[hasImages] = base64;
      } else {
        data[hasImages] = "";
      }
    }

    const texts = [];
    const images = [];

    keys.forEach((key) => {
      if (key.includes("special_text")) {
        texts.push({
          [key]: data[key],
        });
      } else if (key.includes("special_image")) {
        images.push({
          [key]: data[key],
        });
      }
    });

    const newProd = {
      ...product,
      product_customizable_areas: product.product_customizable_areas?.map(
        (item) => {
          if (item.customizable_area.type === "special_text") {
            return {
              ...item,
              customizable_area: {
                ...item.customizable_area,
                values: texts,
              },
            };
          } else if (item.customizable_area.type === "special_image") {
            return {
              ...item,
              customizable_area: {
                ...item.customizable_area,
                values: images,
              },
            };
          }
        }
      ),
    };

    await updateCartItemWithRedis(newProd);
  };

  return (
    <form
      autoComplete="off"
      className="flex flex-col gap-3 w-full"
      action={handleFormSubmit}
    >
      {product.product_customizable_areas?.map(
        ({ count, customizable_area: { type, values } }, i) => {
          return (
            <CustomizeCartItem
              key={i}
              type={type}
              count={count}
              values={values}
            />
          );
        }
      )}
      <Button
        type="submit"
        className="mt-3 w-fit"
        size="small"
        variant="outlined"
        color="secondary"
      >
        Kaydet
      </Button>
    </form>
  );
};

export default CustomizeGroup;
