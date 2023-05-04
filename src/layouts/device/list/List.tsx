import "./list.scss";
import { FC } from "react";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { DataTable } from "../../../components";
import { Link } from "react-router-dom";
import { useDeviceData } from "../useDeviceData";

type ListProps = {
  title?: string;
  newItemRoute?: string;
  columnKey: "user" | "schedule" | "file" | "device";
};

export const List: FC<ListProps> = ({
  title,
  newItemRoute,
  columnKey = "device",
}) => {
  const {fetchData, list, loading} = useDeviceData();
  return (
    <div className="list">
      <div className="header">
        <Typography variant="h6">{title}</Typography>
        <Link
          to={"new"}
          style={{ textDecoration: "none" }}
          className="link"
        >
          <Typography variant="button">{"افزودن"}</Typography>
        </Link>
      </div>
      {loading ? <CircularProgress /> : null}
      <DataTable
        columnKey={"device"}
        singleItemRoute={newItemRoute}
        data={list}
      />
    </div>
  );
};
