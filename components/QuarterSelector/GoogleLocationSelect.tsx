"use client";

import React, { FC } from "react";
import {
  Gem,
  MousePointerClick,
  Package,
  ShieldCheck,
  SmilePlus,
} from "lucide-react";
import { motion } from "framer-motion";
import PlacesAutocomplete from "./PlacesAutocomplete";
import { cn } from "@/lib/utils";

type GoogleLocationSelectProps = {
  from?: "pdp" | "home";
};

const GoogleLocationSelect: FC<GoogleLocationSelectProps> = ({
  from = "pdp",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full my-2"
    >
      <PlacesAutocomplete />

      {from === "home" && (
        <div
          className={cn(
            "flex items-center space-x-4 py-2 justify-center rounded-xl hover:bg-background/50 transition-colors duration-200"
          )}
        >
          {[
            {
              icon: Package,
              title: "Hızlı Teslimat",
              subtitle: "Aynı gün içinde",
              delay: 0.3,
            },
            {
              icon: Gem,
              title: "Kişiselleştirme",
              subtitle: "Özel mesajlar",
              delay: 0.4,
            },
            {
              icon: MousePointerClick,
              title: "Kolay Alışveriş",
              subtitle: "Tek tıkla sipariş",
              delay: 0.5,
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: item.delay }}
              className="flex basis-1/3 items-center justify-center space-x-2 px-4 py-2 rounded-xl bg-primary/10"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 shrink-0">
                <item.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="whitespace-nowrap">
                <div className="font-medium text-sm">{item.title}</div>
                <div className="text-muted-foreground text-sm">
                  {item.subtitle}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default GoogleLocationSelect;
