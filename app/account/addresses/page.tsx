import { getUserAddresses } from "./actions";
import Address from "./components/Address";

const AddressesPage = async () => {
  const { user_addresses } = await getUserAddresses();

  if (!user_addresses) {
    return null;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">
        Kayıtlı Adreslerim ({user_addresses?.length})
      </h1>
      <div className="mt-4">
        {user_addresses?.map((address) => (
          <Address key={address.id} address={address} />
        ))}
      </div>
    </div>
  );
};

export default AddressesPage;
