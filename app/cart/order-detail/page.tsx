"use client";

import Autocomplete from "@/components/Autocomplete";
import Card from "@/components/Card";
import PhoneInput from "@/components/PhoneInput";
import TextField from "@/components/TextField";
import { useState } from "react";

const OrderDetail = (props: any) => {
  const [selectedSavedAddress, setSelectedSavedAddress] = useState<
    DropdownOption | DropdownOption[] | null
  >(null);

  return (
    <div className="w-full relative">
      <section className="w-full">
        <form className="col-span-1 md:col-span-2 flex flex-col gap-3">
          <Card
            wrapperClass="w-full"
            contentClass="flex flex-col md:flex-row gap-8"
          >
            <div className="flex flex-col gap-3 w-1/2 max-md:w-full">
              <h1 className="text-2xl font-semibold">Adres Bilgileri</h1>
              <div className="flex flex-col gap-3">
                <Autocomplete
                  options={[
                    {
                      label: "İstanbul",
                      value: "İstanbul",
                    },
                    {
                      label: "Ankara",
                      value: "Ankara",
                    },
                    {
                      label: "İzmir",
                      value: "İzmir",
                    },
                  ]}
                  label="İl"
                  onChange={(value) => setSelectedSavedAddress(value)}
                  placeholder="İl seçiniz"
                />

                <TextField label="Adres" placeholder="Adres giriniz" />
                <TextField
                  label="Telefon Numarası"
                  placeholder="Telefon numarası giriniz"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 w-1/2 max-md:w-full">
              <h1 className="text-2xl font-semibold">Teslimat Bilgileri</h1>
              <div className="flex flex-col gap-3">
                <TextField label="Ad Soyad" placeholder="Ad soyad giriniz" />
                <PhoneInput
                  label="Telefon Numarası"
                  placeholder="Telefon numarası giriniz"
                />
              </div>
            </div>
          </Card>
        </form>
      </section>
    </div>
  );
};

export default OrderDetail;
