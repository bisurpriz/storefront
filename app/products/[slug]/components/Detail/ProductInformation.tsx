import React from "react";

const ProductInformation = () => {
  return (
    <div className="flex flex-col items-start justify-start gap-4 w-full h-full p-4 bg-white rounded-md shadow-md max-md:w-full max-md:p-2 max-md:rounded-none max-md:shadow-none">
      <div className="bg-9 p-4 rounded-lg w-full flex items-start justify-start gap-2 flex-col">
        <h1 className="text-2xl font-semibold text-gray-800 max-w-lg">
          Pababo Kişiye Özel Çikolata Kutusu ve Zirkon Kolye
        </h1>
        <div className="flex items-center justify-start gap-2 w-full">
          <span className="text-xl font-semibold text-slate-200 max-w-lg bg-red-500 p-2 rounded-xl w-max">
            34%
          </span>
          <span className="flex flex-col gap-1">
            <h5 className="text-base leading-none font-semibold text-slate-500 max-w-lg mb-0">
              <del>₺ 199,00</del>
            </h5>
            <span className="flex items-end gap-2 max-xl:flex-col max-xl:items-start max-xl:text-start">
              <h1 className="text-2xl leading-none font-semibold max-w-lg mt-0">
                ₺ 129,00
              </h1>
              <p className="text-sm leading-none text-primary max-w-lg mt-0">
                & Kargo Bedava
              </p>
            </span>
          </span>
          <div className="flex-1 p-4 rounded-lg bg-7 text-end">
            Değerlendime Alanı
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInformation;
