import { useRouter } from "next/router";
import Link from "next/link";
import React from "react";
import { UseCountriesApiReturnType } from "../utils/use-countries-api";
import { paginateFn } from "../utils/pagination";

type PaginationComponentPropsType = {
  pagination: UseCountriesApiReturnType["pagination"] & {
    currentPage: number;
  };
};

export const PaginationComponent = (props: PaginationComponentPropsType) => {
  const { pagination } = props;

  const router = useRouter();
  const { query } = router;

  const page = Number(query.page ?? 0);

  const hasNextPage = pagination.size > page;
  const nextPage = page + 1;

  const hasPrevPage = page > 1;
  const prevPage = page - 1;

  const pageNumbers = paginateFn({ current: page, pageSize: pagination.size });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "10px",
        alignItems: "center",
      }}
    >
      {hasPrevPage ? (
        <Link
          passHref
          href={{
            pathname: router.pathname,
            query: { page: prevPage },
          }}
        >
          <div className={"prev_btn"}>
            <p style={{ borderWidth: 1, borderColor: "red" }}>Prev</p>
          </div>
        </Link>
      ) : (
        <div className={"prev_btn"}>
          <p>Prev</p>
        </div>
      )}
      {pageNumbers.map((number: number, index: number) => {
        const isActive = page === number;
        return (
          <Link
            passHref
            href={{
              pathname: router.pathname,
              query: { page: number },
            }}
          >
            <div
              className={"page_number"}
              style={
                isActive
                  ? { background: "#661aff", color: "white" }
                  : { background: "lightgray" }
              }
            >
              <p>{number}</p>
            </div>
          </Link>
        );
      })}
      {hasNextPage ? (
        <Link
          passHref
          href={{
            pathname: router.pathname,
            query: { page: nextPage },
          }}
        >
          <div className={"next_btn"}>
            <p>Next</p>
          </div>
        </Link>
      ) : (
        <div className={"next_btn"}>
          <p>Next</p>
        </div>
      )}
    </div>
  );
};
