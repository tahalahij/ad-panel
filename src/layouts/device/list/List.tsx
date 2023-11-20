import "./list.scss";
import { FC, useState } from "react";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { DataTable, OperatorSelector } from "../../../components";
import { Link } from "react-router-dom";
import { useDeviceData } from "../useDeviceData";
import { useAuthenticationState } from "../../../context";
import { useSocket } from "../../../network/socket/useSocket";
import { useFormik } from "formik";

const PAGE_SIZE = parseInt(process.env.REACT_APP_PAGE_SIZE!);

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
  const formik = useFormik({
    initialValues: {
      ip: "",
      mac: "",
      name: "",
      operatorId: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const [page, setPage] = useState(0);
  const { list, loading } = useDeviceData(
    undefined,
    page,
    PAGE_SIZE,
    formik.values
  );
  const auth = useAuthenticationState();
  const onlineDevices = useSocket();

  const getData = () => {
    if (list?.data?.length) {
      return list.data.map((item) => {
        item.isOnline = onlineDevices.some((d) => d === item._id);
        return item;
      });
    }

    return [];
  };
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
      <div className="filters">
        <OperatorSelector
          operatorId={formik.values.operatorId}
          onChange={formik.handleChange}
          sx={{ width: "26ch" }}
        />
        <FormControl sx={{ width: "26ch" }}>
          <TextField
            id="name"
            name="name"
            label="نام دستگاه"
            value={formik.values.name}
            onChange={formik.handleChange}
            placeholder="نام دستگاه"
          />
        </FormControl>
        <FormControl sx={{ width: "26ch" }}>
          <TextField
            id="ip"
            name="ip"
            label="آدرس IP"
            value={formik.values.ip}
            onChange={formik.handleChange}
            placeholder="آدرس IP"
          />
        </FormControl>
        <FormControl sx={{ width: "26ch" }}>
          <TextField
            id="mac"
            name="mac"
            label="آدرس MAC"
            value={formik.values.mac}
            onChange={formik.handleChange}
            placeholder="آدرس MAC"
          />
        </FormControl>
      </div>
      <DataTable
        columnKey={"device"}
        actionVisible={auth.role !== "OPERATOR"}
        data={getData()}
        pageSize={PAGE_SIZE}
        rowCount={list?.total}
        page={page}
        onPageChange={setPage}
      />
    </div>
  );
};
