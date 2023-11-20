import "./list.scss";
import { FC, useEffect } from "react";
import { useFormik } from "formik";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
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
  const formik = useFormik({
    initialValues: {
      ip: "",
      mac: "",
      username: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  const { type } = useParams();
  const { fetchData, loading, userList } = useOperatorData(type as USER_ROLE);

  useEffect(() => {
    fetchData(0, formik.values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, formik.values.ip, formik.values.mac, formik.values.username]);

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
      <div className="filters">
        <FormControl sx={{ width: "26ch" }}>
          <TextField
            id="username"
            name="username"
            label="نام کاربری"
            value={formik.values.username}
            onChange={formik.handleChange}
            placeholder="نام کاربری"
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
      <DataTable columnKey={"user"} data={userList} />
    </div>
  );
};
