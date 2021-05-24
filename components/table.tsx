import React, { useState } from "react";
import { SortIcon } from "./icons/sort-icon";
import { toMillion } from "../utils/to-million";
import { ColumnKey, Countries, Country } from "../utils/types";
import { getLanguagesByCountry } from "../utils/country-utils";
import { sortData, SortOrder } from "../utils/js-utils";
import { toSquareMetricMiles } from "../utils/to-square-miles";

type TableProps = {
  data: Countries | any;
  isLoading: boolean;
  columns?: Columns;
};

type Columns = Array<{
  label: string;
  key: ColumnKey;
  format?(value: any): string | number;
  numeric?: boolean;
}>;

const countryColumns: Columns = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "region",
    label: "Region",
  },
  {
    key: "area",
    label: "Area (in mi²)",
    numeric: true,
    format: toSquareMetricMiles,
  },
  {
    key: "population",
    label: "Population (in M)",
    numeric: true,
    format: toMillion,
  },
];
export function Table(props: TableProps) {
  const { data: dataProp = [], isLoading, columns = countryColumns } = props;
  const [sortField, setSortField] = useState<ColumnKey>();
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const onSort = (key) => {
    if (sortField === key) {
      // clicking on the same header
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(key);
    }
  };
  const data = sortData(dataProp, sortField, sortOrder);
  return (
    <table id="table_container">
      <tr>
        {columns.map((column, index) => {
          const { label, key, numeric } = column;
          return (
            <th
              key={index}
              id={"table_head"}
              style={{ cursor: "pointer" }}
              onClick={() => onSort(key)}
            >
              <div
                style={{
                  borderWidth: 1,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <p>{label}</p>
                <SortIcon />
              </div>
            </th>
          );
        })}
      </tr>
      {isLoading && (
        <div>
          <p>Loading...</p>
        </div>
      )}
      {data?.map((country, index) => {
        return (
          <tr key={index}>
            {columns.map((column, idx) => {
              let columnData = country[column.key] as string | number;
              columnData = column?.format?.(columnData) ?? columnData;
              return (
                <td
                  key={idx}
                  style={{ textAlign: column.numeric ? "end" : "start" }}
                >
                  {columnData}
                </td>
              );
            })}
          </tr>
        );
      })}
    </table>
  );
}

type LanguageTableProps = {
  data: Countries;
  isLoading: boolean;
};

const langColumns: Columns = [
  {
    key: "language",
    label: "Languages",
  },
  {
    key: "countries",
    label: "Country",
    format: (data) => data?.join(", "),
  },
  {
    key: "population",
    label: "Population (in M)",
    numeric: true,
    format: toMillion,
  },
];

export function LanguageTable(props: LanguageTableProps) {
  const { data: dataProp = [], isLoading } = props;

  const data = getLanguagesByCountry(dataProp);

  return (
    <Table
      data={Object.values(data)}
      isLoading={isLoading}
      columns={langColumns}
    />
  );
}
