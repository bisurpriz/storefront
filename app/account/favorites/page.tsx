import ProductItem from "@/components/Product/Item";
import { IMAGE_URL } from "@/contants/urls";
import React from "react";

const favoritesData = [
  {
    __typename: "product",
    id: 18,
    description: "sadasddsasa∂ßæ∂asdsa",
    name: "testsetsetset",
    image_url: ["product/jcy2kqwfg8k-1698155253038.png"],
    price: "$3,434.00",
    quantity: 33,
  },
  {
    __typename: "product",
    id: 21,
    description: "lasjdakls hkdashdjkas kj",
    name: "deneme",
    image_url: [
      "product/nloy1fgh3b-1698243277835.png",
      "product/exl7u3f4ej-1698243277836.png",
    ],
    price: "$199.00",
    quantity: 40,
  },
  {
    __typename: "product",
    id: 57,
    description:
      "Egzotik lezzetleri bir araya getiren, şık kutusu ile herkesi etkileyen ve her ısırıkta yepyeni bir deneyim yaşatan özel bir kutu: Palmiye Esintisi & Sütlü Gurme Lezzetler Çikolata Kutusu… ",
    name: "Palmiye Esintisi & Sütlü Gurme Lezzetler Çikolata Kutusu 260g",
    image_url: [
      "product/p51fa1nufxl-1699533977799.jpeg",
      "product/cb0jcgcenr-1699533978219.jpeg",
      "product/iipzuhssl4-1699533978278.jpeg",
    ],
    price: "$279.00",
    quantity: 110,
  },
  {
    __typename: "product",
    id: 58,
    description:
      "Hediyelik çikolata arıyor ve herkese hitap edecek lezzetler mi barındırsın istiyorsunuz? O zaman Sarı Çizgili Kutuda Sütlü & Tuzlu Karamelli Çikolata kutusu tam size göre! Şık tasarlanmış kare kutu içerisinde dört tepe sütlü, çizgili bonbon bitter, tuzlu karamelli ve Hindistan cevizli çizgili çikolataların bir arada sunulduğu lezzet şöleni günün harika geçmesine vesile olacaktır. Ayrıca bu lezzet şölenini başarılarınızı ve kutlama gerektiren özel anlarınızı tatlandırmak için siz de hemen deneyimleyebilirsiniz. Yeni bir işe başlayan, yeni bir ev tutan veya kariyerinde özel bir an yaşayan sevdiklerinize hediye edebileceğiniz bu özel aranjmanı, sıradan bir günü özelleştirmek veya bayram günleri, Anneler Günü, doğum günü, Sevgililer Günü gibi özel günleri unutulmaz kılmak adına sipariş edebilirsiniz. Siparişiniz sonrasında çıkacak “Not oluşturma” sayfasında birkaç cümlelik not oluşturarak hediyenizi daha anlamlı bir hale getirmeyi unutmayın.",
    name: "Sarı Çizgili Kutuda Sütlü & Tuzlu Karamelli Çikolata 195g",
    image_url: [
      "product/ice34wlvxr-1699534340396.jpeg",
      "product/nsrtw6716y-1699534340799.jpeg",
      "product/w5rgwbaiqx-1699534340877.jpeg",
    ],
    price: "$210.00",
    quantity: 50,
  },
  {
    __typename: "product",
    id: 59,
    description:
      "Ürünlerimiz sıcak mevsimlerde soğuk zincir ile gönderilmektedir. Tüm sevdikleriniz için hazırlamış olduğumuz 4 adet farklı dolgulardan oluşan truff, 6 adet farklı lezzetlerden oluşan spesiyal çikolata ve 2 farklı çeşit meyve küplerinin bir araya gelerek oluşturduğu efsane bir lezzet şöleni.Ürünlerimiz 1.Sınıf Belçika Çikolatasından Üretilmektedir.\r\n\r\nKutunun Ebadı: 20,5cm x 22 cm x 5,5 cm\r\n\r\nÜrünlerimizde alkol, domuz yağı ve katkıları yoktur.\r\n\r\nSiparişiniz sıcak hava şartlarından etkilenmeden özel korumalı ambalajlarında sizlere ulaştırılır.\r\n\r\nGörsellerde paylaştığımız ürünlerde stok durumuna göre değişiklik sağlanabilir. Görsel olarak farklılıklar olsa da ürün içerikleri birebir aynıdır.\r\n\r\nÜrünümüz aşırı nem, koku ve sıcaklıktan etkilenen hassas bir üründür. Güneş ışığından, koku ve nemden uzak, 18-22°C aralığında muhafaza ediniz. Buzdolabına koymayınız",
    name: "Fenomen Dream Spesiyal Çikolata (500 GR)",
    image_url: [
      "product/i766oy5tu1k-1699534616930.jpeg",
      "product/evzsljy924-1699534617351.jpeg",
      "product/z4xv7oin7g-1699534617430.jpeg",
    ],
    price: "$309.00",
    quantity: 25,
  },
  {
    __typename: "product",
    id: 60,
    description:
      "Birbirinden lezzetli çikolatalarla tasarlanmış bu şık kutuyu sevdiklerinize hediye edebilir, damaklarında nefis bir tat bırakabilirsiniz. Ürün Kullanım Önerileri; Sevgiliye Özel Hediye, Yeni iş tebrik etme, Yeni bebek hediyesi.\r\n\r\nİçeriği;\r\n\r\n16 adet karışık Truff Çikolata Kutusu (Bitter-Beyaz-Şeker Kaplı-Fındıklı)\r\n\r\nÜrün Kodu: kcm58286979\r\nSağlıklı beslenme için ipuçları: Sağlığınız için daha az tuz tüketin.",
    name: "Tropical Leaf Serisi Truff Çikolata Kutusu 19",
    image_url: [
      "product/dz896adrg2-1699534924531.jpeg",
      "product/v7lp22o0ir-1699534924750.jpeg",
    ],
    price: "$309.00",
    quantity: 56,
  },
  {
    __typename: "product",
    id: 63,
    description: "madlen cikolata ürün acıklaması",
    name: "çikolata madlen",
    image_url: [
      "product/sqigvqzdyd-1699618391149.jpeg",
      "product/31w8qj2in9k-1699618391569.jpeg",
      "product/v4ey59tn0y-1699618391630.jpeg",
    ],
    price: "$429.99",
    quantity: 0,
  },
  {
    __typename: "product",
    id: 64,
    description: "gül deemeti 50 adet gülden oluşur",
    name: "Gül demeti",
    image_url: [
      "product/4cnzeie5sk-1699618503142.jpeg",
      "product/tt1s8k901j-1699618503562.jpeg",
    ],
    price: "$900.00",
    quantity: 0,
  },
];

const FavoritesPage = async () => {
  return (
    <div>
      <h1 className="text-2xl font-mono font-semibold tracking-wide mb-4">
        Favorilerim
      </h1>
      <div className="grid max-xs:grid-cols-1 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {favoritesData?.map((item: any) => (
          <ProductItem
            key={item.id}
            name={item.name}
            description={item.description}
            image_url={IMAGE_URL + "/" + item.image_url?.[0]}
            price={item.price}
            id={item.id}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
