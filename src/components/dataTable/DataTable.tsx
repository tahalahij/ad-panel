import "./dataTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import { userColumns, userRows } from "./dataTableSource";
import { Link } from "react-router-dom";

const actionColumn = [
  {
    field: "action",
    headerName: "دستور",
    width: 200,
    renderCell: () => {
      return (
        <div className="cellAction">
          <Link to="/users/test">
            <div className="viewButton">مشاهده</div>
          </Link>
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
        // pageSize={}
        rowsPerPageOptions={[25]}
        // checkboxSelection
      />
    </div>
  );
};
