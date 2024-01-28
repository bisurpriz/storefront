import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { getUserAddresses } from "./actions";
import Address from "./components/Address";

const AddressesPage = async () => {
  const { user_addresses } = await getUserAddresses();
  return (
    <div>
      <h1 className='text-2xl font-bold'>
        Kayıtlı Adreslerim ({user_addresses?.length})
      </h1>
      <div className='mt-4'>
        {user_addresses?.map((address) => (
          <Address key={address.id} address={address} />
        ))}
      </div>
    </div>
  );
};

export default withPageAuthRequired(AddressesPage);
