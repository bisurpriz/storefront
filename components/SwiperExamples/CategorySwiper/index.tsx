'use client';

import { memo } from 'react';
import CustomSwiper from '../../Swiper';
import Image from 'next/image';
import { useMeasure } from '@uidotdev/usehooks';
import Card from '../../Card';
import { data } from './constants';

const CategorySwiper = () => {
  const [ref, { width }] = useMeasure<HTMLDivElement>();

  return (
    <div ref={ref} className="mb-8">
      <Card bordered={false} contentClass="py-0 px-0">
        <CustomSwiper
          direction="horizontal"
          slidePerView={Math.floor(width! / 160)}
          spaceBetween={20}
          navigation={true}
          slideItems={data.map((item, i) => ({
            key: i.toString(),
            children: (
              <Card
                wrapperClass={`cursor-pointer group shadow-md my-4 rounded-xl`}
                bordered={false}
                onClick={() => console.log('click')}
              >
                <div className={`flex flex-col items-center justify-center`}>
                  <Image
                    src={`logo.svg`}
                    alt={item.title}
                    width={80}
                    height={80}
                    className="transform group-hover:scale-110 transition-all duration-300 ease-in-out"
                    loading="lazy"
                  />
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
