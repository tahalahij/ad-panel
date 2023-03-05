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
import { useNavigate, useParams } from "react-router-dom";
import { resetPasswordRequest } from "../../../network/requests";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";


type ResetPasswordProps = {
  title: string;
};

export const ResetPassword: FC<ResetPasswordProps> = ({ title }) => {
  const navigate = useNavigate();
  //   const { userId, username, name } = useParams();
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

  const submitPassword = async () => {
    const { password, repeatPassword } = formik.values;
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

    setLoading(true);
    const response = await resetPasswordRequest(password);
    if (response.success) {
      setMessage({ title: "رمز عبور با موفقیت ثبت شد", type: "success" });
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } else {
      setMessage({
        title: `خطایی در ثبت رمز عبور جدید رخ داده است`,
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

  return (
    <div className="resetPassword">
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
                        {showPassword ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                label="رمز عبور"
              />
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
                        {showPassword ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                label="تکرار رمز عبور"
              />
            </div>
            <div className="formInput"></div>
            <div className="formInput">
              <LoadingButton
                variant="contained"
                className="submitButton"
                loading={loading}
                onClick={submitPassword}
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
