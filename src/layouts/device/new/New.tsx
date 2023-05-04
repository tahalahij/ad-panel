import "./new.scss";
import { useState, FC } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import LoadingButton from "@mui/lab/LoadingButton";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import {
  addDeviceRequest,
  updateDeviceRequest,
} from "../../../network/requests";
import { useDeviceById } from "../useDeviceData";

type NewProps = {
  title: string;
  update?: boolean;
};

export const New: FC<NewProps> = ({ title, update = false }) => {
  const navigate = useNavigate();
  const {deviceId } = useParams();
  const {data: deviceData, loading: deviceLoading} = useDeviceById(deviceId);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    title: string;
    type?: "success" | "error";
  }>({ title: "" });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: deviceData?.name ?? "",
      ip: deviceData?.ip ?? "",
      mac: deviceData?.mac ?? "",
      operatorId: deviceData?.operatorId ?? ""
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });



  const submitDevice = async () => {
    const { ...requestBody } = formik.values;
    const response = update
      ? await updateDeviceRequest({ ...requestBody, _id: deviceId })
      : await addDeviceRequest(formik.values);
    if (response.success) {
      setMessage({ title: "با موفقیت اضافه شد", type: "success" });
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } else {
      setMessage({
        title: `خطایی در ثبت دستگاه ${update ? "" : "جدید "}رخ داده است`,
        type: "error",
      });
    }
    setLoading(false);
  };

  return (
    <div className="newDevice">
      <div className="top">
        <Typography variant="h5" className="title">
          {title}
        </Typography>
      </div>
      <div className="bottom">
        {/* <div className="left">
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : require("../../../assets/images/no_image.jpg")
            }
            alt="empty field"
            className="image"
          />
        </div> */}
        <div className="right">
          <form action="">
            {/* <div className="formInput fileInput">
              <label htmlFor="file" className="fileInput">
                <Typography component={"span"}>فایل:</Typography>
                <CloudUploadOutlinedIcon className="icon" />
              </label>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => {
                  if (e.target.files !== null) {
                    setFile(e.target.files[0]);
                  }
                }}
              />
            </div> */}
            <div className="formInput">
              <TextField
                error={false}
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                label="نام دستگاه"
                helperText={""}
                placeholder="نام دستگاه را وارد کنید"
                sx={{ width: "25ch" }}
              />
            </div>
            <div className="formInput">
              <TextField
                error={false}
                id="operatorId"
                name="operatorId"
                label="id اپراتور"
                value={formik.values.operatorId}
                onChange={formik.handleChange}
                helperText={""}
                placeholder="id اپراتور را وارد کنید"
                sx={{ width: "25ch" }}
              />
            </div>
            {/* <div className="formInput">
              <TextField
                error={false}
                id="outlined-error-helper-text"
                label="ایمیل"
                defaultValue=""
                helperText={""}
                placeholder="ایمیل را وارد کنید"
                sx={{ width: "25ch" }}
              />
            </div> */}
            <div className="formInput">
              <TextField
                error={false}
                id="ip"
                name="ip"
                value={formik.values.ip}
                onChange={formik.handleChange}
                label="آدرس ip"
                helperText={""}
                placeholder="آدرس ip را وارد کنید"
                sx={{ width: "25ch" }}
              />
            </div>
            <div className="formInput">
              <TextField
                error={false}
                id="mac"
                name="mac"
                value={formik.values.mac}
                onChange={formik.handleChange}
                label="آدرس mac"
                helperText={""}
                placeholder="آدرس mac را وارد کنید"
                sx={{ width: "25ch" }}
              />
            </div>
            {/* <div className="formInput">
              <TextField
                error={false}
                id="outlined-error-helper-text"
                label="آدرس"
                defaultValue=""
                helperText={""}
                placeholder="آدرس را وارد کنید"
                sx={{ width: "25ch" }}
                multiline={true}
                // fullWidth
              />
            </div> */}
            {/* <div className="formInput"></div> */}
            <div className="formInput">
              <LoadingButton
                variant="contained"
                className="submitButton"
                loading={loading}
                onClick={submitDevice}
              >
                ارسال
              </LoadingButton>
            </div>
            <div className="formInput"></div>
          </form>
        </div>
      </div>
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
