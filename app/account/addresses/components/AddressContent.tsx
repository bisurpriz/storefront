import TextField from "@/components/TextField";
import { Button } from "@/components/ui/button";
import { GetUserAddressesQuery } from "@/graphql/queries/address/address.generated";
import { Edit, Trash } from "lucide-react";

const AddressContent = ({
  address,
}: {
  address: GetUserAddressesQuery["user_address"][0];
}) => {
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
      <TextField label="İl" value={address.city} disabled className="mb-4" />
      <TextField
        label="İlçe"
        value={address.district}
        disabled
        className="mb-4"
      />
      <TextField
        label="Mahalle"
        value={address.quarter}
        disabled
        className="mb-4"
      />
      <div className="flex w-full justify-end gap-4">
        <Button
          className="text-sm"
          variant="destructive"
          icon={<Trash className="mr-2 text-xl" />}
        >
          Sil
        </Button>
        <Button variant="default" icon={<Edit className="mr-2 text-xl" />}>
          Düzenle
        </Button>
      </div>
    </div>
  );
};

export default AddressContent;
