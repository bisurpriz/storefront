import TextField from "../TextField";
import { CustomizableArea } from "@/common/types/Order/order";
import ImageUpload from "../ImageUpload";

interface Area extends Omit<CustomizableArea, "id"> {
  values?: any;
  count: number;
}

const CustomizeCartItem = ({ type, count, values }: Area) => {
  switch (type) {
    case "special_text":
      return Array(count)
        .fill(0)
        .map((_, i) => (
          <div
            className="flex items-center gap-3 whitespace-nowrap font-sans"
            key={i}
          >
            <TextField
              fullWidth
              placeholder="Lütfen istediğiniz yazıyı giriniz."
              id={`special_text_${i}`}
              defaultValue={values?.[`special_text_${i}`] as string}
              label={`Özel Yazı ${i + 1}:`}
            />
          </div>
        ));
    case "special_image":
      return Array(count)
        .fill(0)
        .map((_, i) => (
          <div
            className="flex items-center gap-3 whitespace-nowrap font-sans"
            key={i}
          >
            <ImageUpload
              id={`special_image_${i}`}
              onChange={(file) => {}}
              defaultValue={values?.[`special_image_${i}`] as string}
              label={`Özel Resim ${i + 1}:`}
            />
          </div>
        ));
    default:
      return null;
  }
};

export default CustomizeCartItem;
