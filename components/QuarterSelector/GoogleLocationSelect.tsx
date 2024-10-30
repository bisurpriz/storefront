"use client";

import React, { useEffect, useState, useTransition } from "react";
import { geocodeByPlaceId } from "react-google-places-autocomplete";
import Cookies from "js-cookie";
import { CookieTokens } from "@/app/@auth/contants";
import { useRouter } from "next/navigation";
import { parseJson } from "@/utils/format";
import { ArrowRight, Package, ShieldCheck, SmilePlus } from "lucide-react";
import { motion } from "framer-motion";
import PlacesAutocomplete from "./PlacesAutocomplete";
import { Button } from "../ui/button";

const GoogleLocationSelect = () => {
  const [value, setValue] = useState(
    parseJson(Cookies.get(CookieTokens.LOCATION_ID))
  );
  const [, starTransition] = useTransition();
  const { refresh } = useRouter();

  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onChange = async (data) => {
    setValue(data);
    starTransition(async () => {
      if (data?.value?.place_id) {
        const placeId = data.value.place_id;
        const geoDataResponse = await geocodeByPlaceId(placeId);
        const geoData = geoDataResponse[0];
        const { lat, lng } = geoData.geometry?.location;
        const viewport = geoData?.geometry.viewport?.toJSON();
        Cookies.set(
          CookieTokens.LOCATION_ID,
          JSON.stringify({
            viewport,
            lat: lat(),
            lng: lng(),
            placeId,
            label: data.label,
          })
        );
        refresh();
      } else {
        Cookies.remove(CookieTokens.LOCATION_ID);
        refresh();
      }
    });
  };

  return (
    <div className="w-full mb-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <PlacesAutocomplete />

        <div className="flex items-center gap-2 justify-between p-2 bg-muted/30 backdrop-blur-sm rounded-b-2xl border max-lg:hidden">
          {[
            {
              icon: Package,
              title: "Her Gün Aynı",
              subtitle: "Gün Teslimat",
              delay: 0.3,
            },
            {
              icon: ShieldCheck,
              title: "Güvenli",
              subtitle: "Alışveriş",
              delay: 0.4,
            },
            {
              icon: SmilePlus,
              title: "Yüksek Müşteri",
              subtitle: "Memnuniyeti",
              delay: 0.5,
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: item.delay }}
              className="flex items-center space-x-4 py-2 justify-center rounded-xl hover:bg-background/50 transition-colors duration-200 basis-1/3"
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
      </motion.div>
    </div>
  );
};

export default GoogleLocationSelect;
