"use client";

import Autocomplete from "@/components/Autocomplete";
import Card from "@/components/Card";
import TextInput from "@/components/TextInput";
import React from "react";
import SavedAddresses from "../components/OrderDetail/SavedAddresses";

const OrderDetail = (props: any) => {
  const [selectedSavedAddress, setSelectedSavedAddress] = React.useState<
    string | number
  >("");

  return (
    <div className="w-full relative">
      <section className="w-full">
        <form className="col-span-1 md:col-span-2 flex flex-col gap-3">
          {/* Kullanıcıdan ürünün gönderileceği adres ve teslim edilecek kişi bilgilerini alacağız */}
          <Card
            wrapperClass="w-full"
            contentClass="flex flex-col md:flex-row gap-8"
          >
            <div className="flex flex-col gap-3 w-1/2 max-md:w-full">
              <h1 className="text-2xl font-semibold">Adres Bilgileri</h1>
              <div className="flex flex-col gap-3">
                <SavedAddresses
                  selectedSavedAddress={selectedSavedAddress}
                  setSelectedSavedAddress={setSelectedSavedAddress}
                />
                <Autocomplete
                  label="İl"
                  fetchSuggestions={async (value) => {
                    const response = await new Promise((resolve) => {
                      setTimeout(() => {
                        resolve([
                          {
                            label: "İstanbul",
                            value: "istanbul",
                          },
                          {
                            label: "Ankara",
                            value: "ankara",
                          },
                          {
                            label: "İzmir",
                            value: "izmir",
                          },
                          {
                            label: "Adana",
                            value: "adana",
                          },
                          {
                            label: "Adıyaman",
                            value: "adiyaman",
                          },
                          {
                            label: "Afyonkarahisar",
                            value: "afyonkarahisar",
                          },
                          {
                            label: "Ağrı",
                            value: "agri",
                          },
                          {
                            label: "Aksaray",
                            value: "aksaray",
                          },
                          {
                            label: "Amasya",
                            value: "amasya",
                          },
                          {
                            label: "Antalya",
                            value: "antalya",
                          },
                          {
                            label: "Ardahan",
                            value: "ardahan",
                          },
                          {
                            label: "Artvin",
                            value: "artvin",
                          },
                          {
                            label: "Aydın",
                            value: "aydin",
                          },
                          {
                            label: "Balıkesir",
                            value: "balikesir",
                          },
                          {
                            label: "Bartın",
                            value: "bartin",
                          },
                          {
                            label: "Batman",
                            value: "batman",
                          },
                          {
                            label: "Bayburt",
                            value: "bayburt",
                          },
                          {
                            label: "Bilecik",
                            value: "bilecik",
                          },
                          {
                            label: "Bingöl",
                            value: "bingol",
                          },
                          {
                            label: "Bitlis",
                            value: "bitlis",
                          },
                          {
                            label: "Bolu",
                            value: "bolu",
                          },
                          {
                            label: "Burdur",
                            value: "burdur",
                          },
                          {
                            label: "Bursa",
                            value: "bursa",
                          },
                        ]);
                      }, 1000);
                    });

                    return (response as any[]).filter((item) =>
                      item.label.toLowerCase().includes(value.toLowerCase())
                    );
                  }}
                  placeholder="Lütfen bir il seçiniz"
                />

                <Autocomplete
                  label="İlçe"
                  fetchSuggestions={async (value) => {
                    const response = await new Promise((resolve) => {
                      setTimeout(() => {
                        resolve([
                          {
                            label: "Kadıköy",
                            value: "kadikoy",
                          },
                          {
                            label: "Yeniköy",
                            value: "yenikoy",
                          },
                          {
                            label: "Kavacık",
                            value: "kavacik",
                          },
                          {
                            label: "Beykoz",
                            value: "beykoz",
                          },
                          {
                            label: "Üsküdar",
                            value: "uskudar",
                          },
                          {
                            label: "Ümraniye",
                            value: "umraniye",
                          },
                          {
                            label: "Kartal",
                            value: "kartal",
                          },
                          {
                            label: "Pendik",
                            value: "pendik",
                          },
                          {
                            label: "Tuzla",
                            value: "tuzla",
                          },
                          {
                            label: "Maltepe",
                            value: "maltepe",
                          },
                          {
                            label: "Ataşehir",
                            value: "atasehir",
                          },
                          {
                            label: "Sancaktepe",
                            value: "sancaktepe",
                          },
                          {
                            label: "Sultanbeyli",
                            value: "sultanbeyli",
                          },
                          {
                            label: "Çekmeköy",
                            value: "cekmekoy",
                          },
                          {
                            label: "Beykoz",
                            value: "beykoz",
                          },
                          {
                            label: "Şile",
                            value: "sile",
                          },
                          {
                            label: "Büyükçekmece",
                            value: "buyukcekmece",
                          },
                          {
                            label: "Çatalca",
                            value: "catalca",
                          },
                          {
                            label: "Silivri",
                            value: "silivri",
                          },
                          {
                            label: "Avcılar",
                            value: "avcilar",
                          },
                          {
                            label: "Bağcılar",
                            value: "bagcilar",
                          },
                          {
                            label: "Bahçelievler",
                            value: "bahcelievler",
                          },
                          {
                            label: "Bakırköy",
                            value: "bakirkoy",
                          },
                          {
                            label: "Bayrampaşa",
                            value: "bayrampasa",
                          },
                          {
                            label: "Beşiktaş",
                            value: "besiktas",
                          },
                          {
                            label: "Beylikdüzü",
                            value: "beylikduzu",
                          },
                        ]);
                      }, 1000);
                    });

                    return (response as any[]).filter((item) =>
                      item.label.toLowerCase().includes(value.toLowerCase())
                    );
                  }}
                  placeholder="Lütfen bir ilçe seçiniz"
                />

                <TextInput
                  label="Adres"
                  id="address"
                  placeholder="Adres giriniz"
                />
                <TextInput
                  label="Telefon Numarası"
                  id="phone"
                  placeholder="Telefon numarası giriniz"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 w-1/2 max-md:w-full">
              <h1 className="text-2xl font-semibold">Teslimat Bilgileri</h1>
              <div className="flex flex-col gap-3">
                <TextInput
                  label="Ad Soyad"
                  id="name"
                  placeholder="Ad soyad giriniz"
                />
                <TextInput
                  label="Telefon Numarası"
                  id="phone"
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
