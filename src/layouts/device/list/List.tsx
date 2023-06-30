import "./list.scss";
import { FC } from "react";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { DataTable } from "../../../components";
import { Link } from "react-router-dom";
import { useDeviceData } from "../useDeviceData";
import { useAuthenticationState } from "../../../context";

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
  const { list, loading } = useDeviceData();
  const auth = useAuthenticationState();
  return (
    <div className="list">
      <div className="header">
        <Typography variant="h6">{title}</Typography>
        {auth.role === "ADMIN" && (
          <Link to={"new"} style={{ textDecoration: "none" }} className="link">
            <Typography variant="button">{"افزودن"}</Typography>
          </Link>
        )}
      </div>
      {loading ? <CircularProgress /> : null}
      <DataTable
        columnKey={"device"}
        actionVisible={auth.role === "ADMIN"}
        data={list}
      />
    </div>
  );
};
