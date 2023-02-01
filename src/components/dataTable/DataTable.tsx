import "./dataTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import { userColumns, userRows } from "./dataTableSource";

const actionColumn = [
  {
    field: "action",
    headerName: "دستور",
    width: 200,
    renderCell: () => {
      return (
        <div className="cellAction">
          <div className="viewButton">مشاهده</div>
          <div className="deleteButton">حذف</div>
        </div>
      );
    },
  },
];

export const DataTable = () => {
  return (
    <div className="dataTable">
      <DataGrid
        rows={userRows}
        columns={userColumns.concat(actionColumn)}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
};
