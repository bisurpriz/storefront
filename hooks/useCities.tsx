import { getCities } from "@/app/account/actions";
import { useEffect, useState } from "react";

export const useCities = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      const { cities } = await getCities();

      setCities(cities);
    };

    fetchCities();
  }, []);

  return { cities };
};
