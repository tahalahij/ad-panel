import "./login.scss";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { Alert, Snackbar } from "@mui/material";
import { useAuthenticationDispatch } from "../../context";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const authDispatch = useAuthenticationDispatch();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onLoginClick = () => {
    // setError("خطا در دریافت اطلاعات");
    authDispatch({ type: "LOGIN" });
  };

  return (
    <div className="login">
      <Container maxWidth="sm">
        <Card className="cardContainer">
          <Typography variant="h6">SCHEDULE</Typography>
          <TextField
            error={false}
            id="outlined-error-helper-text"
            label="نام کاربری"
            defaultValue=""
            // helperText={"خطا"}
            placeholder="نام کاربری را وارد کنید"
            sx={{ width: "34ch" }}
          />
          <TextField
            error={false}
            id="password"
            label="رمز عبور"
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
                      <VisibilityOffOutlinedIcon />
                    ) : (
                      <VisibilityOutlinedIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button variant="contained" onClick={onLoginClick}>
            ورود
          </Button>
        </Card>
      </Container>
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
