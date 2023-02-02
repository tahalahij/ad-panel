import "./new.scss";
import { useState, FC } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

type NewProps = {
  title: string;
};

export const New: FC<NewProps> = ({ title }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState<Blob | MediaSource>();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div className="new">
      <div className="top">
        <Typography variant="h5" className="title">
          {title}
        </Typography>
      </div>
      <div className="bottom">
        <div className="left">
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : require("../../../assets/images/no_image.jpg")
            }
            alt="empty field"
            className="image"
          />
        </div>
        <div className="right">
          <form action="">
            <div className="formInput fileInput">
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
            </div>
            <div className="formInput">
              <TextField
                error={false}
                id="outlined-error-helper-text"
                label="نام کاربری"
                defaultValue=""
                helperText={""}
                placeholder="نام کاربری را وارد کنید"
                sx={{ width: "25ch" }}
              />
            </div>
            <div className="formInput">
              <TextField
                error={false}
                id="outlined-error-helper-text"
                label="نام و نام‌خانوادگی"
                defaultValue=""
                helperText={""}
                placeholder="نام و نام‌خانوادگی را وارد کنید"
                sx={{ width: "25ch" }}
              />
            </div>
            <div className="formInput">
              <TextField
                error={false}
                id="outlined-error-helper-text"
                label="ایمیل"
                defaultValue=""
                helperText={""}
                placeholder="ایمیل را وارد کنید"
                sx={{ width: "25ch" }}
              />
            </div>
            <div className="formInput">
              <TextField
                id="password"
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
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                label="رمز عبور"
              />
            </div>
            <div className="formInput">
              <TextField
                error={false}
                id="outlined-error-helper-text"
                label="تلفن"
                defaultValue=""
                helperText={""}
                placeholder="تلفن را وارد کنید"
                sx={{ width: "25ch" }}
              />
            </div>
            <div className="formInput">
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
            </div>
            <div className="formInput">
              <Button variant="contained" className="submitButton">
                ارسال
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
