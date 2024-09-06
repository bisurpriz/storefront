import { getAvailableDistrictsForProduct } from "@/app/account/actions";
import { District } from "@/common/types/Addresses/addresses";
import { useEffect, useState } from "react";

type DistrictResponse = Pick<District, "id" | "name">[];

export const useDiscrits = (cityId: number, pid: number) => {
  const [districts, setDiscrits] = useState<DistrictResponse>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!cityId || !pid) return;

    const fetchDiscrits = async () => {
      setLoading(true);
      const { district, loading } = await getAvailableDistrictsForProduct(
        pid,
        cityId
      );

      setDiscrits(district);
      setLoading(loading);
    };

    fetchDiscrits();
  }, [cityId, pid]);

  return { districts, loading };
};
