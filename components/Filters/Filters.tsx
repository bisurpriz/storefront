"use client";

import { FILTER_KEYS } from "@/common/enums/Product/product";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import {
  ChevronRight,
  Filter,
  SlidersHorizontal,
  Sparkles,
  Truck,
  X,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useCallback, useEffect, useState } from "react";

export type FilterTypes =
  | "category"
  | "price"
  | "sameDayDelivery"
  | "specialOffers"
  | "customizable";

export enum FilterKeys {
  CATEGORY = "category",
  PRICE = "price",
  SAME_DAY_DELIVERY = "sameDayDelivery",
  SPECIAL_OFFERS = "specialOffers",
  CUSTOMIZABLE = "customizable",
}

interface FilterState {
  [FilterKeys.PRICE]: {
    min: string;
    max: string;
  };
  [FilterKeys.SAME_DAY_DELIVERY]: boolean;
  [FilterKeys.CUSTOMIZABLE]: boolean;
  [FilterKeys.CATEGORY]: string;
}

const INITIAL_FILTERS: FilterState = {
  [FilterKeys.PRICE]: {
    min: "",
    max: "",
  },
  [FilterKeys.SAME_DAY_DELIVERY]: false,
  [FilterKeys.CUSTOMIZABLE]: false,
  [FilterKeys.CATEGORY]: "",
};

const PRESERVED_PARAMS = ["mid", "cid", "pid", "search"];

interface FiltersProps {
  className?: string;
  filterTypes?: FilterTypes[];
  isMobile?: boolean;
}

const FilterSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5" />
          <Skeleton className="h-7 w-24" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-24" />
          </div>
          <div className="flex flex-col gap-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-10 w-full" />
                <span>-</span>
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
            <Skeleton className="h-9 w-full" />
          </div>
        </div>

        <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50/50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-5 w-32" />
            </div>
            <Skeleton className="h-5 w-10" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-5 w-32" />
            </div>
            <Skeleton className="h-5 w-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

const MobileFilterButtonSkeleton = () => {
  return (
    <div className="fixed bottom-32 right-4 z-50">
      <Skeleton className="h-14 w-14 rounded-full" />
    </div>
  );
};

const FilterContent = ({
  className,
  filterTypes = ["price", "sameDayDelivery", "customizable"],
}: FiltersProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    [FilterKeys.PRICE]: {
      min: searchParams.get("minPrice") || "",
      max: searchParams.get("maxPrice") || "",
    },
    [FilterKeys.SAME_DAY_DELIVERY]:
      searchParams.get("sameDayDelivery") === "true",
    [FilterKeys.CUSTOMIZABLE]: searchParams.get("customizable") === "true",
    [FilterKeys.CATEGORY]: searchParams.get("category") || "",
  });

  const [tempPrice, setTempPrice] = useState({
    min: searchParams.get("minPrice") || "",
    max: searchParams.get("maxPrice") || "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateUrl = useCallback(
    (newFilters: FilterState) => {
      const preservedParams = PRESERVED_PARAMS.reduce(
        (acc, param) => {
          const value = searchParams.get(param);
          if (value) acc[param] = value;
          return acc;
        },
        {} as Record<string, string>,
      );

      const urlFilters: Record<string, string | boolean> = {};

      if (newFilters[FilterKeys.PRICE].min) {
        urlFilters[FILTER_KEYS.MIN_PRICE] = Number(
          newFilters[FilterKeys.PRICE].min,
        ).toString();
      }
      if (newFilters[FilterKeys.PRICE].max) {
        urlFilters[FILTER_KEYS.MAX_PRICE] = Number(
          newFilters[FilterKeys.PRICE].max,
        ).toString();
      }

      if (newFilters[FilterKeys.SAME_DAY_DELIVERY]) {
        urlFilters[FILTER_KEYS.SAME_DAY_DELIVERY] = true;
      }
      if (newFilters[FilterKeys.CUSTOMIZABLE]) {
        urlFilters[FILTER_KEYS.CUSTOMIZABLE] = true;
      }

      if (newFilters[FilterKeys.CATEGORY]) {
        urlFilters[FILTER_KEYS.CATEGORY] = newFilters[FilterKeys.CATEGORY];
      }

      const query = qs.stringify(
        {
          ...preservedParams,
          ...urlFilters,
        },
        { skipNull: true, skipEmptyString: true },
      );

      router.push(`${pathname}?${query}`);
    },
    [pathname, router, searchParams],
  );

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    updateUrl(newFilters);
  };

  const clearFilters = () => {
    const preservedParams = PRESERVED_PARAMS.reduce(
      (acc, param) => {
        const value = searchParams.get(param);
        if (value) acc[param] = value;
        return acc;
      },
      {} as Record<string, string>,
    );

    setFilters(INITIAL_FILTERS);
    setTempPrice({ min: "", max: "" });
    const query = qs.stringify(preservedParams);
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  const isPriceValid = useCallback(() => {
    const min = Number(tempPrice.min);
    const max = Number(tempPrice.max);

    if (!tempPrice.min && !tempPrice.max) return false;
    if (tempPrice.min && !tempPrice.max) return true;
    if (!tempPrice.min && tempPrice.max) return true;
    return min <= max;
  }, [tempPrice.min, tempPrice.max]);

  const handleTempPriceChange = (type: "min" | "max", value: string) => {
    if (value && (Number(value) < 0 || isNaN(Number(value)))) return;

    setTempPrice((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleApplyPrice = () => {
    const min = tempPrice.min ? Number(tempPrice.min) : "";
    const max = tempPrice.max ? Number(tempPrice.max) : "";

    if ((min && isNaN(min)) || (max && isNaN(max))) return;

    const newFilters = {
      ...filters,
      [FilterKeys.PRICE]: {
        min: min.toString(),
        max: max.toString(),
      },
    };
    setFilters(newFilters);
    updateUrl(newFilters);
  };

  const handleClearPrice = () => {
    setTempPrice({ min: "", max: "" });
    const newFilters = {
      ...filters,
      [FilterKeys.PRICE]: {
        min: "",
        max: "",
      },
    };
    setFilters(newFilters);
    updateUrl(newFilters);
  };

  if (!mounted) {
    return <FilterSkeleton />;
  }

  const activeFilterCount = Object.values(filters).filter((value) => {
    if (typeof value === "object") {
      return Object.values(value).some((v) => v !== "");
    }
    if (typeof value === "string") return value.length > 0;
    if (typeof value === "boolean") return value;
    return value != null;
  }).length;

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Filtreler</h2>
          {activeFilterCount > 0 && (
            <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-600">
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="mr-2 h-4 w-4" />
            Temizle
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {filterTypes.includes("price") && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Fiyat Aralığı</label>
              {(tempPrice.min || tempPrice.max) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearPrice}
                  className="h-auto px-2 py-1 text-xs text-muted-foreground"
                >
                  Temizle
                </Button>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={tempPrice.min}
                    onChange={(e) =>
                      handleTempPriceChange("min", e.target.value)
                    }
                    className="w-full"
                    min={0}
                  />
                  <span>-</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={tempPrice.max}
                    onChange={(e) =>
                      handleTempPriceChange("max", e.target.value)
                    }
                    className="w-full"
                    min={tempPrice.min || 0}
                  />
                </div>
                {tempPrice.min &&
                  tempPrice.max &&
                  Number(tempPrice.min) > Number(tempPrice.max) && (
                    <p className="text-xs text-destructive">
                      Minimum fiyat, maksimum fiyattan büyük olamaz
                    </p>
                  )}
              </div>
              <Button
                size="sm"
                className="w-full"
                onClick={handleApplyPrice}
                disabled={!isPriceValid()}
              >
                Uygula
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50/50 p-4">
          {filterTypes.includes("sameDayDelivery") && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-blue-500" />
                <span className="text-sm">Aynı Gün Teslimat</span>
              </div>
              <Switch
                checked={filters[FilterKeys.SAME_DAY_DELIVERY]}
                onCheckedChange={(checked) =>
                  handleFilterChange(FilterKeys.SAME_DAY_DELIVERY, checked)
                }
              />
            </div>
          )}

          {filterTypes.includes("customizable") && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-500" />
                <span className="text-sm">Özelleştirilebilir</span>
              </div>
              <Switch
                checked={filters[FilterKeys.CUSTOMIZABLE]}
                onCheckedChange={(checked) =>
                  handleFilterChange(FilterKeys.CUSTOMIZABLE, checked)
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Filters({
  className,
  filterTypes,
  isMobile = false,
}: FiltersProps) {
  const [open, setOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setShowOnboarding(false);
      return;
    }

    const hasSeenOnboarding = localStorage.getItem("hasSeenFilterOnboarding");
    if (hasSeenOnboarding) {
      setShowOnboarding(false);
    } else {
      setShowOnboarding(true);
    }
  }, [isMobile]);

  const [filters, setFilters] = useState<FilterState>({
    [FilterKeys.PRICE]: {
      min: searchParams.get("minPrice") || "",
      max: searchParams.get("maxPrice") || "",
    },
    [FilterKeys.SAME_DAY_DELIVERY]:
      searchParams.get("sameDayDelivery") === "true",
    [FilterKeys.CUSTOMIZABLE]: searchParams.get("customizable") === "true",
    [FilterKeys.CATEGORY]: searchParams.get("category") || "",
  });

  const completeOnboarding = useCallback(() => {
    localStorage.setItem("hasSeenFilterOnboarding", "true");
    setShowOnboarding(false);
    setOnboardingStep(1);
  }, []);

  const handleBackdropClick = useCallback(() => {
    completeOnboarding();
  }, [completeOnboarding]);

  const handleNextStep = useCallback(() => {
    if (onboardingStep < 3) {
      setOnboardingStep((prev) => prev + 1);
    } else {
      completeOnboarding();
    }
  }, [onboardingStep, completeOnboarding]);

  const activeFilterCount = Object.values(filters).filter((value) => {
    if (typeof value === "object") {
      return Object.values(value).some((v) => v !== "");
    }
    if (typeof value === "string") return value.length > 0;
    if (typeof value === "boolean") return value;
    return value != null;
  }).length;

  const getOnboardingContent = useCallback(() => {
    switch (onboardingStep) {
      case 1:
        return {
          text: "Ürünleri filtrelemek için bu butonu kullanabilirsiniz 👋",
          icon: "✨",
        };
      case 2:
        return {
          text: "Fiyat aralığı, aynı gün teslimat ve özelleştirilebilir ürünleri filtreleyebilirsiniz",
          icon: "🎯",
        };
      case 3:
        return {
          text: "Aktif filtrelerinizi burada görebilirsiniz",
          icon: "🔍",
        };
      default:
        return {
          text: "",
          icon: "",
        };
    }
  }, [onboardingStep]);

  if (!mounted) {
    return isMobile ? <MobileFilterButtonSkeleton /> : <FilterSkeleton />;
  }

  return (
    <>
      {showOnboarding && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-all duration-300"
          onClick={handleBackdropClick}
        />
      )}
      <div
        className={cn("fixed bottom-32 right-4 z-50", !isMobile && "hidden")}
      >
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <div
              role="button"
              tabIndex={0}
              className="group relative inline-flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-primary shadow-lg hover:bg-primary/90 focus:outline-none"
            >
              <Filter className="h-6 w-6 text-white" />
              {activeFilterCount > 0 && (
                <div className="absolute -right-1 -top-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                  {activeFilterCount}
                </div>
              )}
              {showOnboarding && (
                <div
                  className="animate-fade-in absolute left-0 top-1/2 z-50 flex w-[300px] -translate-x-[calc(100%+1rem)] -translate-y-1/2 flex-col rounded-xl bg-white p-5 text-sm shadow-xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={completeOnboarding}
                    className="absolute right-2 top-2 rounded-full p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>

                  <div className="mb-1 flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-lg">
                        {getOnboardingContent().icon}
                      </span>
                    </span>
                    <span className="font-medium text-gray-900">
                      Adım {onboardingStep}/3
                    </span>
                  </div>

                  <p className="mt-2 leading-relaxed text-gray-600">
                    {getOnboardingContent().text}
                  </p>

                  <div className="mt-5 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3].map((step) => (
                        <button
                          key={step}
                          onClick={() => setOnboardingStep(step)}
                          className={`flex h-2 rounded-full transition-all duration-300 ${
                            step === onboardingStep
                              ? "w-6 bg-primary"
                              : "w-2 bg-gray-200 hover:bg-gray-300"
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={handleNextStep}
                      className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
                    >
                      {onboardingStep === 3 ? (
                        "Tamamla"
                      ) : (
                        <>
                          İleri
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>

                  <div className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rotate-45 transform bg-white" />
                </div>
              )}
            </div>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="border-b">
              <DrawerTitle>Filtreler</DrawerTitle>
            </DrawerHeader>
            <div className="px-4 pb-8">
              <FilterContent filterTypes={filterTypes} />
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      <div className={cn("hidden", isMobile && "hidden", !isMobile && "block")}>
        <FilterContent className={className} filterTypes={filterTypes} />
      </div>
    </>
  );
}
