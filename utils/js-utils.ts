import { ColumnKey } from "./types";

export function chunk<T>(array: T[], size: number) {
  const output: T[][] = [];
  let index = 0;
  while (index < array.length) {
    output.push(array.slice(index, (index += size)));
  }
  return output;
}

function getValue(value: unknown) {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string") {
    return value.toLowerCase();
  }

  return value;
}

export type SortOrder = "asc" | "desc";

export function sortData<T extends object>(
  array: T[],
  key?: string,
  sortOrder?: SortOrder
) {
  if (!key) return array;
  return array?.sort(function (a, b) {
    let nameA = getValue(a[key]);
    let nameB = getValue(b[key]);

    if (nameA < nameB) return sortOrder === "asc" ? -1 : 1;
    if (nameA > nameB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });
}
