"use client";

import { memo } from "react";
import CustomSwiper from "../../Swiper";
import { useMeasure } from "@uidotdev/usehooks";
import Card from "../../Card";
import Button from "@/components/Button";
import { Quicksand } from "next/font/google";
import { Autoplay } from "swiper/modules";
import { FiShoppingCart } from "react-icons/fi";

const quickSand = Quicksand({ subsets: ["latin"] });

const CategorySwiper = () => {
  const [ref, { width }] = useMeasure<HTMLDivElement>();

  const data = [
    {
      id: 1,
      name: "Çiçekler",
      image: "bg-slider-1",
      header: "Çiçek siparişlerinizde %20 indirim",
      subHeader: "Günün fırsatını kaçırmayın",
    },
    {
      id: 2,
      name: "Çikolata",
      image: "bg-slider-2",
      header: "Çikolata siparişlerinizde %24 indirim",
      subHeader: "Hemen sipariş verin indirimden yararlanın",
    },
  ];

  return (
    <div ref={ref} className={`${quickSand.className} mb-8`}>
      <Card bordered={false} contentClass="py-0 px-0">
        <CustomSwiper
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          direction="horizontal"
          slideItems={data.map((item, i) => ({
            key: i.toString(),
            children: (
              <Card
                wrapperClass={`bg-cover bg-center ${item.image} p-16 rounded-3xl
                max-sm:p-0 max-sm:rounded-xl max-sm:bg-center max-sm:bg-cover min-h-96`}
                bordered={false}
              >
                <div
                  className="flex flex-col justify-center items-center h-full text-center gap-8 w-full
                max-sm:gap-4 max-sm:p-0 max-sm:rounded-xl max-sm:items-start max-sm:text-left"
                >
                  <h1
                    className="text-7xl font-bold self-start text-slate-700 max-w-md text-start
                    max-sm:text-5xl max-sm:leading-tight max-sm:font-semibold
                    max-sm:tracking-tight
                    max-sm:mb-4s"
                  >
                    {item.header}
                  </h1>
                  <p
                    className="text-2xl text-slate-700 font-semibold max-w-lg self-start text-left
                    max-sm:text-xl max-sm:leading-tight max-sm:font-medium
                    max-sm:tracking-tight"
                  >
                    {item.subHeader}
                  </p>
                  <Button
                    type="submit"
                    className="rounded-l-none gap-2 self-start"
                    icon={<FiShoppingCart />}
                  >
                    <p>Sipariş Ver</p>
                  </Button>
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
