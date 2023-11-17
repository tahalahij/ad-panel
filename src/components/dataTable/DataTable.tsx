import "./dataTable.scss";
import { FC } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  userColumns,
  userRows,
  fileColumns,
  scheduleColumns,
  deviceColumns,
  conductorColumns,
  auditLogsColumns,
} from "./dataTableSource";
import { Link } from "react-router-dom";
import { EmptyList } from "./EmptyList";

interface IDataTableProps {
  columnKey:
    | "user"
    | "controller"
    | "file"
    | "schedule"
    | "device"
    | "conductor"
    | "audit-logs";
  singleItemRoute?: string;
  data?: any[];
  onViewClick?: (_id: string) => void;
  onDeleteClick?: (_id: string) => void;
  actionVisible?: boolean;
  resizable?: boolean;
  forceResize?: boolean;
  rowCount?: number;
  page?: number;
  pageSize?: number;
  onPageChange?: (pageIndex: number) => void;
}

export const DataTable: FC<IDataTableProps> = ({
  columnKey,
  singleItemRoute,
  data = [],
  onViewClick,
  onDeleteClick,
  actionVisible = true,
  resizable = false,
  forceResize = false,
  rowCount,
  page = 0,
  pageSize = 5,
  onPageChange,
}) => {
  const actionColumn = !actionVisible ? [] : [
    {
      field: "action",
      headerName: "دستور",
      width: 120,
      renderCell: (params: any) => {
        const patchLink =
          columnKey === "user"
            ? `${params.row._id}`
            : columnKey === "device"
            ? `${params.row._id}`
            : singleItemRoute;
        return (
          <div className="cellAction">
            {!!patchLink && (
              <Link to={patchLink}>
                <div
                  className="viewButton"
                  onClick={() => {
                    onViewClick && onViewClick(params.row._id);
                  }}
                >
                  مشاهده
                </div>
              </Link>
            )}
            {onViewClick && (
              <div
                className="viewButton"
                onClick={() => {
                  onViewClick && onViewClick(params.row._id);
                }}
              >
                مشاهده
              </div>
            )}
            {onDeleteClick && (
              <div
                className="deleteButton"
                onClick={() => {
                  onDeleteClick && onDeleteClick(params.row._id);
                }}
              >
                حذف
              </div>
            )}
          </div>
        );
      },
    },
  ];

  const getColumns = () => {
    switch (columnKey) {
      case "schedule":
        return scheduleColumns.concat(actionColumn);
      case "conductor":
        return conductorColumns.concat(actionColumn);
      case "file":
        return fileColumns.concat(actionColumn);
      case "device":
        return deviceColumns.concat(actionColumn);
      case "audit-logs":
        return auditLogsColumns.concat(actionColumn);
      case "user":
      case "controller":
      default:
        return userColumns.concat(actionColumn);
    }
  };

  const getEmptyListTitle = () => {
    switch (columnKey) {
      case "schedule":
        return "برنامه ا";
      case "conductor":
        return "سری پخش";
      case "file":
        return "فایل";
      case "device":
        return "دستگاه";
      case "user":
        return "اپراتور";
      case "controller":
        return "کاربر کنترلر";
      case "audit-logs":
        return "لاگ عملیات"
      default:
        return "";
    }
  };

  if ((!data || !data?.length) && page === 0)
    return <EmptyList title={getEmptyListTitle()} />;

  return (
    <div className="dataTable">
      <DataGrid
        rows={data}
        columns={getColumns()}
        getRowId={(row) => row._id}
        rowsPerPageOptions={[pageSize]}
        rowCount={rowCount}
        pageSize={pageSize}
        getRowHeight={
          resizable
            ? (params) =>
                forceResize ||
                params.model?.type &&
                params.model.type !== "ONE_TIME" &&
                params.model?.day?.length > 2
                  ? "auto"
                  : undefined
            : undefined
        }
        paginationMode="server"
        page={page}
        onPageChange={onPageChange}
      />
    </div>
  );
};
