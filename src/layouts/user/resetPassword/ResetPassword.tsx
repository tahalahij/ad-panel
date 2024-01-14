import "./resetPassword.scss";
import { useState, FC } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import LoadingButton from "@mui/lab/LoadingButton";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import {
  updateAdminInfoRequest,
  resetPasswordRequest,
} from "../../../network/requests";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { useAuthenticationState } from "../../../context";
import { EditAdminProfile } from "./components/EditAdmin";
import { extractNonEmptyStrings } from "../../../utils/Utils";
import { PasswordStrengthInput } from "../../../components";

type ResetPasswordProps = {};

export const ResetPassword: FC<ResetPasswordProps> = () => {
  const navigate = useNavigate();
  //   const { userId, username, name } = useParams();
  const auth = useAuthenticationState();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    title: string;
    type?: "success" | "error";
  }>({ title: "" });
  const formik = useFormik({
    initialValues: {
      password: "",
      repeatPassword: "",
      ip: "",
      mac: "",
      username: "",
      name: "",
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

  const submitInformation = async () => {
    const { password, repeatPassword, ...reset } = formik.values;
    if (password.length > 0 || repeatPassword.length > 0) {
      if (password !== repeatPassword) {
        setMessage({
          title: `تکرار رمز عبور اشتباه است. لطفا با دقت وارد کنید!`,
          type: "error",
        });
        return;
      }

      if (password.length < 8) {
        setMessage({
          title: `حداقل 8 کاراکتر شامل حروف لاتین و عدد وارد کنید`,
          type: "error",
        });
        return;
      }
    }

    setLoading(true);
    const response =
      auth.role === "OPERATOR"
        ? await resetPasswordRequest(password)
        : await updateAdminInfoRequest(
            extractNonEmptyStrings({ password, ...reset })
          );
    if (response.success) {
      setMessage({ title: "اطلاعات با موفقیت ثبت شد", type: "success" });
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

  const repeatPasswordError =
    formik.values.password !== formik.values.repeatPassword
      ? "تکرار رمز عبور اشتباه است. لطفا با دقت وارد کنید!"
      : "";

  const passwordError =
    formik.values.password.length < 8 && formik.values.password.length > 0
      ? "حداقل 8 کاراکتر شامل حروف لاتین و عدد وارد کنید"
      : "";

  const pageTitle =
    auth.role === "ADMIN" ? "ویرایش مدیر سامانه" : "تغییر رمز عبور";

  return (
    <div className="resetPassword">
      <div className="top">
        <Typography variant="h5" className="title">
          {pageTitle}
        </Typography>
      </div>
      <div className="bottom">
        <div className="right">
          <form action="">
            <EditAdminProfile
              values={formik.values}
              handleChange={formik.handleChange}
            />

            <div className="formInput">
              <TextField
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                placeholder="رمز عبور را وارد کنید"
                type={showPassword ? "text" : "password"}
                helperText={passwordError}
                error={!!passwordError}
                sx={{ width: "35ch" }}
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
              <PasswordStrengthInput password={formik.values.password} />
            </div>
            <div className="formInput">
              <TextField
                id="repeatPassword"
                name="repeatPassword"
                value={formik.values.repeatPassword}
                onChange={formik.handleChange}
                placeholder="رمز عبور را تکرار کنید"
                type={showPassword ? "text" : "password"}
                helperText={repeatPasswordError}
                error={!!repeatPasswordError}
                sx={{ width: "35ch" }}
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
                label="تکرار رمز عبور"
              />
            </div>
            <div className="formInput">
              <LoadingButton
                variant="contained"
                className="submitButton"
                loading={loading}
                onClick={submitInformation}
              >
                تایید
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
