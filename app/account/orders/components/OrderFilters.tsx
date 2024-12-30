import { OrderItemStatus } from "@/common/enums/Order/product";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { OrderFilters } from "@/hooks/useOrderFilters";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { CalendarIcon, FilterIcon, Search, X } from "lucide-react";
import { useState } from "react";

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

      <div className={cn(
        "flex flex-col gap-4 lg:flex-row lg:items-center",
        !isFilterOpen && "hidden lg:flex"
      )}>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Sipariş no veya ürün adı ile ara..."
            value={filters.searchQuery}
            onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
            className="pl-9"
          />
        </div>
        
        <div className="flex flex-1 flex-col lg:flex-row gap-2 lg:max-w-[500px]">
          <Select 
            value={filters.selectedStatus} 
            onValueChange={(value) => setFilters({ ...filters, selectedStatus: value })}
          >
            <SelectTrigger className="w-full lg:w-[180px]">
              <SelectValue placeholder="Sipariş durumu" />
            </SelectTrigger>
            <SelectContent position="popper" sideOffset={4} align="start">
              <SelectItem value="ALL">Tümü</SelectItem>
              {Object.values(OrderItemStatus).map((status) => (
                <SelectItem key={status} value={status}>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={status} />
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex flex-col lg:flex-row gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full lg:w-[140px] justify-start text-left font-normal",
                    !filters.dateFrom && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.dateFrom ? (
                    format(filters.dateFrom, "dd LLL", { locale: tr })
                  ) : (
                    <span>Başlangıç</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={filters.dateFrom}
                  onSelect={(date) => setFilters({ ...filters, dateFrom: date })}
                  initialFocus
                  locale={tr}
                  className="rounded-md border"
                />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full lg:w-[140px] justify-start text-left font-normal",
                    !filters.dateTo && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.dateTo ? (
                    format(filters.dateTo, "dd LLL", { locale: tr })
                  ) : (
                    <span>Bitiş</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={filters.dateTo}
                  onSelect={(date) => setFilters({ ...filters, dateTo: date })}
                  initialFocus
                  disabled={(date): boolean => filters.dateFrom ? date < filters.dateFrom : false}
                  locale={tr}
                  className="rounded-md border"
                />
              </PopoverContent>
            </Popover>
          </div>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="lg:px-2"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}; 