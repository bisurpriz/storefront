import { GetUserOrdersQuery } from "@/graphql/queries/account/account.generated";
import { useDebounce } from "@uidotdev/usehooks";
import { endOfDay, startOfDay } from "date-fns";
import { useMemo, useState } from "react";

export type OrderFilters = {
  searchQuery: string;
  selectedStatus: string;
  dateFrom?: Date;
  dateTo?: Date;
};

export const useOrderFilters = (orders: GetUserOrdersQuery["order"]) => {
  const [filters, setFilters] = useState<OrderFilters>({
    searchQuery: "",
    selectedStatus: "ALL",
  });

  const debouncedSearch = useDebounce(filters.searchQuery, 500);

  const filteredOrders = useMemo(() => {
    let filtered = [...orders].sort((a, b) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase();
      filtered = filtered.filter((order) => {
        const hasMatchingOrderNo = String(order.order_no).toLowerCase().includes(query);
        const hasMatchingProduct = order.tenant_orders.some((to: any) =>
          to.order_items.some((item: any) =>
            item.product.name.toLowerCase().includes(query)
          )
        );
        return hasMatchingOrderNo || hasMatchingProduct;
      });
    }

    if (filters.selectedStatus && filters.selectedStatus !== 'ALL') {
      filtered = filtered.filter((order) =>
        order.tenant_orders.some((to: any) => to.order_status?.value === filters.selectedStatus)
      );
    }

    if (filters.dateFrom || filters.dateTo) {
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.created_at);
        if (filters.dateFrom && filters.dateTo) {
          return orderDate >= startOfDay(filters.dateFrom) && orderDate <= endOfDay(filters.dateTo);
        }
        if (filters.dateFrom) {
          return orderDate >= startOfDay(filters.dateFrom);
        }
        if (filters.dateTo) {
          return orderDate <= endOfDay(filters.dateTo);
        }
        return true;
      });
    }

    return filtered;
  }, [orders, debouncedSearch, filters]);

  const hasActiveFilters = filters.searchQuery || 
    (filters.selectedStatus && filters.selectedStatus !== 'ALL') || 
    filters.dateFrom || 
    filters.dateTo;

  const clearFilters = () => {
    setFilters({
      searchQuery: "",
      selectedStatus: "ALL",
    });
  };

  return {
    filters,
    setFilters,
    filteredOrders,
    hasActiveFilters,
    clearFilters,
  };
}; 