import { getQuarters } from "@/app/account/actions";
import { Quarter } from "@/common/types/Addresses/addresses";
import { useEffect, useState } from "react";

type QuarterResponse = Pick<Quarter, "id" | "name">[];

export const useQuarters = (districtId: number | string) => {
  const [quarters, setQuarters] = useState<QuarterResponse>([]);

  useEffect(() => {
    if (!districtId) return;

    const fetchDiscrits = async () => {
      const { quarters } = await getQuarters(
        typeof districtId === "string" ? districtId : districtId.toString()
      );

      setQuarters(quarters);
    };

    fetchDiscrits();
  }, [districtId]);

  return { quarters };
};
