"use client";

import AnimationExitProvider from "@/components/AnimatePresence/AnimationExitProvider";
import Button from "@/components/Button";
import TextField from "@/components/TextField";
import React, { FC } from "react";
import { IoTicketOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import Image from "next/image";
import iyzico from "@/public/payment/iyzico-ode.png";

type SummaryDetailProps = {
  cost: number;
  isOpen: boolean;
};

const variant = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    y: 50,
    transition: {
      duration: 0.3,
    },
  },
};

const SummaryDetail: FC<SummaryDetailProps> = ({ cost, isOpen }) => {
  return (
    <AnimationExitProvider show={isOpen}>
      <motion.div
        variants={variant}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="max-md:py-1 max-md:px-4 md:p-4 max-md:border-t">
          <Image
            src={iyzico}
            alt="iyzico"
            width={500}
            height={500}
            className="mb-8 max-md:hidden"
          />
          <span className="block text-xl w-full text-center mb-3 font-normal">
            Sipariş Özeti
          </span>
          <div className="flex flex-col">
            <div className="flex justify-between text-sm py-1">
              <span>Ara Toplam</span>
              <span className="font-semibold">{cost} ₺</span>
            </div>
            <div className="flex justify-between text-sm py-1">
              <span>Kargo</span>
              <span className="font-semibold">29.99 ₺</span>
            </div>

            <div className="xl:flex xl:justify-between text-sm py-3 mt-1">
              <TextField
                icon={<IoTicketOutline />}
                placeholder="İndirim Kodu Girin"
                id="discountCode"
                fullWidth
              />
              <Button
                type="button"
                size="small"
                color="primary"
                className="flex justify-center w-full xl:w-auto mt-2 xl:mt-0 xl:ml-3"
                label="İndirim Kodu Kullan"
              />
            </div>
            <div className="flex justify-between items-center text-sm border-t py-1 mt-1">
              <span className="font-medium">Toplam</span>
              <span className="font-semibold text-xl text-primary ">
                {cost} ₺
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimationExitProvider>
  );
};

export default SummaryDetail;
