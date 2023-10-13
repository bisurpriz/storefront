import { getDictionary } from "@/utils/get-dictionaries";
import { Locale } from "@/utils/i18n-config";

export default async function Page({ params }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(params.lang);

  return (
    <div>
      <h1>{JSON.stringify(dictionary.header.navbar.NOTIFICATIONS)}</h1>
    </div>
  );
}
