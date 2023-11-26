import Autocomplete from "@/components/Autocomplete";
import Button from "@/components/Button";
import Card from "@/components/Card";
import TextInput from "@/components/TextInput";
import React from "react";

const OrderDetail = async () => {
  return (
    <section className="w-full content-height">
      <form className="flex gap-4">
        {/* Kullanıcıdan ürünün gönderileceği adres ve teslim edilecek kişi bilgilerini alacağız */}
        <Card wrapperClass="lg:w-3/4 w-full" contentClass="flex gap-8">
          <div className="flex flex-col gap-3 w-1/2 max-md:w-full">
            <h1 className="text-2xl font-semibold">Adres Bilgileri</h1>
            <div className="flex flex-col gap-3">
              <Autocomplete
                label="İl"
                fetchSuggestions={async (value) => {
                  "use server";
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

                  return (response as any[])
                    .map((item: any) => item.label)
                    .filter((item: any) =>
                      item.toLowerCase().includes(value.toLowerCase())
                    );
                }}
                placeholder="Lütfen bir il seçiniz"
              />

              <Autocomplete
                label="İlçe"
                fetchSuggestions={async (value) => {
                  "use server";
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

                  return (response as any[])
                    .map((item: any) => item.label)
                    .filter((item: any) =>
                      item.toLowerCase().includes(value.toLowerCase())
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
        <div className="flex-1">
          <Button
            type="button"
            color="primary"
            className="w-full justify-center"
          >
            Siparişi Tamamla
          </Button>
        </div>
      </form>
    </section>
  );
};

export default OrderDetail;
