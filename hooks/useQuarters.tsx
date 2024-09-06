import { getAvailableQuartersForProduct } from "@/app/account/actions";
import { Quarter } from "@/common/types/Addresses/addresses";
import { useEffect, useState } from "react";

type QuarterResponse = Pick<Quarter, "id" | "name">[];

export const useQuarters = (districtId: number, pid: number) => {
  const [quarters, setQuarters] = useState<QuarterResponse>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!districtId || !pid) return;

    const fetchDiscrits = async () => {
      setLoading(true);
      const { quarter } = await getAvailableQuartersForProduct(pid, districtId);

      setQuarters(quarter);
      setLoading(false);
    };

    fetchDiscrits();
  }, [districtId]);

  return { quarters, loading };
};
