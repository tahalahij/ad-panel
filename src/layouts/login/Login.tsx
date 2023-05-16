import "./login.scss";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Alert, Snackbar } from "@mui/material";
import { useAuthenticationDispatch } from "../../context";
import { loginRequest } from "../../network/requests";
import { useFormik } from "formik";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { BASE_API_URL } from "../../network/Constants";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const authDispatch = useAuthenticationDispatch();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
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

  const onLoginClick = async () => {
    setLoading(true);
    const response = await loginRequest(formik.values);
    if (response.success) {
      setLoading(false);
      authDispatch({
        type: "LOGIN",
        value: {
          isLogin: true,
          token: response.payload?.access_token!,
          role: response.payload?.role!,
        },
      });
    } else {
      setLoading(false);
      setError("خطا در ورود به برنامه");
    }
  };
  const uri = encodeURI(BASE_API_URL + "files/dashboard");
  return (
    <div className="login">
      <div className="cardContainer">
        <img
          className="logo"
          src={require("../../assets/images/icon_title.png")}
          alt="logo"
        />
        <TextField
          error={false}
          id="username"
          name="username"
          label="نام کاربری"
          value={formik.values.username}
          onChange={formik.handleChange}
          // helperText={"خطا"}
          placeholder="نام کاربری را وارد کنید"
          sx={{ width: "34ch" }}
        />
        <TextField
          error={false}
          id="password"
          name="password"
          label="رمز عبور"
          value={formik.values.password}
          onChange={formik.handleChange}
          // helperText={"خطا"}
          placeholder="رمز عبور را وارد کنید"
          sx={{ width: "34ch" }}
          type={showPassword ? "text" : "password"}
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
        />
        <LoadingButton
          loading={loading}
          variant="contained"
          onClick={onLoginClick}
          sx={{width: '100%'}}
        >
          ورود
        </LoadingButton>
      </div>
      <div className="background">
        <img
          // src={require("../../assets/images/dashboard.jpeg")}
          src={uri}
          alt="dashboard"
          className="logo"
        />
      </div>
      <Snackbar
        open={!!error}
        // message={error}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        onClose={() => setError("")}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};
