"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GetUserAddressesQuery } from "@/graphql/queries/address/address.generated";
import { Edit2, MapPin, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export default function Address({
  initalAddress,
}: {
  initalAddress: GetUserAddressesQuery["user_address"];
}) {
  const [address, setAddresses] =
    useState<GetUserAddressesQuery["user_address"]>(initalAddress);
  const [newAddress, setNewAddress] = useState<
    Omit<GetUserAddressesQuery["user_address"][0], "id" | "user" | "user_id">
  >({
    address_title: "",
    address: "",
    city: "",
    district: "",
    quarter: "",
    place_id: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleAddOrEditAddress = async () => {
    if (editingId) {
      console.log("Adres güncellendi", newAddress);
      const guncellenecekAdres = { ...newAddress, id: editingId };
      setAddresses(
        address.map((adres) =>
          adres.id === editingId
            ? (guncellenecekAdres as GetUserAddressesQuery["user_address"][0])
            : adres,
        ),
      );
    } else {
      console.log("Yeni adres eklendi", newAddress);
    }
    resetForm();
  };

  const handleDeleteAddress = async (id: number) => {
    // Burada gerçek bir API çağrısı yapılacak
    setAddresses(address.filter((adres) => adres.id !== id));
  };

  const addressEdit = (adres: GetUserAddressesQuery["user_address"][0]) => {
    setNewAddress({
      address_title: adres.address_title,
      address: adres.address,
      city: adres.city || "",
      district: adres.district || "",
      quarter: adres.quarter || "",
      place_id: adres.place_id || "",
    });
    setEditingId(adres.id);
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setNewAddress({
      address_title: "",
      address: "",
      city: "",
      district: "",
      quarter: "",
      place_id: "",
    });
    setEditingId(null);
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {address.map((adres) => (
          <Card
            key={adres.id}
            className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg"
          >
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-primary">
                  {adres.address_title}
                </h3>
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">{adres.address}</p>
                <p className="text-sm text-gray-600">
                  {adres.city}, {adres.district}, {adres.quarter}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2 bg-gray-50 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => addressEdit(adres)}
                className="hover:text-primary-dark text-primary"
              >
                <Edit2 className="mr-2 h-4 w-4" /> Düzenle
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDeleteAddress(adres.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="mr-2 h-4 w-4" /> Sil
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="hover:bg-primary-dark w-full bg-primary transition-colors duration-300 md:w-auto">
            <Plus className="mr-2 h-4 w-4" /> Yeni Adres Ekle
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Adresi Düzenle" : "Yeni Adres Ekle"}
            </DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddOrEditAddress();
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="address_title">Adres Başlığı</Label>
              <Input
                id="address_title"
                value={newAddress.address_title}
                onChange={(e) =>
                  setNewAddress({
                    ...newAddress,
                    address_title: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Adres</Label>
              <Input
                id="address"
                value={newAddress.address}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, address: e.target.value })
                }
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Şehir</Label>
                <Input
                  id="city"
                  value={newAddress.city || ""}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, city: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="district">İlçe</Label>
                <Input
                  id="district"
                  value={newAddress.district || ""}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, district: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="quarter">Mahalle</Label>
              <Input
                id="quarter"
                value={newAddress.quarter || ""}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, quarter: e.target.value })
                }
              />
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline" onClick={resetForm}>
                  İptal
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="hover:bg-primary-dark bg-primary"
              >
                {editingId ? "Güncelle" : "Ekle"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
