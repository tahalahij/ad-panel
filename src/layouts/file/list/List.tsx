import "./list.scss";
import { FC, useState } from "react";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { DataTable, OperatorSelector } from "../../../components";
import { Link } from "react-router-dom";
import { useFileData } from "../useFileData";

type ListProps = {
  title?: string;
  singleItemRoute?: string;
  columnKey: "user" | "schedule" | "file";
};

const PAGE_SIZE = 25;

export const FileList: FC<ListProps> = ({
  title,
  singleItemRoute,
  columnKey = "user",
}) => {
  const [operatorId, setOperatorId] = useState("");
  const [page, setPage] = useState(0);
  const { removeItem, message, setMessage, data, loading } = useFileData(
    operatorId,
    page,
    PAGE_SIZE
  );

  const onDeleteClick = (_id: string) => {
    removeItem(_id);
  };

  return (
    <div className="list">
      <div className="header">
        <Typography variant="h6">{title}</Typography>
        <Link to={"new"} style={{ textDecoration: "none" }} className="link">
          <Typography variant="button">{"افزودن"}</Typography>
        </Link>
      </div>
      {loading ? <CircularProgress /> : null}
      <OperatorSelector
        operatorId={operatorId}
        onOperatorChanged={setOperatorId}
      />
      <DataTable
        columnKey={"file"}
        singleItemRoute={singleItemRoute}
        onDeleteClick={onDeleteClick}
        data={data}
        rowCount={1000}
        pageSize={PAGE_SIZE}
        page={page}
        onPageChange={setPage}
      />
      <Snackbar
        open={!!message.title}
        // message={error}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        onClose={() => setMessage({ title: "" })}
      >
        <Alert severity={message.type} sx={{ width: "100%" }}>
          {message.title}
        </Alert>
      </Snackbar>
    </div>
  );
};
