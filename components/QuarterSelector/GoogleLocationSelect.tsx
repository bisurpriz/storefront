"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Gem, MousePointerClick, Package } from "lucide-react";
import { FC } from "react";
import PlacesAutocomplete from "./PlacesAutocomplete";

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
            "mt-1 flex items-center justify-center space-x-4 rounded-xl py-2 transition-colors duration-200 hover:bg-background/50 max-sm:hidden",
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
              className="bg-tertiary/10 flex basis-1/3 items-center justify-center space-x-2 rounded-xl px-4 py-2"
            >
              <div className="bg-tertiary/10 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl">
                <item.icon className="text-tertiary h-8 w-8" />
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
