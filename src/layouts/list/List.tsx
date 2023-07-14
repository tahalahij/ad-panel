import "./list.scss";
import { FC, useEffect } from "react";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { DataTable } from "../../components";
import { Link, useParams } from "react-router-dom";
import { useOperatorData } from "./useOperatorData";
import { USER_ROLE } from "../../types/UserTypes";

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
  const { type } = useParams();
  const { fetchData, loading, userList } = useOperatorData(type as USER_ROLE);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return (
    <div className="list">
      <div className="header">
        <Typography variant="h6">
          {type?.toLowerCase() === "operator" ? "اپراتورها" : "کنترلر ها"}
        </Typography>
        <Link
          to={newItemRoute + "/" + type}
          style={{ textDecoration: "none" }}
          className="link"
        >
          <Typography variant="button">{"افزودن"}</Typography>
        </Link>
      </div>
      {loading ? <CircularProgress /> : null}
      <DataTable columnKey={"user"} data={userList} />
    </div>
  );
};
