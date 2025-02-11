import { OrderItemStatus } from "@/common/enums/Order/product";
import { statusBadgeTranslations } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrderFilters } from "@/hooks/useOrderFilters";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { CalendarIcon, FilterIcon, Search, X } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";

type OrderFiltersProps = {
  filters: OrderFilters;
  setFilters: (filters: OrderFilters) => void;
  hasActiveFilters: boolean;
  clearFilters: () => void;
};

export const OrderFiltersComponent = ({
  filters,
  setFilters,
  hasActiveFilters,
  clearFilters,
}: OrderFiltersProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>({
    from: filters.dateFrom,
    to: filters.dateTo,
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Siparişlerim</h1>
        <Button
          variant="outline"
          size="sm"
          className="lg:hidden"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <FilterIcon className="mr-2 h-4 w-4" />
          Filtrele
        </Button>
      </div>

      <div
        className={cn(
          "grid gap-4",
          !isFilterOpen && "hidden lg:grid",
          "lg:grid-cols-[1fr_auto]",
        )}
      >
        {/* Sol Taraf - Arama ve Filtreler */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_180px_300px]">
          {/* Arama Input */}
          <div className="relative sm:col-span-2 lg:col-span-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Sipariş no veya ürün adı ile ara..."
              value={filters.searchQuery}
              onChange={(e) =>
                setFilters({ ...filters, searchQuery: e.target.value })
              }
              className="h-10 pl-9"
            />
          </div>

          {/* Durum Seçici */}
          <Select
            value={filters.selectedStatus}
            onValueChange={(value) =>
              setFilters({ ...filters, selectedStatus: value })
            }
          >
            <SelectTrigger className="h-10">
              <SelectValue placeholder="Sipariş durumu" />
            </SelectTrigger>
            <SelectContent position="popper" sideOffset={4} align="start">
              <SelectItem value="ALL">Tümü</SelectItem>
              {Object.values(OrderItemStatus).map((status) => (
                <SelectItem key={status} value={status}>
                  <div className="flex items-center gap-2">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{
                        backgroundColor:
                          status === OrderItemStatus.Created
                            ? "#FFA500"
                            : status === OrderItemStatus.Processing
                              ? "#0066CC"
                              : status === OrderItemStatus.Shipped
                                ? "#4CAF50"
                                : status === OrderItemStatus.Delivered
                                  ? "#4CAF50"
                                  : status === OrderItemStatus.Canceled
                                    ? "#FF0000"
                                    : "#808080",
                      }}
                    />
                    {statusBadgeTranslations[status]}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Tarih Seçici */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "h-10 justify-start text-left font-normal",
                  !date && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "dd LLL", { locale: tr })} -{" "}
                      {format(date.to, "dd LLL", { locale: tr })}
                    </>
                  ) : (
                    format(date.from, "dd LLL", { locale: tr })
                  )
                ) : (
                  <span>Tarih seçin</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={(range) => {
                  setDate(range);
                  setFilters({
                    ...filters,
                    dateFrom: range?.from || null,
                    dateTo: range?.to || null,
                  });
                }}
                numberOfMonths={2}
                locale={tr}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Sağ Taraf - Temizle Butonu */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-10 px-2"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
