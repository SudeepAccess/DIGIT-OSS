import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useEffect } from "react";
import { Eye } from "react-bootstrap-icons";
import { useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from "react-table";
import { ArrowBack, ArrowForward, ArrowToFirst, ArrowToLast, SortDown, SortUp } from "./svgindex";
// import VisibilityIcon from "@mui/icons-material/Visibility";


const noop = () => {};

const Table = ({
  className = "table",
  t,
  data,
  columns,
  getCellProps,
  currentPage = 0,
  pageSizeLimit = 10,
  disableSort = true,
  autoSort = false,
  initSortId = "",
  onSearch = false,
  manualPagination = true,
  totalRecords,
  onNextPage,
  onPrevPage,
  globalSearch,
  onSort = noop,
  onPageSizeChange,
  onLastPage,
  onFirstPage,
  isPaginationRequired = true,
  sortParams = [],
  showAutoSerialNo=false,
  customTableWrapperClassName="",
  styles={},

}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, sortBy, globalFilter },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: currentPage, pageSize: pageSizeLimit, sortBy: autoSort ? [{ id: initSortId, desc: false }] : sortParams },
      pageCount: totalRecords > 0 ? Math.ceil(totalRecords / pageSizeLimit) : -1,
      manualPagination: manualPagination,
      disableMultiSort: false,
      disableSortBy: disableSort,
      manualSortBy: autoSort ? false : true,
      autoResetPage: false,
      autoResetSortBy: false,
      disableSortRemove: true,
      disableGlobalFilter: onSearch === false ? true : false,
      globalFilter: globalSearch || "text",
      useControlledState: (state) => {
        return React.useMemo(() => ({
          ...state,
          pageIndex: manualPagination ? currentPage : state.pageIndex,
        }));
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );


  useEffect(() => {
    onSort(sortBy);
  }, [onSort, sortBy]);

  useEffect(()=>{
    console.log("pageDev123",page)
  },[page])

  useEffect(() => setGlobalFilter(onSearch), [onSearch, setGlobalFilter]);
  return (
    <React.Fragment>
    <div className={customTableWrapperClassName} style={{overflow:"auto"}}>
      <table className={className} {...getTableProps()} style={styles}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
             {showAutoSerialNo&& <th style={{  verticalAlign: "top"}}>
              {showAutoSerialNo&& typeof showAutoSerialNo =="string"?t(showAutoSerialNo):t("TB_SNO")}
              </th>}
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} style={{ verticalAlign: "top" }}>
                  {column.render("Header")}
                  <span>{column.isSorted ? column.isSortedDesc ? <SortDown /> : <SortUp /> : ""}</span>
                </th>
              ))}
              {/* {
                viewAction && 
                <th style={{ verticalAlign: "top" }}>
                  Action
                  </th>
              } */}

            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page?.map((row, i) => {
            // rows.slice(0, 10).map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
              {showAutoSerialNo&&  <td >
              {i+1}
              </td>}
                {row.cells.map((cell) => {
                  return (
                    <td
                      // style={{ padding: "20px 18px", fontSize: "16px", borderTop: "1px solid grey", textAlign: "left", verticalAlign: "middle" }}
                      {...cell.getCellProps([
                        // {
                        //   className: cell.column.className,
                        //   style: cell.column.style,
                        // },
                        // getColumnProps(cell.column),
                        getCellProps(cell),
                      ])}
                    >
                      {cell.attachment_link ? (
                        <a style={{ color: "#1D70B8" }} href={cell.attachment_link}>
                          {cell.render("Cell")}
                        </a>
                      ) : (
                        <React.Fragment> {cell.render("Cell")} </React.Fragment>
                      )}
                    </td>
                  );
                })}
                
                {/* {
                viewAction &&
                <td>
                  <a style={{ color: "#1D70B8" }} href={`/digit-ui/employee/tl/scrutiny/${row?.original?.[viewOptionKey]}`}>
                    <Eye/>
                  </a>
                </td>
          } */}
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
      {isPaginationRequired && (
        <div className="pagination dss-white-pre" >
          {`${t("CS_COMMON_ROWS_PER_PAGE")} :`}
          <select
            className="cp"
            value={pageSize}
            style={{ marginRight: "15px" }}
            onChange={manualPagination ? onPageSizeChange : (e) => setPageSize(Number(e.target.value))}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
          <span>
            <span>
              {pageIndex * pageSize + 1}
              {"-"}
              {manualPagination
                ? (currentPage + 1) * pageSizeLimit > totalRecords
                  ? totalRecords
                  : (currentPage + 1) * pageSizeLimit
                : (pageIndex * pageSize + page?.length)}{" "}
              {/* {(pageIndex + 1) * pageSizeLimit > rows.length ? rows.length : (pageIndex + 1) * pageSizeLimit}{" "} */}
              {totalRecords ? `of ${manualPagination ? totalRecords : rows.length}` : ""}
            </span>{" "}
          </span>
          {/* to go to first and last page we need to do a manual pagination , it can be updated later*/}
          {!manualPagination&& pageIndex!=0 &&<ArrowToFirst onClick={() => gotoPage(0)} className={"cp"} />}
          {canPreviousPage && manualPagination && onFirstPage && <ArrowToFirst onClick={() => manualPagination && onFirstPage()} className={"cp"} />}
          {canPreviousPage && <ArrowBack onClick={() => (manualPagination ? onPrevPage() : previousPage())} className={"cp"} />}
          {canNextPage && <ArrowForward onClick={() => (manualPagination ? onNextPage() : nextPage())} className={"cp"} />}
          {!manualPagination&& pageIndex != pageCount-1 && <ArrowToLast onClick={() => gotoPage(pageCount-1 )} className={"cp"} />}
          {rows.length == pageSizeLimit && canNextPage && manualPagination && onLastPage && (
            <ArrowToLast onClick={() => manualPagination && onLastPage()} className={"cp"} />
          )}
          {/* to go to first and last page we need to do a manual pagination , it can be updated later*/}
        </div>
      )}
    </React.Fragment>
  );
};

export default Table;
