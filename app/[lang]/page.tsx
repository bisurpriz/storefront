import View1 from "@/components/Layout/GridViews/View1";
import { getDictionary } from "@/utils/get-dictionaries";
import { Locale } from "@/utils/i18n-config";

export default async function Page({ params }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(params.lang);

  return (
    <View1
      data={Array.from({ length: 10 }, (_, i) => ({
        id: i.toString(),
        title: `Title ${i}`,
        description: `Description ${i}`,
        name: `Name ${i}`,
        image: `https://picsum.photos/seed/${i}/200/300`,
        price: 100 * i,
      }))}
    />
  );
}
