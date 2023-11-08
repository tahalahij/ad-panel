import "./list.scss";
import { FC, useState } from "react";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { DataTable, OperatorSelector } from "../../../components";
import { Link } from "react-router-dom";
import { useScheduleData } from "../useScheduleData";
import {
  deleteScheduleByAdminRequest,
  deleteScheduleRequest,
} from "../../../network/requests";
import { userHasAccess } from "../../../utils/UserAccess";
import { useAuthenticationState } from "../../../context";

const PAGE_SIZE = parseInt(process.env.REACT_APP_PAGE_SIZE!);

type ListProps = {
  title?: string;
  newItemRoute?: string;
  columnKey: "user" | "schedule" | "file" | "device";
};

export const List: FC<ListProps> = ({ title, newItemRoute, columnKey }) => {
  const [operatorId, setOperatorId] = useState("");
  const [page, setPage] = useState(0)

  const { fetchData, removeSchedule, list, loading } =
    useScheduleData(operatorId, page, PAGE_SIZE);
  const authState = useAuthenticationState();

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [message, setMessage] = useState<{
    title: string;
    type?: "success" | "error";
  }>({ title: "" });

  const onDelete = async (_id: string) => {
    try {
      setDeleteLoading(true);
      const response =
        authState.role === "OPERATOR"
          ? await deleteScheduleRequest(_id)
          : await deleteScheduleByAdminRequest(_id);
      if (response.success) {
        setMessage({ title: "با موفقیت حذف شد", type: "success" });
        removeSchedule(_id);
      } else {
        setMessage({
          title: "خطایی در حذف اطلاعات رخ داده است",
          type: "error",
        });
      }
      setDeleteLoading(false);
    } catch (error) {
      setMessage({
        title: "خطایی در حذف اطلاعات رخ داده است",
        type: "error",
      });
      setDeleteLoading(false);
    }
  };

  return (
    <div className="listSchedule">
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
        columnKey={columnKey}
        data={list}
        onDeleteClick={onDelete}
        resizable={true}
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
