"use client";

import { memo } from "react";
import CustomSwiper from "../../Swiper";
import Card from "../../Card";
import Button from "@/components/Button";
import { Autoplay } from "swiper/modules";
import { FiShoppingCart } from "react-icons/fi";

const CategorySwiper = () => {
  const data = [
    {
      id: 1,
      name: "Yılbaşı",
      image: "bg-slider-0",
      header: "",
      subHeader: "",
      button: false,
    },
    {
      id: 2,
      name: "Çiçekler",
      image: "bg-slider-1",
      header: "Çiçek siparişlerinizde %20 indirim",
      subHeader: "Günün fırsatını kaçırmayın",
      button: true,
    },
    {
      id: 3,
      name: "Çikolata",
      image: "bg-slider-2",
      header: "Çikolata siparişlerinizde %24 indirim",
      subHeader: "Hemen sipariş verin indirimden yararlanın",
      button: true,
    },
  ];

  return (
    <div className={`font-mono mb-4`}>
      <Card bordered={false} contentClass="py-0 px-0">
        <CustomSwiper
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          direction="horizontal"
          slideItems={data.map((item, i) => ({
            key: i.toString(),
            children: (
              <Card
                wrapperClass={`bg-cover bg-center max-lg:aspect-[5/2] lg:aspect-[3/1] ${item.image} p-16 rounded-3xl
                max-sm:p-0 max-sm:rounded-xl max-sm:bg-center max-sm:bg-cover min-h-96 flex-1`}
                bordered={false}
              >
                <div className="flex flex-col justify-center items-center h-full text-center gap-8 w-full max-sm:gap-4 max-sm:p-0 max-sm:rounded-xl max-sm:items-start max-sm:text-left">
                  <h1 className="text-7xl font-bold self-start text-slate-700 max-w-md text-start max-sm:text-3xl max-sm:leading-tight max-sm:font-semibold max-sm:tracking-tight max-sm:mb-4s">
                    {item.header}
                  </h1>
                  <p className="text-xl text-slate-700 font-semibold max-w-lg self-start text-left max-sm:text-xl max-sm:leading-tight max-sm:font-medium max-sm:tracking-tight">
                    {item.subHeader}
                  </p>
                  {item.button ? (
                    <Button
                      type="submit"
                      className="rounded-l-none gap-2 self-start"
                      icon={<FiShoppingCart />}
                    >
                      <p>Sipariş Ver</p>
                    </Button>
                  ) : null}
                </div>
              </Card>
            ),
          }))}
        />
      </Card>
    </div>
  );
};

export default memo(CategorySwiper);
