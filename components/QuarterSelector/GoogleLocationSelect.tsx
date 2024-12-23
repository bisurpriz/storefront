"use client";

import { cn } from "@/lib/utils";
import { Gem, MousePointerClick, Package } from "lucide-react";
import { motion } from "motion/react";
import { FC } from "react";
import PlacesAutocomplete from "./PlacesAutocomplete";

type GoogleLocationSelectProps = {
  from?: "pdp" | "home";
};

const GoogleLocationSelect: FC<GoogleLocationSelectProps> = ({
  from = "pdp",
}) => {
  return (
    <div className="w-full">
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
              delay: 0.1,
            },
            {
              icon: Gem,
              title: "Kişiselleştirme",
              subtitle: "Özel mesajlar",
              delay: 0.2,
            },
            {
              icon: MousePointerClick,
              title: "Kolay Alışveriş",
              subtitle: "Tek tıkla sipariş",
              delay: 0.3,
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: item.delay }}
              className="flex basis-1/3 items-center justify-center space-x-2 rounded-xl bg-tertiary/10 px-4 py-2"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-tertiary/10">
                <item.icon className="h-8 w-8 text-tertiary" />
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
    </div>
  );
};

export default GoogleLocationSelect;
