import React from "react";
import { useCountriesApi } from "../utils/use-countries-api";
import { useRouter } from "next/router";
import { LanguageTable, Table } from "../components/table";
import { PaginationComponent } from "../components/pagination-component";

export function LanguageScreen() {
  const { query } = useRouter();
  const { data: hookData, pagination, status } = useCountriesApi();
  const { size, data } = pagination || {};
  const currentPage = Number(query.page) || 0;
  const countryList = data[currentPage];

  return (
    <div className={"main_wrapper"}>
      <h2>Languages with countries table</h2>
      <p>View languages with the countries that speak it this table</p>
      <LanguageTable data={countryList} isLoading={status === "loading"} />
      <PaginationComponent pagination={{ ...pagination, currentPage }} />
    </div>
  );
}
