import "./dataTable.scss";
import { FC } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import {
  userColumns,
  userRows,
  fileColumns,
  scheduleColumns,
} from "./dataTableSource";
import { Link } from "react-router-dom";

interface IDataTableProps {
  columnKey: "user" | "file" | "schedule";
  singleItemRoute?: string;
  data?: any[];
  onViewClick?: (_id: string) => void;
}

export const DataTable: FC<IDataTableProps> = ({
  columnKey,
  singleItemRoute,
  data,
  onViewClick,
}) => {
  const actionColumn = [
    {
      field: "action",
      headerName: "دستور",
      width: 200,
      renderCell: (params: any) => {
        const patchLink =
          columnKey === "user"
            ? `${params.row._id}/${params.row.ip}/${params.row.username}/${params.row.name}`
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
            <div className="deleteButton">حذف</div>
          </div>
        );
      },
    },
  ];

  const getColumns = () => {
    switch (columnKey) {
      case "schedule":
        return scheduleColumns.concat(actionColumn);
      case "file":
        return fileColumns.concat(actionColumn);
      case "user":
      default:
        return userColumns.concat(actionColumn);
    }
  };

  if (!data) return null;

  return (
    <div className="dataTable">
      <DataGrid
        rows={data}
        columns={getColumns()}
        getRowId={(row) => row._id}
        // pageSize={}
        rowsPerPageOptions={[25]}
        // checkboxSelection
      />
    </div>
  );
};
