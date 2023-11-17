import "./auditLogs.scss";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { DataTable } from "../../../components";
import { useAuthenticationState } from "../../../context";
import { useAuditLogs } from "./useAuditLogs";

const PAGE_SIZE = parseInt(process.env.REACT_APP_PAGE_SIZE!);

export const AuditLogList= () => {
  const [page, setPage] = useState(0);
  const { isFetching: loading, data } = useAuditLogs(undefined, page, PAGE_SIZE);
  return (
    <div className="logs">
      <div className="header">
        <Typography variant="h6">{'لاگ عملیات'}</Typography>
      </div>
      {loading ? <CircularProgress /> : null}
      <DataTable
        columnKey={"audit-logs"}
        actionVisible={false}
        data={data?.payload?.data}
        pageSize={PAGE_SIZE}
        rowCount={data?.payload?.total}
        page={page}
        onPageChange={setPage}
        resizable
        forceResize
      />
    </div>
  );
};
