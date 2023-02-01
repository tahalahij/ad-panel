import "./list.scss";
import Typography from "@mui/material/Typography";
import { DataTable, Navbar, Sidebar } from "../../components";

export const List = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DataTable />
      </div>
    </div>
  );
};
