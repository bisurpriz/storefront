"use client";
import { useMemo } from "react";
import CustomizeCartItem from "./CustomizeCartItem";
import Button from "../Button";
// import { getBase64Image } from "@/utils/getBase64Image";
import { ProductForCart } from "@/common/types/Cart/cart";

interface CustomizeGroupProps {
  customize: ProductForCart["product_customizable_areas"];
  productId: ProductForCart["id"];
  index: number;
  quantity: ProductForCart["quantity"];
}

const CustomizeGroup = ({
  customize,
  productId,
  index,
  quantity,
}: CustomizeGroupProps) => {
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault();
    // const formData = new FormData(e.currentTarget);
    // const data = Object.fromEntries(formData.entries());
    // const keys = Object.keys(data);
    // // Image var mı kontrol et
    // const hasImages = keys?.find((item) => item.includes("special_image"));
    // const image = data[hasImages];
    // // image file to base64
    // if (image instanceof File) {
    //   const base64 = (await getBase64Image(image)) as string;
    //   if (image.name && base64) {
    //     data[hasImages] = base64;
    //   } else {
    //     data[hasImages] = "";
    //   }
    //   // If has specailInstructions, add new instructions to old instructions
    //   const item = cartItems.find((item) => item.id === productId);
    //   if (item?.specialInstructions?.length > 0) {
    //     const newInstructions = item.specialInstructions[index]
    //       ? [
    //           ...item.specialInstructions.slice(0, index),
    //           {
    //             ...item.specialInstructions[index],
    //             ...data,
    //           },
    //           ...item.specialInstructions.slice(index + 1),
    //         ]
    //       : [
    //           ...item.specialInstructions,
    //           {
    //             ...data,
    //           },
    //         ];
    //     updateItem({
    //       id: productId,
    //       quantity,
    //       specialInstructions: newInstructions,
    //     });
    //   } else {
    //     updateItem({
    //       id: productId,
    //       quantity,
    //       specialInstructions: [data],
    //     });
    //   }
    // }
  };

  const values = useMemo(() => {
    // const item = cartItems.find((item) => item.id === productId);
    // return item?.specialInstructions;
  }, [productId, index]);

  return (
    <form
      autoComplete="off"
      className="flex flex-col gap-3 w-full"
      onSubmit={handleFormSubmit}
    >
      {customize?.map(({ count, customizable_area: { type } }, i) => {
        return (
          <CustomizeCartItem
            key={i}
            type={type}
            count={count}
            values={values?.[index]}
          />
        );
      })}
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
