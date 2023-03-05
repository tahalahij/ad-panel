import "./newFile.scss";
import { useState, FC } from "react";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { uploadFileRequest } from "../../../network/requests/FileRequests";
import { useNavigate } from "react-router-dom";
import { MdOutlineCloudUpload } from "react-icons/md";
type NewProps = {
  title: string;
};

export const NewFileUpload: FC<NewProps> = ({ title }) => {
  const [file, setFile] = useState<File>();
  const [delay, setDelay] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    title: string;
    type?: "success" | "error";
  }>({ title: "" });

  const navigate = useNavigate();

  const upload = async () => {
    if (!file) {
      return;
    }

    if (file.type.startsWith("image") && (!delay || Number(delay) <= 0)) {
      setMessage({
        title: "مدت زمان نمایش تصویر به درستی وارد نشده است",
        type: "error",
      });
      return;
    }

    setLoading(true);
    const data = new FormData();
    data.append(`file`, file);
    if (file.type.startsWith("image")) {
      data.append("delay", delay.toString());
    }
    // data.append("animationName", "flip");

    const response = await uploadFileRequest(data);
    if (response.success) {
      setMessage({ title: "با موفقیت بارگزاری شد", type: "success" });
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } else {
      setMessage({
        title: "خطایی در بارگزاری فایل رخ داده است",
        type: "error",
      });
    }
    setLoading(false);
  };

  const delayErrorText =
    delay === ""
      ? "مدت زمان نمایش تصویر را به 'ثانیه' وارد کنید"
      : Number(delay) < 0
      ? "ثانیه نمیتواند منفی باشد"
      : Number(delay) == 0
      ? "مقداری بزرگتر از صفر وارد کنید"
      : "";

  return (
    <div className="newFile">
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
            <div className="formInput fileInput">
              <label htmlFor="file" className="fileInput">
                {!!file && (
                  <Typography component={"span"}>{file.name}</Typography>
                )}

                <div className="placeholder">
                  <Typography component={"span"}>فایل:</Typography>
                  <MdOutlineCloudUpload className="icon" fontSize={"large"} />
                </div>
              </label>
              <input
                type="file"
                accept="image/*, audio/*, video/*"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => {
                  if (e.target.files !== null) {
                    setFile(e.target.files[0]);
                    console.log(e.target.files[0]);
                  }
                }}
              />
            </div>
            {!!file && file.type.startsWith("image") && (
              <TextField
                error={!!delayErrorText}
                type="number"
                id="delay"
                name="delay"
                label="مدت زمان نمایش تصویر"
                value={delay}
                onChange={(e) => setDelay(e.target.value)}
                helperText={delayErrorText}
                placeholder="مدت زمان نمایش تصویر را به 'ثانیه' وارد کنید"
                sx={{ width: "40%", marginLeft: "24px" }}
              />
            )}
            <div className="formInput">
              <LoadingButton
                variant="contained"
                className="submitButton"
                loading={loading}
                onClick={upload}
              >
                ارسال
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
