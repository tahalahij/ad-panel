import "./list.scss";
import { FC } from "react";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { DataTable } from "../../../components";
import { Link } from "react-router-dom";
import { useFileData } from "../useFileData";
import { useFilesLoadingState, useFilesState } from "../../../context/file";

type ListProps = {
  title?: string;
  singleItemRoute?: string;
  columnKey: "user" | "schedule" | "file";
};

export const FileList: FC<ListProps> = ({
  title,
  singleItemRoute,
  columnKey = "user",
}) => {
  useFileData();
  const loading = useFilesLoadingState();
  const data = useFilesState();
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
        columnKey={"file"}
        singleItemRoute={singleItemRoute}
        data={data}
      />
    </div>
  );
};
