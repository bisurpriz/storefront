import { getUserAddresses } from "./actions";
import Address from "./components/Address";

const AddressesPage = async () => {
  const { user_addresses } = await getUserAddresses();

  if (!user_addresses) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-primary md:text-3xl">
        Kayıtlı Adreslerim
      </h1>
      <Address initalAddress={user_addresses} />
    </div>
  );
};

export default AddressesPage;
