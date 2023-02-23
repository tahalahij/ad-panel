import "./list.scss";
import { FC } from "react";
import Typography from "@mui/material/Typography";
import { DataTable } from "../../components";
import { Link } from "react-router-dom";

type ListProps = {
  title?: string;
  newItemRoute: string;
  singleItemRoute?: string;
  columnKey: "user" | "schedule" | "file";
};

export const List: FC<ListProps> = ({ title, newItemRoute, singleItemRoute, columnKey = 'user' }) => {

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
      <DataTable columnKey={columnKey} singleItemRoute={singleItemRoute}/>
    </div>
  );
};
