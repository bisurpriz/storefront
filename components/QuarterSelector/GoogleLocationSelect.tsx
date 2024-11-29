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
      className="my-2 w-full"
    >
      <PlacesAutocomplete />

      {from === "home" && (
        <div
          className={cn(
            "flex items-center justify-center space-x-4 rounded-xl py-2 transition-colors duration-200 hover:bg-background/50 max-sm:hidden",
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
              className="flex basis-1/3 items-center justify-center space-x-2 rounded-xl bg-primary/10 px-4 py-2"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <item.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="whitespace-nowrap">
                <div className="text-sm font-medium">{item.title}</div>
                <div className="text-sm text-muted-foreground">
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
