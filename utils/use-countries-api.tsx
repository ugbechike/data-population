import { useEffect, useState } from "react";
import { chunk } from "./js-utils";
import { Countries } from "./types";
const url = "https://restcountries.eu/rest/v2/all";

export function useCountriesApi() {
  const [status, setStatus] = useState<"loading" | "error" | "resolved">(
    "loading"
  );
  const [data, setData] = useState<Countries>([]);

  useEffect(() => {
    // initial load on mount
    const fetchData = async () => {
      let response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setData(data);
        setStatus("resolved");
      } else {
        setData([]);
        setStatus("error");
      }
    };

    fetchData();
  }, []);

  const paginatedData = chunk(data, 24);
  const pageSize = paginatedData.length;

  return {
    data,
    pagination: { data: paginatedData, size: pageSize },
    status,
  };
}

export type UseCountriesApiReturnType = ReturnType<typeof useCountriesApi>;
