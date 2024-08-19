import React, { FC } from "react";

interface CustomerInfo {
  name: string;
  address: string;
  orderNumber: string;
  orderDate: string;
}

interface SalesContractProps {
  customer: CustomerInfo;
}

const DistanceSalesContract: FC<SalesContractProps> = ({
  customer: { address, name, orderDate, orderNumber },
}) => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-md max-h-screen overflow-y-auto">
      <h1 className="text-2xl font-bold text-center mb-4">
        Mesafeli Satış Sözleşmesi
      </h1>

      <p className="text-gray-700 mb-4">
        İşbu Mesafeli Satış Sözleşmesi, aşağıda bilgileri bulunan {name} adlı
        müşteriye, {orderNumber} numaralı sipariş ile {orderDate} tarihinde
        yapılan satışa istinaden düzenlenmiştir.
      </p>

      <p className="text-gray-700 mb-4">
        Satıcı, müşteri tarafından verilen siparişe konu olan malın/malların
        işbu sözleşme ile belirtilen koşullar çerçevesinde müşteriye teslimini
        taahhüt eder.
      </p>

      <h2 className="text-xl font-semibold mb-2">Müşteri Bilgileri</h2>
      <p className="text-gray-700">
        Ad: {name}
        <br />
        Adres: {address}
        <br />
        Sipariş Numarası: {orderNumber}
        <br />
        Sipariş Tarihi: {orderDate}
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Sözleşme Maddeleri</h2>
      <ol className="list-decimal list-inside text-gray-700 space-y-2">
        <li>
          Satıcı, sipariş edilen ürünleri belirtilen teslimat süresi içinde
          eksiksiz ve doğru şekilde teslim etmekle yükümlüdür.
        </li>
        <li>
          Müşteri, teslimat sırasında ürünü kontrol etmek ve herhangi bir hasar
          durumunda satıcıya bildirmekle yükümlüdür.
        </li>
        <li>
          Sözleşme konusu ürün, müşterinin belirttiği adrese teslim edilecektir.
        </li>
        <li>
          Müşteri, cayma hakkını teslimat tarihinden itibaren 14 gün içinde
          kullanabilir.
        </li>
      </ol>

      <p className="text-gray-700 mt-4">
        Bu sözleşme, sipariş onayının ardından taraflarca kabul edilmiş sayılır
        ve işbu sözleşme şartları geçerlidir.
      </p>

      <p className="text-gray-700 mt-8">
        {orderDate} tarihinde taraflarca imzalanmış olup, işbu sözleşme
        elektronik ortamda düzenlenmiştir.
      </p>
    </div>
  );
};

export default DistanceSalesContract;
