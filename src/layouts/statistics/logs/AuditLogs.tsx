import "./auditLogs.scss";
import { useState } from "react";
import { useFormik } from "formik";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { DataTable } from "../../../components";
import { useAuditLogs } from "./useAuditLogs";
import { USER_ROLE } from "../../../types/UserTypes";
import { getRoleName } from "../../../utils/Utils";

const PAGE_SIZE = parseInt(process.env.REACT_APP_PAGE_SIZE!);

export const AuditLogList = () => {
  const [page, setPage] = useState(0);
  const formik = useFormik({
    initialValues: {
      role: "",
      initiatorId: "",
      initiatorName: "",
      description: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  const { isFetching: loading, data } = useAuditLogs(
    formik.values.role as USER_ROLE,
    formik.values.initiatorId,
    formik.values.initiatorName,
    formik.values.description,
    page,
    PAGE_SIZE
  );
  return (
    <div className="logs">
      <div className="header">
        <Typography variant="h6">{"لاگ عملیات"}</Typography>
      </div>
      <div className="filters">
        <FormControl sx={{ width: "26ch" }}>
          <InputLabel id="select-role-logs">دسترسی</InputLabel>
          <Select
            labelId="select-role-logs"
            id="role"
            name="role"
            value={formik.values.role}
            label="دسترسی"
            onChange={formik.handleChange}
          >
            <MenuItem key={"ALL"} value={""}>
              {"همه"}
            </MenuItem>
            <MenuItem key={"ADMIN"} value={"ADMIN"}>
              {getRoleName("ADMIN")}
            </MenuItem>
            <MenuItem key={"CONTROLLER"} value={"CONTROLLER"}>
              {getRoleName("CONTROLLER")}
            </MenuItem>
            <MenuItem key={"OPERATOR"} value={"OPERATOR"}>
              {getRoleName("OPERATOR")}
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ width: "26ch" }}>
          <TextField
            id="initiatorId"
            name="initiatorId"
            label="شناسه کاربر"
            value={formik.values.initiatorId}
            onChange={formik.handleChange}
            placeholder="شناسه کاربر"
          />
        </FormControl>
        <FormControl sx={{ width: "26ch" }}>
          <TextField
            id="initiatorName"
            name="initiatorName"
            label="نام کاربر"
            value={formik.values.initiatorName}
            onChange={formik.handleChange}
            placeholder="نام کاربر"
          />
        </FormControl>
        <FormControl sx={{ width: "26ch" }}>
          <TextField
            id="description"
            name="description"
            label="توضیحات"
            value={formik.values.description}
            onChange={formik.handleChange}
            placeholder="توضیحات"
          />
        </FormControl>
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
