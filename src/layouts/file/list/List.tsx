import "./list.scss";
import { FC, useState } from "react";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { DataTable, OperatorSelector } from "../../../components";
import { Link } from "react-router-dom";
import { useFileData } from "../useFileData";
import { userHasAccess } from "../../../utils/UserAccess";
import { useAuthenticationState } from "../../../context";

const PAGE_SIZE = parseInt(process.env.REACT_APP_PAGE_SIZE!);

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
  const [operatorId, setOperatorId] = useState("");
  const [page, setPage] = useState(0);
  const authState = useAuthenticationState();

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
        {userHasAccess(authState.role, ["ADMIN", "OPERATOR"]) && (
          <Link to={"new"} style={{ textDecoration: "none" }} className="link">
            <Typography variant="button">{"افزودن"}</Typography>
          </Link>
        )}
      </div>
      {loading ? <CircularProgress /> : null}
      <OperatorSelector
        operatorId={operatorId}
        onOperatorChanged={setOperatorId}
      />
      <DataTable
        columnKey={"file"}
        singleItemRoute={singleItemRoute}
        actionVisible={userHasAccess(authState.role, ["ADMIN", "OPERATOR"])}
        onDeleteClick={onDeleteClick}
        data={data?.data}
        rowCount={data?.total}
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
