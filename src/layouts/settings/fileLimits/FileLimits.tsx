import "./fileLimits.scss";
import { useState, FC } from "react";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate } from "react-router-dom";
import { MdOutlineCloudUpload } from "react-icons/md";
import { useSettingsData } from "../hooks/useSettingsData";
import { useFormik } from "formik";

type layoutProps = {
  title: string;
};

export const FileLimits: FC<layoutProps> = ({ title }) => {
  //
  const { settings, updateSettings, loading, message, setMessage } =
    useSettingsData();
  //
  const formik = useFormik({
    initialValues: {
      fileSizeLimit:
        settings?.payload?.data?.find(
          (s) => s.name === "FILE_SIZE_LIMIT_IN_MEGA_BYTE"
        )?.value ?? "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    enableReinitialize: true,
  });
  //
  const navigate = useNavigate();

  const submit = () => {
    updateSettings({
      id: settings?.payload?.data?.find(
        (s) => s.name === "FILE_SIZE_LIMIT_IN_MEGA_BYTE"
      )?._id!,
      value: formik.values.fileSizeLimit,
    });
  };

  return (
    <div className="fileLimits">
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
            <div className="formInput">
              <TextField
                error={false}
                id="fileSizeLimit"
                name="fileSizeLimit"
                value={formik.values.fileSizeLimit}
                onChange={formik.handleChange}
                label="حداکثر حجم فایل ها"
                helperText={""}
                placeholder="100"
                sx={{ width: "30ch" }}
                InputProps={{
                  //}}
                  // endAdornment={
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography>مگابایت</Typography>
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div className="formInput">
              <LoadingButton
                variant="contained"
                className="submitButton"
                loading={loading}
                onClick={submit}
              >
                ثبت
              </LoadingButton>
            </div>
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
