import { getDiscrits } from "@/app/account/actions";
import { District } from "@/common/types/Addresses/addresses";
import { useEffect, useState } from "react";

type DistrictResponse = Pick<District, "id" | "name">[];

export const useDiscrits = (cityId: number | string) => {
  const [districts, setDiscrits] = useState<DistrictResponse>([]);

  useEffect(() => {
    if (!cityId) return;

    const fetchDiscrits = async () => {
      const { districts } = await getDiscrits(
        typeof cityId === "string" ? cityId : cityId.toString()
      );

      setDiscrits(districts);
    };

    fetchDiscrits();
  }, [cityId]);

  return { districts };
};
