"use client";

import React, { useState } from "react";
import View1 from "../GridViews/View1";
import Accordion from "@/components/Accordion";

type ContentProps = {
  children: React.ReactNode;
};

const Content = ({ children }: ContentProps) => {
  const [accordionData, setAccordionData] = useState([
    {
      title: (
        <input
          type="text"
          className="text-xl font-semibold"
          placeholder="Başlık 1"
        />
      ),
      content: <textarea placeholder="Bölüm 1 içeriği burada yer alır." />,
      isOpen: true,
      onToggle: () => {
        // Bölüm açma/kapama işlemini burada yönetin
        setAccordionData((prevData) =>
          prevData.map((item, i) =>
            i === 0 ? { ...item, isOpen: !item.isOpen } : item
          )
        );
      },
    },
    {
      title: <input type="text" placeholder="Başlık 2" />,
      content: <textarea placeholder="Bölüm 2 içeriği burada yer alır." />,
      isOpen: false,
      onToggle: () => {
        // Bölüm açma/kapama işlemini burada yönetin
        setAccordionData((prevData) =>
          prevData.map((item, i) =>
            i === 1 ? { ...item, isOpen: !item.isOpen } : item
          )
        );
      },
    },
    {
      title: <input type="text" placeholder="Başlık 3" />,
      content: <textarea placeholder="Bölüm 3 içeriği burada yer alır." />,
      isOpen: false,
      onToggle: () => {
        // Bölüm açma/kapama işlemini burada yönetin
        setAccordionData((prevData) =>
          prevData.map((item, i) =>
            i === 2 ? { ...item, isOpen: !item.isOpen } : item
          )
        );
      },
    },
  ]);

  return (
    <main className="content-height container my-6 max-md:mx-6 mx-auto max-sm:m-0">
      <View1
        data={[
          {
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, libero at ultricies tincidunt, nisl nunc aliquam nunc, vitae aliquam nisi nunc quis nunc. ",
            image:
              "https://nest-nextjs-13.vercel.app/assets/imgs/shop/product-3-1.jpg",
            name: "Bilgisayar",
            price: 1000,
          },
          {
            description:
              "Lorem ipsum do2lor sit amet, consectetur adipiscing elit. Donec auctor, libero at ultricies tincidunt, nisl nunc aliquam nunc, vitae aliquam nisi nunc quis nunc. ",
            image:
              "https://nest-nextjs-13.vercel.app/assets/imgs/shop/product-3-2.jpg",
            name: "Bilgisayar",
            price: 1000,
          },
          {
            description:
              "Lorem ipsum dolo3r sit amet, consectetur adipiscing elit. Donec auctor, libero at ultricies tincidunt, nisl nunc aliquam nunc, vitae aliquam nisi nunc quis nunc. ",
            image:
              "https://nest-nextjs-13.vercel.app/assets/imgs/shop/product-3-3.jpg",
            name: "Bilgisayar",
            price: 1000,
          },
          {
            description:
              "Lorem ipsum dol4or sit amet, consectetur adipiscing elit. Donec auctor, libero at ultricies tincidunt, nisl nunc aliquam nunc, vitae aliquam nisi nunc quis nunc. ",
            image:
              "https://images.unsplash.com/photo-1612837017391-0e3b5a5b0b0b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja2dyb3VuZCUyMHN0b3J5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
            name: "Bilgisayar",
            price: 1000,
          },
          {
            description:
              "Lorem ipsum dol5or sit amet, consectetur adipiscing elit. Donec auctor, libero at ultricies tincidunt, nisl nunc aliquam nunc, vitae aliquam nisi nunc quis nunc. ",
            image:
              "https://images.unsplash.com/photo-1612837017391-0e3b5a5b0b0b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja2dyb3VuZCUyMHN0b3J5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
            name: "Bilgisayar",
            price: 1000,
          },
        ]}
      />
      <Accordion items={accordionData} />
    </main>
  );
};

export default Content;
