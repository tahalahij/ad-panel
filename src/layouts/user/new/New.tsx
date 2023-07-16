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
  addOperatorRequest,
  updateOperatorRequest,
} from "../../../network/requests";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { USER_ROLE } from "../../../types/UserTypes";

type NewProps = {
  title?: string;
  update?: boolean;
};

export const New: FC<NewProps> = ({ title, update = false }) => {
  const navigate = useNavigate();
  const { userId, username, name, ip, map, type } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    title: string;
    type?: "success" | "error";
  }>({ title: "" });
  const formik = useFormik({
    initialValues: {
      username: username ?? "",
      name: name ?? "",
      password: "",
      ip: ip ?? "",
      mac: map ?? "",
      role:
        type === "operator"
          ? ("OPERATOR" as USER_ROLE)
          : ("CONTROLLER" as USER_ROLE),
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const submitUser = async () => {
    const { password, role, ...requestBody } = formik.values;
    if (!!password) {
      Object.assign(requestBody, { password, role });
    }
    const response = update
      ? await updateOperatorRequest({ ...requestBody, _id: userId })
      : await addOperatorRequest(formik.values);
    if (response.success) {
      setMessage({ title: "با موفقیت اضافه شد", type: "success" });
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } else {
      setMessage({
        title: response.error?.toString()!,
        type: "error",
      });
    }
    setLoading(false);
  };

  return (
    <div className="newUser">
      <div className="top">
        <Typography variant="h5" className="title">
          {`${update ? "ویرایش" : "افزودن"} ${
            type === "operator" ? "اپراتور" : "کنترلر"
          } ${update ? "" : "جدید"}`}
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
                id="username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                label="نام کاربری"
                helperText={""}
                placeholder="نام کاربری را وارد کنید"
                sx={{ width: "25ch" }}
              />
            </div>
            <div className="formInput">
              <TextField
                error={false}
                id="name"
                name="name"
                label={`نام ${type === "operator" ? "اپراتور" : "کنترلر"}`}
                value={formik.values.name}
                onChange={formik.handleChange}
                helperText={""}
                placeholder={`نام ${
                  type === "operator" ? "اپراتور" : "کنترلر"
                } را وارد کنید`}
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
            {!update && (
              <div className="formInput">
                <TextField
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  placeholder="رمز عبور را وارد کنید"
                  type={showPassword ? "text" : "password"}
                  sx={{ width: "25ch" }}
                  InputProps={{
                    //}}
                    // endAdornment={
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <MdOutlineVisibilityOff />
                          ) : (
                            <MdOutlineVisibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  label="رمز عبور"
                />
              </div>
            )}
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
                onClick={submitUser}
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
