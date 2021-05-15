import React from "react";
import { useCountriesApi } from "../utils/use-countries-api";
import { useRouter } from "next/router";
import { Table } from "../components/table";
import { PaginationComponent } from "../components/pagination-component";
import {
  getCountryWithTheBiggestArea,
  getCountryWithTheSmallestArea,
  getPopulationAverage,
} from "../utils/country-utils";

export function HomeScreen() {
  const { query } = useRouter();
  const { data: hookData, pagination, status } = useCountriesApi();
  const { size, data } = pagination || {};
  const currentPage = Number(query.page) || 0;
  const countryList = data[currentPage];

  return (
    <div className={"main_wrapper"}>
      <h2>Countries table</h2>
      <p>View country data for your reference with populations.</p>
      <Table data={countryList} isLoading={status === "loading"} />
      <PaginationComponent pagination={{ ...pagination, currentPage }} />

      <div className={"table_summary"}>
        <h3>Summary</h3>
        <p className={"text"}>
          Population Average:{" "}
          <span className={"span"}>{getPopulationAverage(hookData)}</span>
        </p>
        <p className={"text"}>
          Country with smallest area:{" "}
          <span className={"span"}>
            {getCountryWithTheSmallestArea(hookData)}
          </span>
        </p>
        <p className={"text"}>
          Country with biggest area:{" "}
          <span className={"span"}>
            {getCountryWithTheBiggestArea(hookData)}
          </span>
        </p>
      </div>
    </div>
  );
}
