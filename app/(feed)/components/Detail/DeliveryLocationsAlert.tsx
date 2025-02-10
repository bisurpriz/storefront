import { CookieTokens } from "@/app/@auth/contants";
import { publishLocationChange } from "@/components/QuarterSelector/PlacesAutocomplete";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import Cookies from "js-cookie";
import { ChevronDown, ChevronUp, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

interface Props {
  locations: Array<{
    placeId: string;
    name: string;
  }>;
}

const DeliveryLocationsAlert = ({ locations }: Props) => {
  const [showAll, setShowAll] = useState(false);
  const [visibleCount, setVisibleCount] = useState(locations.length);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const observerRef = useRef<ResizeObserver | null>(null);
  const calculatingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastCalculationRef = useRef<number>(0);
  const previousWidthRef = useRef<number>(0);
  const { refresh } = useRouter();

  const geocodeByPlaceId = useCallback(async (placeId: string) => {
    try {
      const response = await fetch(`/api/google/geocode?placeId=${placeId}`, {
        next: { tags: ["google-geocode"] },
      });
      if (!response.ok) throw new Error("Geocode isteği başarısız oldu.");
      return await response.json();
    } catch (error) {
      console.error("Geocode error:", error);
    }
  }, []);

  const handleLocationSelect = useCallback(
    async (placeId: string, label: string) => {
      const results = await geocodeByPlaceId(placeId);
      if (results?.[0]) {
        const { address_components } = results[0];

        const placeData = {
          address_components,
          placeId,
          label,
        };

        Cookies.set(CookieTokens.LOCATION_ID, JSON.stringify(placeData), {
          path: "/",
          httpOnly: false,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          maxAge: 7 * 24 * 60 * 60,
        });
        publishLocationChange(placeData);
        refresh();
      }
    },
    [geocodeByPlaceId, refresh],
  );

  const calculateVisibleItems = useCallback(() => {
    const now = Date.now();
    if (
      !containerRef.current ||
      !itemsRef.current.length ||
      calculatingRef.current ||
      now - lastCalculationRef.current < 100
    )
      return;

    lastCalculationRef.current = now;
    calculatingRef.current = true;

    try {
      const containerWidth = containerRef.current.offsetWidth;
      let currentLineWidth = 0;
      let maxItemsInCurrentSpace = 0;
      const gap = 4;

      // Mevcut alana sığabilecek maksimum öğe sayısını hesapla
      for (let i = 0; i < itemsRef.current.length; i++) {
        const item = itemsRef.current[i];
        if (!item) continue;

        const itemWidth = item.offsetWidth + gap;

        // Yeni satıra geçildiğinde önceki satırın genişliğini sıfırla
        if (currentLineWidth + itemWidth > containerWidth) {
          currentLineWidth = itemWidth;
        } else {
          currentLineWidth += itemWidth;
        }

        maxItemsInCurrentSpace++;
      }

      // En az 1 öğe göster
      if (maxItemsInCurrentSpace === 0) maxItemsInCurrentSpace = 1;

      // State güncellemelerini batch halinde yap
      const updates = () => {
        if (showAll) {
          setVisibleCount(locations.length);
        } else {
          // Ekran genişlediğinde ve yeni öğeler sığabiliyorsa görünür öğe sayısını artır
          if (containerWidth > previousWidthRef.current) {
            setVisibleCount(Math.min(maxItemsInCurrentSpace, locations.length));
          } else {
            // İlk satıra sığanları bul
            let firstRowCount = 0;
            let firstRowWidth = 0;
            for (let i = 0; i < itemsRef.current.length; i++) {
              const item = itemsRef.current[i];
              if (!item) continue;

              const itemWidth = item.offsetWidth + gap;
              if (firstRowWidth + itemWidth > containerWidth) break;

              firstRowWidth += itemWidth;
              firstRowCount++;
            }
            setVisibleCount(Math.max(1, firstRowCount));
          }
        }
      };

      previousWidthRef.current = containerWidth;

      // State güncellemelerini throttle et
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(updates, 50);
    } finally {
      calculatingRef.current = false;
    }
  }, [locations.length, showAll]);

  useLayoutEffect(() => {
    const timer = setTimeout(calculateVisibleItems, 0);

    if (containerRef.current && !observerRef.current) {
      observerRef.current = new ResizeObserver(() => {
        if (!calculatingRef.current) {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          timeoutRef.current = setTimeout(() => {
            requestAnimationFrame(calculateVisibleItems);
          }, 100);
        }
      });

      observerRef.current.observe(containerRef.current);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [calculateVisibleItems]);

  const displayedLocations = showAll
    ? locations
    : locations.slice(0, visibleCount);
  const hasMore = locations.length > visibleCount;

  const handleToggle = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowAll(!showAll);
  };

  return (
    <Alert variant="informative" className="mt-2 bg-sky-50/50">
      <div className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sky-700">
        <MapPin className="h-5 w-5" strokeWidth={2.5} />
      </div>
      <div className="pl-12">
        <AlertTitle className="mb-2">Teslimat Bölgeleri</AlertTitle>
        <AlertDescription className="space-y-2">
          <p className="text-muted-foreground">
            Bu ürün şu an sadece aşağıdaki mahallelerine teslim
            edilebilmektedir:
          </p>
          <motion.div
            ref={containerRef}
            className="flex flex-wrap gap-1"
            layout
          >
            <AnimatePresence initial={false}>
              {displayedLocations.map((location, index) => (
                <motion.button
                  ref={(el: HTMLSpanElement | null) => {
                    itemsRef.current[index] = el;
                  }}
                  key={location.placeId}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    duration: 0.2,
                    layout: {
                      duration: 0.2,
                    },
                  }}
                  onClick={() =>
                    handleLocationSelect(location.placeId, location.name)
                  }
                  className="inline-flex cursor-pointer items-center whitespace-nowrap rounded-full bg-white px-2 py-1 text-[11px] font-medium text-sky-700 shadow-sm ring-1 ring-sky-100 hover:bg-sky-50 hover:text-sky-800"
                >
                  {location.name}
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
          {hasMore && (
            <div className="flex justify-start border-t border-sky-100 pt-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-auto gap-1 rounded-full bg-white px-3 py-1 text-[11px] font-medium text-sky-700 shadow-sm ring-1 ring-sky-100 hover:bg-sky-50 hover:text-sky-800"
                onClick={handleToggle}
              >
                {showAll ? (
                  <>
                    <ChevronUp className="h-3 w-3" />
                    Daha Az Göster
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-3 w-3" />
                    {locations.length - visibleCount} mahalle daha
                  </>
                )}
              </Button>
            </div>
          )}
        </AlertDescription>
      </div>
    </Alert>
  );
};

export default DeliveryLocationsAlert;
