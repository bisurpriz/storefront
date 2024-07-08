import { UserAddressesResponse } from "@/common/types/User/user";
import Button from "@/components/Button";
import Edit from "@/components/Icons/Edit";
import Trash from "@/components/Icons/Trash";
import TextField from "@/components/TextField";

const AddressContent = ({ address }: { address: UserAddressesResponse }) => {
  return (
    <div className="flex flex-col">
      <TextField
        label="Adres Başlığı"
        value={address.address_title}
        disabled
        className="mb-4"
      />
      <TextField
        label="Adres"
        value={address.address}
        disabled
        className="mb-4"
      />
      <TextField
        label="İl"
        value={address.city.name}
        disabled
        className="mb-4"
      />
      <TextField
        label="İlçe"
        value={address.district.name}
        disabled
        className="mb-4"
      />
      <TextField
        label="Mahalle"
        value={address.quarter.name}
        disabled
        className="mb-4"
      />
      <div className="w-full justify-end flex gap-4">
        <Button
          className="text-sm"
          color="error"
          icon={<Trash className="mr-2 text-xl" />}
        >
          Sil
        </Button>
        <Button color="primary" icon={<Edit className="mr-2 text-xl" />}>
          Düzenle
        </Button>
      </div>
    </div>
  );
};

export default AddressContent;
