import "./list.scss";
import { FC } from "react";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { DataTable } from "../../components";
import { Link } from "react-router-dom";
import { useOperatorData } from "./useOperatorData";

type ListProps = {
  title?: string;
  newItemRoute: string;
  singleItemRoute?: string;
  columnKey: "user" | "schedule" | "file";
};

export const List: FC<ListProps> = ({
  title,
  newItemRoute,
  singleItemRoute,
  columnKey = "user",
}) => {
  const { fetchData, loading, userList } = useOperatorData();
  return (
    <div className="list">
      <div className="header">
        <Typography variant="h6">{title}</Typography>
        <Link
          to={newItemRoute}
          style={{ textDecoration: "none" }}
          className="link"
        >
          <Typography variant="button">{"افزودن"}</Typography>
        </Link>
      </div>
      {loading ? <CircularProgress /> : null}
      <DataTable columnKey={"user"} singleItemRoute={singleItemRoute} data={userList}/>
    </div>
  );
};
